process.env.VUE_APP_VERSION = require('./package.json').version
const StyleLintPlugin = require('stylelint-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const FileManagerPlugin = require('filemanager-webpack-plugin')

function verFormat(ver) {
    const list = ver.split('.')
    for (let i = 0; i < list.length; i++) {
        list[i] = list[i].replace('^', '').replace('~', '')
    }
    return list.join('.')
}
const { dependencies } = require('./package.json')
Object.keys(dependencies).forEach(e => {
    let d = dependencies[e]
    if (!d.includes('git+')) {
        dependencies[e] = verFormat(d)
    }
})

module.exports = {
    publicPath: '/',
    devServer: {
        open: true, // 自动打开浏览器
        port: 5000, // 设置端口
        hot: true, // 启用热更新
        compress: true, // 是否启用gzip压缩
        proxy: {
            '/rss': {
                target: 'https://rsshub.cmyr.ltd/',
                ws: true,
                changOrigin: true,
                pathRewrite: {
                    '^/rss': '/',
                },
            },
        }
    },
    productionSourceMap: process.env.NODE_ENV === 'development', // 移除生产环境的 source map
    chainWebpack: (config) => {
        config.plugin('html').tap(([options]) => {
            options.title = '豹按钮 (:3っ)∋'
            return [options]
        })
        const css = [
            `https://cdn.jsdelivr.net/npm/normalize.css@${dependencies['normalize.css']}/normalize.min.css`,
            `https://cdn.jsdelivr.net/npm/animate.css@${dependencies['animate.css']}/animate.min.css`,
            `https://cdn.jsdelivr.net/npm/@mdi/font@${dependencies['@mdi/font']}/css/materialdesignicons.min.css`,
            `https://cdn.jsdelivr.net/npm/material-design-icons-iconfont@${dependencies['material-design-icons-iconfont']}/dist/material-design-icons.min.css`,
            `https://cdn.jsdelivr.net/npm/vuetify@${dependencies['vuetify']}/dist/vuetify.min.css`,
        ]
        const js = [
            `https://cdn.jsdelivr.net/npm/lodash@${dependencies['lodash']}/lodash.min.js`,
            `https://cdn.jsdelivr.net/npm/axios@${dependencies['axios']}/dist/axios.min.js`,
            `https://cdn.jsdelivr.net/npm/vue@${dependencies['vue']}/dist/vue.min.js`,
            `https://cdn.jsdelivr.net/npm/vuetify@${dependencies['vuetify']}/dist/vuetify.min.js`,
            `https://cdn.jsdelivr.net/npm/vue-router@${dependencies['vue-router']}/dist/vue-router.min.js`,
            `https://cdn.jsdelivr.net/npm/vuex@${dependencies['vuex']}/dist/vuex.min.js`,
            `https://cdn.jsdelivr.net/npm/vue-i18n@${dependencies['vue-i18n']}/dist/vue-i18n.min.js`,
            `https://cdn.jsdelivr.net/npm/@vue/composition-api@${dependencies['@vue/composition-api']}/dist/vue-composition-api.prod.min.js`,
            // `https://cdn.jsdelivr.net/npm/vue-composable@${dependencies['vue-composable']}/dist/v2/vue-composable.global.prod.js`,
            // `https://cdn.jsdelivr.net/npm/@vue-composable/axios@${dependencies['@vue-composable/axios']}/dist/v2/axios.global.prod.js`,
            `https://cdn.jsdelivr.net/npm/dayjs@${dependencies['dayjs']}/dayjs.min.js`,
            `https://cdn.jsdelivr.net/npm/rss-parser@${dependencies['rss-parser']}/dist/rss-parser.min.js`,
        ]
        let cdn = {
            css: [],
            js: []
        }
        if (process.env.NODE_ENV === 'production') {
            cdn = {
                css,
                js
            }
            config.plugin('html').tap(([options]) => {
                options.cdn = cdn
                return [options]
            })
            config.module
                .rule('images')
                .test(/\.(jpg|png|jpeg|gif|bmp)$/i)
                .use('url-loader')
                .loader('url-loader')
                .options({
                    limit: 1024,
                    outputPath: 'img',
                    name: '[name].[hash:8].[ext]',
                }).end()
        } else {
            cdn = {
                css,
                js: []
            }
            config.plugin('html').tap(([options]) => {
                options.cdn = cdn
                return [options]
            })
        }
    },
    configureWebpack: config => {
        config.plugins.push(
            // @ts-ignore
            new StyleLintPlugin({
                files: ['src/**/*.{vue,html,css,scss,sass,less}'],
                failOnError: false,
                cache: true,
                fix: true,
            }),
        )
        config.module.rules.push({
            test: /\.md$/,
            use: [
                {
                    loader: "html-loader"
                },
                {
                    loader: "markdown-it-loader",
                    options: {
                        html: true,
                    }
                }
            ]
        })
        if (process.env.NODE_ENV === 'production') {
            const plugins = []
            plugins.push(
                new FileManagerPlugin({
                    events: {
                        onEnd: {
                            delete: [
                                './public/voices.zip',
                            ],
                            archive: [
                                { source: './public/voices', destination: './public/voices.zip' },
                            ],
                        },
                    }
                }),
            )
            if (process.env.MODE === 'analyzer') {
                plugins.push(
                    new BundleAnalyzerPlugin({
                        analyzerMode: 'server',
                        analyzerHost: '127.0.0.1',
                        analyzerPort: 8080,
                        reportFilename: 'index.html',
                        defaultSizes: 'parsed',
                        openAnalyzer: true,
                        generateStatsFile: false,
                        statsFilename: 'stats.json',
                        statsOptions: null,
                        logLevel: 'info'
                    })
                )
            }
            return {
                externals: {
                    vuetify: 'Vuetify',
                    'vuetify/lib': 'Vuetify',
                    vue: 'Vue',
                    vuex: 'Vuex',
                    'vue-router': 'VueRouter',
                    lodash: '_',
                    'vue-i18n': 'VueI18n',
                    '@vue/composition-api': 'VueCompositionAPI',
                    // 'vue-composable': 'VueComposable',
                    dayjs: 'dayjs',
                    'rss-parser': 'RSSParser',
                    axios: 'axios'
                },
                plugins,
                optimization: {
                    splitChunks: {
                        chunks: 'all',
                        cacheGroups: {
                            libs: {
                                name: 'chunk-libs',
                                test: /[\\/]node_modules[\\/]/,
                                priority: 10,
                                chunks: 'initial' // 只打包初始时依赖的第三方
                            },
                            corejs: {
                                name: 'chunk-corejs', // 单独将 core-js 拆包
                                priority: 15,
                                test: /[\\/]node_modules[\\/]core-js[\\/]/
                            },
                            vuetify: {
                                name: 'chunk-vuetify', // 单独将 vuetify 拆包
                                priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
                                test: /[\\/]node_modules[\\/]vuetify[\\/]/
                            }
                        }
                    },
                }
            }
        }
    },
    // transpileDependencies: [
    //     'vuetify',
    // ],
}
