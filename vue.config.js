/* eslint-disable @typescript-eslint/no-var-requires,
@typescript-eslint/explicit-function-return-type,max-lines-per-function
*/
const StyleLintPlugin = require('stylelint-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const FileManagerPlugin = require('filemanager-webpack-plugin')
const WebpackCdnPlugin = require('webpack-cdn-plugin')
// const PrerenderSPAPlugin = require('prerender-spa-plugin')
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const pkg = require('./package.json')
const env = process.env
env.VUE_APP_VERSION = pkg.version
env.VUE_APP_AUTHOR = env.VUE_APP_AUTHOR || pkg.author
env.VUE_APP_COPYRIGHT = env.VUE_APP_COPYRIGHT || pkg.author
env.VUE_APP_GITHUB_NAME = env.VUE_APP_GITHUB_NAME || pkg.author
env.VUE_APP_GITHUB_REPOSITORIE = env.VUE_APP_GITHUB_REPOSITORIE || pkg.name

const __DEV__ = env.NODE_ENV === 'development'
const __PROD__ = !__DEV__

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
        },
    },
    productionSourceMap: __DEV__, // 移除生产环境的 source map
    chainWebpack: (config) => {
        config.plugin('html').tap(([options]) => {
            options.title = env.VUE_APP_ICP_TITLE || env.VUE_APP_HTML_TITLE
            options.__DEV__ = __DEV__
            options.__PROD__ = __PROD__
            return [options]
        })
    },
    configureWebpack: (config) => {
        const jsModules = [
            {
                name: 'lodash',
                var: '_',
                path: 'lodash.min.js',
            },
            {
                name: 'axios',
                var: 'axios',
                path: 'dist/axios.min.js',
            },
            {
                name: 'dayjs',
                var: 'dayjs',
                path: 'dayjs.min.js',
            },
            {
                name: 'rss-parser',
                var: 'RSSParser',
                path: 'dist/rss-parser.min.js',
            },
            {
                name: 'vue',
                var: 'Vue',
                path: 'dist/vue.runtime.min.js',
            },
            {
                name: 'vue-router',
                var: 'VueRouter',
                path: 'dist/vue-router.min.js',
            },
            {
                name: 'vuex',
                var: 'Vuex',
                path: 'dist/vuex.min.js',
            },
            {
                name: 'vuetify',
                var: 'Vuetify',
                path: 'dist/vuetify.min.js',
            },
            {
                name: 'vue-i18n',
                var: 'VueI18n',
                path: 'dist/vue-i18n.min.js',
            },
            // {
            //     name: '@vue/composition-api',
            //     var: 'vueCompositionApi',
            //     path: 'dist/vue-composition-api.prod.min.js',
            // },
            // {
            //     name: 'vue-composable',
            //     var: 'vueComposable',
            //     path: 'dist/v2/vue-composable.global.prod.js',
            // },
            // {
            //     name: '@vue-composable/axios',
            //     var: 'vueComposableAxios',
            //     path: 'dist/v2/axios.global.prod.js',
            // },
        ]
        const cssModules = [
            {
                name: 'normalize.css',
                style: 'normalize.css',
                cssOnly: true,
            },
            {
                name: 'animate.css',
                style: 'animate.css',
                cssOnly: true,
            },
            {
                name: '@mdi/font',
                style: 'css/materialdesignicons.css',
                cssOnly: true,
            },
            {
                name: 'material-design-icons-iconfont',
                style: 'dist/material-design-icons.css',
                cssOnly: true,
            },
            {
                name: 'vuetify',
                style: 'dist/vuetify.css',
                cssOnly: true,
            },
        ]

        config.module.rules.push({
            test: /\.md$/,
            use: [
                {
                    loader: 'html-loader',
                },
                {
                    loader: 'markdown-it-loader',
                    options: {
                        html: true,
                    },
                },
            ],
        })
        const plugins = []
        config.plugins.push(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            new StyleLintPlugin({
                files: ['src/**/*.{vue,html,css,scss,sass,less}'],
                failOnError: false,
                cache: true,
                fix: true,
            }),
            new WebpackCdnPlugin({
                publicPath: '/node_modules',
                prod: true, // 生产环境使用 cdn
                prodUrl: 'https://unpkg.com/:name@:version/:path',
                modules: __DEV__ ? cssModules : [].concat(cssModules, jsModules), // 开发环境仅注入 css ，生产环境注入 js、css
            }),
        )
        if (__PROD__) {
            plugins.push(
                new FileManagerPlugin({
                    events: {
                        onEnd: {
                            delete: [
                                './public/voices.zip',
                                './dist/voices.zip',
                            ],
                            archive: [
                                { source: './public/voices', destination: './public/voices.zip' },
                            ],
                        },
                    },
                }),
                // new PrerenderSPAPlugin({
                //     // Required - The path to the webpack-outputted app to prerender.
                //     staticDir: path.join(__dirname, 'dist'),
                //     // Required - Routes to render.
                //     routes: ['/', '/about', '/changelog'],
                //     renderer: new Renderer({
                //         headless: true, // 开启无头浏览器
                //         renderAfterDocumentEvent: 'render-event', // 渲染的事件，只有触发了这个事件，插件才会开始爬取html
                //     }),
                // }),
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
                        logLevel: 'info',
                    }),
                )
            }
            const optimization = {
                splitChunks: {
                    chunks: 'all',
                    cacheGroups: {
                        libs: {
                            name: 'chunk-libs',
                            test: /[\\/]node_modules[\\/]/,
                            priority: 10,
                            chunks: 'initial', // 只打包初始时依赖的第三方
                        },
                        corejs: {
                            name: 'chunk-corejs', // 单独将 core-js 拆包
                            priority: 15,
                            test: /[\\/]node_modules[\\/]core-js[\\/]/,
                        },
                        vuetify: {
                            name: 'chunk-vuetify', // 单独将 vuetify 拆包
                            priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
                            test: /[\\/]node_modules[\\/]vuetify[\\/]/,
                        },
                    },
                },
            }
            return {
                plugins,
                optimization,
                externals: {
                    vuetify: 'Vuetify',
                    'vuetify/lib': 'Vuetify',
                },
            }
        }
    },
    // transpileDependencies: [
    //     'vuetify',
    // ],
}
