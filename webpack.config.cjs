const path = require("node:path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin =
	require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const { ProgressPlugin } = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const zlib = require("node:zlib");
const devServer = require("./devserver.config.cjs");

/**
 * @param {Partial<Record<string, string|boolean>>} env
 * @param {import('webpack-cli').Argv} argv
 * @typedef {import('webpack').Configuration} Configuration
 * @typedef {import('webpack-dev-server').Configuration} DevServerConfiguration
 * @returns {Configuration & DevServerConfiguration}
 * */
module.exports = (env, argv) => {
	const isDevelopment = argv.mode !== "production";

	return {
		entry: "./src/index.tsx",

		output: {
			path: path.resolve("dist"),
			filename: "[name].[fullhash].js",
			clean: true,
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
						{
							loader: require.resolve("css-loader"),
							options: {
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
								modules: {
									exportLocalsConvention: "camelCaseOnly",
								},
								sourceMap: isDevelopment,
							},
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
								modules: {
									exportLocalsConvention: "camelCaseOnly",
								},
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
					test: /\.(woff|woff2|eot|ttf|otf)$/i,
					type: "asset/resource",
					generator: {
						filename: "assets/fonts/[name][ext]",
					},
				},
			],
		},
		devtool: isDevelopment ? "inline-source-map" : false,
		devServer,
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
			new ProgressPlugin(),
			...(isDevelopment
				? [
						new ReactRefreshWebpackPlugin({
							overlay: false,
						}),
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
			!isDevelopment &&
				new CompressionPlugin({
					filename: "[path][base].br",
					algorithm: "brotliCompress",
					test: /\.(js|css|html|svg)$/,
					compressionOptions: {
						params: {
							[zlib.constants.BROTLI_PARAM_QUALITY]: 11,
						},
					},
					threshold: 10240,
					minRatio: 0.8,
					deleteOriginalAssets: false,
				}),
			new BundleAnalyzerPlugin({
				analyzerMode: "json",
			}),
		].filter(Boolean),
	};
};
