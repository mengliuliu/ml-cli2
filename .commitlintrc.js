module.exports = {
    //     "commit-msg": "commitlint --config .commitlintrc.js -E HUSKY_GIT_PARAMS"
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            ['build', 'ci', 'chore', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test', 'anno'],
        ],
    },
}
