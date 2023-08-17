const path = require("node:path");

/** @type {import('jest').Config} */
module.exports = {
	testEnvironment: "jest-environment-jsdom",
	moduleNameMapper: {
		"\\.(css|sass|scss)$": "identity-obj-proxy",
	},
	prettierPath: require.resolve("prettier-2"),
	moduleDirectories: [
		"node_modules",
		path.join(__dirname, "src"),
		path.join(__dirname, "test"),
	],
};
