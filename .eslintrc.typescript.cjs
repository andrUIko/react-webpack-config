/** @type {import('eslint').Linter.ConfigOverride} */
module.exports = {
	files: ["*.+(ts|tsx)"],
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint/eslint-plugin", "import"],
	parserOptions: {
		project: true,
		tsconfigRootDir: __dirname,
	},
	extends: [
		"plugin:@typescript-eslint/strict-type-checked",
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
		"@typescript-eslint/no-unnecessary-condition": "off",
		"@typescript-eslint/no-unused-vars": [
			"error",
			{
				argsIgnorePattern: "^_",
				destructuredArrayIgnorePattern: "^_",
				varsIgnorePattern: "^_",
			},
		],
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
};
