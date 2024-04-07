const path = require("node:path");
const devServer = require("./devserver.config.cjs");
const {
    compressionPlugin,
    miniCssExtractPlugin,
    webpackBarPlugin,
    forkTsCheckerWebpackPlugin,
    reactRefreshWebpackPlugin,
    bundleAnalyzerPlugin,
    htmlWebpackPlugin,
} = require("./webpack.plugins.cjs");
const {
    jsTsRules,
    assetsRules,
    cssRules,
    sassRules,
    cssModuleRules,
    sassModuleRules,
} = require("./webpack.rules.cjs");

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
        stats: {
            assets: false,
            chunks: false,
            modules: false,
            entrypoints: false,
        },
        module: {
            rules: [
                jsTsRules(isDevelopment),
                cssRules(isDevelopment),
                sassRules(isDevelopment),
                cssModuleRules(isDevelopment),
                sassModuleRules(isDevelopment),
                assetsRules(),
            ],
        },
        devtool: isDevelopment ? "inline-source-map" : false,
        devServer,
        plugins: [htmlWebpackPlugin()].concat(
            isDevelopment
                ? [reactRefreshWebpackPlugin(), forkTsCheckerWebpackPlugin()]
                : [
                      compressionPlugin(),
                      bundleAnalyzerPlugin(),
                      miniCssExtractPlugin(),
                      webpackBarPlugin(),
                  ]
        ),
    };
};
