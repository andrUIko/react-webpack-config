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

const makeRules = require("./webpack.rules.cjs");

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

/**
 * @param {Partial<Record<string, string|boolean>>} env
 * @param {import('webpack-cli').Argv} argv
 * @typedef {import('webpack').Configuration} Configuration
 * @typedef {import('webpack-dev-server').Configuration} DevServerConfiguration
 * @returns {Configuration & DevServerConfiguration}
 * */
module.exports = (env, argv) => {
    const isDevelopment = argv.mode !== "production";
    const rules = makeRules(isDevelopment);
    const { jsTs, css, sass, cssModule, sassModule, assets } = rules;

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
