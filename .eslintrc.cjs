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
			plugins: ["@typescript-eslint"],
			parserOptions: {
				project: true,
				tsconfigRootDir: __dirname,
			},
			extends: [
				"plugin:@typescript-eslint/recommended",
				"plugin:@typescript-eslint/recommended-type-checked",
				"plugin:@typescript-eslint/stylistic-type-checked",
			],
			rules: {
				"valid-typeof": "off",
				"@typescript-eslint/no-unused-vars": "off",
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
