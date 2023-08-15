const jestConfig = require("./.eslintrc.jest.cjs");
const typescriptConfig = require("./.eslintrc.typescript.cjs");

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
			files: ["*.cjs"],
			env: {
				node: true,
			},
		},
		jestConfig,
		typescriptConfig,
	],
};
