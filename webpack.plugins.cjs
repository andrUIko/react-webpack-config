const CompressionPlugin = require("compression-webpack-plugin");
const zlib = require("zlib");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBar = require("webpackbar");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require("node:path");

const compressionPlugin = () =>
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
    });

const miniCssExtractPlugin = () =>
    new MiniCssExtractPlugin({
        filename: "[name].[fullhash].css",
        chunkFilename: "[id].[fullhash].css",
    });

const webpackBarPlugin = () =>
    new WebpackBar({ name: "app", color: "#61dafb" });

const forkTsCheckerWebpackPlugin = () =>
    new ForkTsCheckerWebpackPlugin({
        typescript: {
            diagnosticOptions: {
                semantic: true,
                syntactic: true,
            },
        },
    });

const reactRefreshWebpackPlugin = () =>
    new ReactRefreshWebpackPlugin({
        overlay: false,
    });

const bundleAnalyzerPlugin = () =>
    new BundleAnalyzerPlugin({ analyzerMode: "static" });

const htmlWebpackPlugin = () =>
    new HTMLWebpackPlugin({
        template: path.resolve(__dirname, "public/template.html"),
        filename: "index.html",
        inject: "body",
    });

module.exports = {
    compressionPlugin,
    miniCssExtractPlugin,
    webpackBarPlugin,
    forkTsCheckerWebpackPlugin,
    reactRefreshWebpackPlugin,
    bundleAnalyzerPlugin,
    htmlWebpackPlugin,
};
