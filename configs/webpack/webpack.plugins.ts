import CompressionPlugin from "compression-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import zlib from "zlib";
import HTMLWebpackPlugin from "html-webpack-plugin";
import WebpackBar from "webpackbar";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from "node:path";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import TsconfigPathsWebpackPlugin from "tsconfig-paths-webpack-plugin";

const compressionPlugin = () =>
    new CompressionPlugin<zlib.BrotliOptions>({
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
    new BundleAnalyzerPlugin({ analyzerMode: "static", openAnalyzer: false });

const htmlWebpackPlugin = () =>
    new HTMLWebpackPlugin({
        template: path.resolve(process.cwd(), "public", "template.html"),
        filename: "index.html",
        inject: "body",
    });

const tsconfigPathsWebpackPlugin = () => {
    const configFile = path.resolve(process.cwd(), "tsconfig.json");

    return new TsconfigPathsWebpackPlugin({
        configFile,
    });
};

export {
    compressionPlugin,
    miniCssExtractPlugin,
    webpackBarPlugin,
    forkTsCheckerWebpackPlugin,
    reactRefreshWebpackPlugin,
    bundleAnalyzerPlugin,
    htmlWebpackPlugin,
    tsconfigPathsWebpackPlugin,
};
