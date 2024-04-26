module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': ['error', { allowTypedFunctionExpressions: false }],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': [
            'warn', // or "error"
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
            },
        ],
        '@typescript-eslint/naming-convention': [
            'warn', // TODO set to warn when fixing
            {
                selector: 'default',
                format: ['camelCase'],
                leadingUnderscore: 'allow',
                trailingUnderscore: 'allow',
            },

            {
                selector: 'variable',
                format: ['camelCase', 'UPPER_CASE', 'snake_case', 'PascalCase'],
                leadingUnderscore: 'allow',
                trailingUnderscore: 'allow',
            },
            {
                selector: 'parameter',
                format: ['camelCase', 'snake_case', 'PascalCase'],
                leadingUnderscore: 'allow',
                trailingUnderscore: 'allow',
            },
            {
                selector: 'typeLike',
                format: ['PascalCase'],
            },
            {
                selector: 'property',
                format: ['PascalCase', 'camelCase', 'UPPER_CASE', 'snake_case'],
                leadingUnderscore: 'allow',
                trailingUnderscore: 'allow',
            },
            {
                selector: 'enum',
                format: ['PascalCase', 'camelCase', 'UPPER_CASE', 'snake_case'],
                leadingUnderscore: 'allow',
                trailingUnderscore: 'allow',
            },
            {
                selector: 'enumMember',
                format: ['PascalCase', 'camelCase', 'UPPER_CASE', 'snake_case'],
                leadingUnderscore: 'allow',
                trailingUnderscore: 'allow',
            },
        ],
    },
    overrides: [
        {
            files: ['**/*.spec.ts'], // Specify the files to ignore
            rules: {
                // Override the rule to allow missing return types in spec files
                '@typescript-eslint/explicit-function-return-type': 'off',
            },
        },
    ],
}
