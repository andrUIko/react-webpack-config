const isTest = process.env.NODE_ENV === "test";

module.exports = {
	presets: [
		["@babel/preset-env", { modules: isTest ? "commonjs" : "auto" }],
		"@babel/preset-typescript",
		["@babel/preset-react", { runtime: "automatic" }],
	],
};
