const IS_PROD = process.env.NODE_ENV === 'production'
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
        'cmyr/vue'
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
        'vue/html-self-closing': [IS_PROD ? 2 : 0],
        'no-empty': IS_PROD ? 2 : 0, // 禁止有空代码块
        'prefer-const': IS_PROD ? 2 : 0, // 建议使用const
        'no-useless-return': IS_PROD ? 2 : 0, // 禁止多余的 return 语句
    },
}
