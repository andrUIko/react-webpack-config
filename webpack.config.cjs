const path = require("node:path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin =
	require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

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
						{
							loader: isDevelopment
								? require.resolve("style-loader")
								: MiniCssExtractPlugin.loader,
						},
						{ loader: require.resolve("css-loader") },
					],
				},
				{
					test: /\.module\.css$/,
					use: [
						{
							loader: isDevelopment
								? require.resolve("style-loader")
								: MiniCssExtractPlugin.loader,
						},
						{
							loader: require.resolve("css-loader"),
							options: {
								modules: true,
								sourceMap: isDevelopment,
							},
						},
					],
				},
				{
					test: /\.s[ac]ss$/i,
					exclude: /\.module\.s[ac]ss$/,
					use: [
						{
							loader: isDevelopment
								? require.resolve("style-loader")
								: MiniCssExtractPlugin.loader,
						},
						{
							loader: require.resolve("css-loader"),
							options: {
								sourceMap: isDevelopment,
							},
						},
						{
							loader: require.resolve("sass-loader"),
							options: { sourceMap: isDevelopment },
						},
					],
				},
				{
					test: /\.module\.s[ac]ss$/i,
					use: [
						{
							loader: isDevelopment
								? require.resolve("style-loader")
								: MiniCssExtractPlugin.loader,
						},
						{
							loader: require.resolve("css-loader"),
							options: {
								modules: true,
								sourceMap: isDevelopment,
							},
						},
						{
							loader: require.resolve("sass-loader"),
							options: { sourceMap: isDevelopment },
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
			hot: true,
			compress: true,
			port: 8080,
			historyApiFallback: true,
			open: true,
		},
		plugins: [
			new HTMLWebpackPlugin({
				template: path.resolve(__dirname, "public/template.html"),
				filename: "index.html",
				inject: "body",
			}),
			new MiniCssExtractPlugin({
				filename: isDevelopment
					? "[name].css"
					: "[name].[fullhash].css",
				chunkFilename: isDevelopment
					? "[id].css"
					: "[id].[fullhash].css",
			}),
			...(isDevelopment
				? [
						new ReactRefreshWebpackPlugin(),
						new ForkTsCheckerWebpackPlugin({
							typescript: {
								diagnosticOptions: {
									semantic: true,
									syntactic: true,
								},
							},
						}),
				  ]
				: []),
			new BundleAnalyzerPlugin({
				analyzerMode: isDevelopment ? "server" : "static",
			}),
		].filter(Boolean),
	};
};
