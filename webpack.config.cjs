const path = require("node:path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
                                configFile: path.join(
                                    __dirname,
                                    "configs",
                                    "babel.config.cjs"
                                ),
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
            htmlWebpackPlugin(),
            ...(isDevelopment
                ? [
                      reactRefreshWebpackPlugin(),
                      forkTsCheckerWebpackPlugin(),
                      webpackBarPlugin(),
                  ]
                : [
                      compressionPlugin(),
                      bundleAnalyzerPlugin(),
                      miniCssExtractPlugin(),
                  ]),
        ],
    };
};
