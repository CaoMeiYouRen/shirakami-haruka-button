const __PROD__ = process.env.NODE_ENV === 'production' ? 2 : 0
module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        commonjs: true,
        node: true,
        mocha: true,
    },
    extends: [
        'cmyr/vue',
    ],
    plugins: [
        'vue',
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: new Date().getFullYear(),
        sourceType: 'module',
        ecmaFeatures: {
            modules: true,
        },
    },
    parser: 'vue-eslint-parser',
    rules: {
        'vue/match-component-file-name': [2, { // 要求组件名称属性与其文件名匹配
            extensions: ['jsx', 'tsx', 'vue'],
            shouldMatchCase: true,
        }],
        'vue/no-reserved-component-names': [2], // 不允许在组件定义中使用保留名称
        'vue/require-name-property': [2], // 组件必须命名
        'vue/block-tag-newline': [0],
        'no-unused-vars': [0],
        '@typescript-eslint/explicit-function-return-type': [0], // 要求函数和类方法的显式返回类型
        '@typescript-eslint/explicit-module-boundary-types': [1], // 要求导出函数和类的公共类方法的显式返回和参数类型
    },
}
