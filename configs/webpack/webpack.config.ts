import path from "node:path";
import makeRules from "./webpack.rules.ts";
import devServer from "./devserver.config.ts";
import {
    compressionPlugin,
    miniCssExtractPlugin,
    webpackBarPlugin,
    forkTsCheckerWebpackPlugin,
    reactRefreshWebpackPlugin,
    bundleAnalyzerPlugin,
    htmlWebpackPlugin,
    /* to be places under "resolver" field */
    tsconfigPathsWebpackPlugin,
} from "./webpack.plugins.ts";

import type { Configuration } from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import type { Argv } from "webpack-cli";

const commonPluginsFactory = () => [htmlWebpackPlugin()];

const devPluginsFactory = () => [
    reactRefreshWebpackPlugin(),
    forkTsCheckerWebpackPlugin(),
];

const prodPluginsFactory = () => [
    compressionPlugin(),
    bundleAnalyzerPlugin(),
    miniCssExtractPlugin(),
    webpackBarPlugin(),
];

export default (
    env: NodeJS.ProcessEnv,
    argv: Argv
): Configuration & DevServerConfiguration => {
    const isDevelopment = argv.mode !== "production";
    const rules = makeRules(isDevelopment);
    const { jsTs, css, sass, cssModule, sassModule, assets } = rules;

    return {
        entry: path.join(process.cwd(), "src", "index.tsx"),

        output: {
            path: path.resolve("dist"),
            filename: "[name].[fullhash].js",
            clean: true,
        },

        resolve: {
            modules: ["node_modules", path.join(process.cwd(), "src")],
            plugins: [tsconfigPathsWebpackPlugin()],
        },

        mode: isDevelopment ? "development" : "production",
        stats: {
            assets: false,
            chunks: false,
            modules: true,
            modulesSpace: 9,
            entrypoints: false,
        },
        module: {
            rules: [jsTs, css, sass, cssModule, sassModule, assets],
        },
        devtool: isDevelopment ? "inline-source-map" : false,
        devServer,
        plugins: [
            ...commonPluginsFactory(),
            ...(isDevelopment ? devPluginsFactory() : prodPluginsFactory()),
        ],
    };
};
