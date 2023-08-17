/** @type {import('eslint').Linter.ConfigOverride} */
module.exports = {
	files: [
		"**/__tests__/*.+(ts|tsx|js|jsx)",
		"*.+(spec|test).{js,jsx,ts,tsx}",
	],
	plugins: ["jest"],
	extends: ["plugin:jest/recommended"],
	rules: {
		"jest/no-disabled-tests": "warn",
		"jest/no-focused-tests": "error",
		"jest/no-identical-title": "error",
		"jest/prefer-to-have-length": "warn",
		"jest/valid-expect": "error",
	},
	env: {
		"jest/globals": true,
	},
	settings: {
		jest: {
			jestConfigFile: "./jest.config.cjs",
		},
	},
};
