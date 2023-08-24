const jestConfig = require("./.eslintrc.jest.cjs");
const typescriptConfig = require("./.eslintrc.typescript.cjs");
const configFilesConfig = require("./.eslintrc.configFiles.cjs");

/** @type {import('eslint').Linter.Config} */
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
	extends: [
		"eslint:recommended",
		"eslint-config-prettier",
		"plugin:import/recommended",
	],
	rules: {
		strict: ["error", "never"],
		"import/export": "off",
	},
	plugins: ["import"],
	env: {
		browser: true,
	},
	overrides: [configFilesConfig, jestConfig, typescriptConfig],
};
