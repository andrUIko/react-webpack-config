module.exports = {
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
		},
	},
	root: true,
	ignorePatterns: ["dist/**/*"],
	extends: ["eslint:recommended", "eslint-config-prettier"],
	rules: {
		strict: ["error", "never"],
	},
	env: {
		browser: true,
	},
	overrides: [
		{
			files: ["*.+(ts|tsx)"],
			parser: "@typescript-eslint/parser",
			plugins: ["@typescript-eslint", "import"],
			parserOptions: {
				project: true,
				tsconfigRootDir: __dirname,
			},
			extends: [
				"plugin:@typescript-eslint/recommended",
				"plugin:@typescript-eslint/recommended-type-checked",
				"plugin:@typescript-eslint/stylistic-type-checked",
				"plugin:import/typescript",
			],
			settings: {
				"import/resolver": {
					node: true,
					typescript: true,
				},
			},
			rules: {
				"valid-typeof": "off",
				"no-unused-vars": "off",
				"@typescript-eslint/no-unused-vars": "error",
				"import/newline-after-import": "warn",
				"padding-line-between-statements": "off",
				"@typescript-eslint/padding-line-between-statements": [
					"warn",
					{
						blankLine: "always",
						prev: "*",
						next: ["interface", "type"],
					},
					{
						blankLine: "always",
						prev: ["interface", "type"],
						next: "*",
					},
				],
			},
		},
		{
			files: ["webpack.config.cjs", ".eslintrc.cjs"],
			env: {
				node: true,
			},
		},
	],
};
