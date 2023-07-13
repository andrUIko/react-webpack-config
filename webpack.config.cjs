const path = require("node:path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/index.tsx",
	output: {
		path: path.resolve("dist"),
		filename: "bundle.js",
	},
	resolve: {
		modules: ["node_modules", path.join(__dirname, "src"), "shared"],
	},
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
				use: "babel-loader",
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
	],
};
