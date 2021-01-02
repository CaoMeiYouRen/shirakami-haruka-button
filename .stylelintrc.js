module.exports = {
    extends: [
        'stylelint-config-sass-guidelines',
        'stylelint-config-cmyr',
    ],
    plugins: [
        'stylelint-scss',
        'stylelint-order',
    ],
    rules: {
        'scss/at-import-partial-extension-blacklist': null,
        'max-nesting-depth': null,
        'selector-max-compound-selectors': null
    },
}