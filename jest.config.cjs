/** @type {import('jest').Config} */
const config = {
	testEnvironment: "jest-environment-jsdom",
	moduleNameMapper: {
		"\\.(css|sass|scss)$": "identity-obj-proxy",
	},
	prettierPath: require.resolve("prettier-2"),
};

module.exports = config;
