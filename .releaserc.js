module.exports = {
    plugins: [
        [
            '@semantic-release/commit-analyzer', // 此处只导入解析规则 parserOpts
            {
                config: 'conventional-changelog-cmyr-config',
            },
        ],
        [
            '@semantic-release/release-notes-generator', // 此处导入解析和生成规则 parserOpts, writerOpts
            {
                config: 'conventional-changelog-cmyr-config',
            },
        ],
        [
            '@semantic-release/changelog',
            {
                changelogFile: 'CHANGELOG.md',
                changelogTitle: '# shirakami-haruka-button',
            },
        ],
        '@semantic-release/npm',
        [
            '@semantic-release/github',
        ],
        [
            '@semantic-release/git',
            {
                assets: [
                    'src',
                    'CHANGELOG.md',
                    'package.json',
                ],
            },
        ],
    ],
}