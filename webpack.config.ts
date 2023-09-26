import path from "node:path";
import zlib from "node:zlib";
import { ProgressPlugin } from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import CompressionPlugin, { ZlibOptions } from "compression-webpack-plugin";
import devServer from "./devserver.config.ts";
import { type Configuration as DevServerConfiguration } from "webpack-dev-server";
import { type Configuration } from "webpack";
import { type Argv } from "webpack-cli";

type WebpackConfig = (
	env: Partial<Record<string, string | boolean>>,
	argv: Argv
) => Configuration & DevServerConfiguration;

const webpackConfig: WebpackConfig = (env, argv) => {
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
					} as ZlibOptions,
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

export default webpackConfig;
