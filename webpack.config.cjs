const path = require("node:path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
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
				use: [{ loader: "style-loader" }, { loader: "css-loader" }],
			},
			{
				test: /\.module\.css$/,
				use: [
					{ loader: "style-loader" },
					{
						loader: "css-loader",
						options: {
							modules: true,
						},
					},
				],
			},
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
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
				use: "file-loader",
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
		new ForkTsCheckerWebpackPlugin({
			typescript: {
				diagnosticOptions: {
					semantic: true,
					syntactic: true,
				},
			},
		}),
		isDevelopment && new ReactRefreshWebpackPlugin(),
	].filter(Boolean),
};
