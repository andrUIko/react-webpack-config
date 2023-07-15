const path = require("node:path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = (_, argv) => {
	const isDevelopment = argv.mode !== "production";

	return {
		entry: "./src/index.tsx",
		output: {
			path: path.resolve("dist"),
			filename: "bundle.js",
		},
		resolve: {
			modules: ["node_modules", path.join(__dirname, "src")],
		},

		mode: isDevelopment ? "development" : "production",

		module: {
			rules: [
				{
					test: /\.css$/,
					exclude: /\.module\.css$/,
					use: [
						{ loader: require.resolve("style-loader") },
						{ loader: require.resolve("css-loader") },
					],
				},
				{
					test: /\.module\.css$/,
					use: [
						{ loader: require.resolve("style-loader") },
						{
							loader: require.resolve("css-loader"),
							options: { modules: true },
						},
					],
				},
				{
					test: /\.s[ac]ss$/i,
					exclude: /\.module\.s[ac]ss$/,
					use: [
						{ loader: require.resolve("style-loader") },
						{ loader: require.resolve("css-loader") },
						{ loader: require.resolve("sass-loader") },
					],
				},
				{
					test: /\.module\.s[ac]ss$/i,
					use: [
						{ loader: require.resolve("style-loader") },
						{
							loader: require.resolve("css-loader"),
							options: { modules: true },
						},
						{
							loader: require.resolve("sass-loader"),
						},
					],
				},
				{
					test: /\.(js|jsx|ts|tsx)$/,
					exclude: /node_modules/,
					use: [
						{
							loader: require.resolve("babel-loader"),
							options: {
								plugins: [
									isDevelopment &&
										require.resolve("react-refresh/babel"),
								].filter(Boolean),
							},
						},
					],
				},
				{
					test: /\.(eot|svg|ttf|woff|woff2)$/,
					use: require.resolve("file-loader"),
				},
			],
		},
		devServer: {
			static: {
				directory: path.join(__dirname, "./public"),
			},

			compress: true,
			port: 8080,
			historyApiFallback: true,
		},
		plugins: [
			new HTMLWebpackPlugin({
				template: path.resolve(__dirname, "public/template.html"),
				filename: "index.html",
				inject: "body",
			}),
			isDevelopment && new ReactRefreshWebpackPlugin(),
			isDevelopment &&
				new ForkTsCheckerWebpackPlugin({
					typescript: {
						diagnosticOptions: {
							semantic: true,
							syntactic: true,
						},
					},
				}),
		].filter(Boolean),
	};
};
