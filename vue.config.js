const pkg = require('./package.json')
const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = {
    publicPath: '/',
    devServer: {
        open: true, // 自动打开浏览器
        port: 5000, // 设置端口
        hot: true, // 启用热更新
        compress: true, // 是否启用gzip压缩
    },
    productionSourceMap: process.env.NODE_ENV === 'development', // 移除生产环境的 source map
    chainWebpack: (config) => {
        config.plugin('html').tap(([options]) => {
            options.title = '豹按钮 (:3っ)∋'
            return [options]
        })
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
    },
    transpileDependencies: [
        'vuetify',
    ],
}
