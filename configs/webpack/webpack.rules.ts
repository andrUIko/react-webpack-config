import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "node:path";
import { RuleSetRule } from "webpack";

const cssRules = (isDevelopment: boolean): RuleSetRule => ({
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
});

const sassRules = (isDevelopment: boolean): RuleSetRule => ({
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
});

const cssModuleRules = (isDevelopment: boolean): RuleSetRule => ({
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
});

const sassModuleRules = (isDevelopment: boolean): RuleSetRule => ({
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
});

const jsTsRules = (isDevelopment: boolean): RuleSetRule => ({
    test: /\.(js|jsx|ts|tsx)$/,
    exclude: /node_modules/,
    use: [
        {
            loader: require.resolve("babel-loader"),
            options: {
                configFile: path.join(
                    process.cwd(),
                    "configs",
                    "babel.config.js"
                ),
                sourceMap: isDevelopment,
                plugins: isDevelopment
                    ? [require.resolve("react-refresh/babel")]
                    : undefined,
            },
        },
    ],
});

const assetsRules = () => ({
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: "asset/resource",
    generator: {
        filename: "assets/fonts/[name][ext]",
    },
});

export default (isDevelopment: boolean) => ({
    css: cssRules(isDevelopment),
    sass: sassRules(isDevelopment),
    cssModule: cssModuleRules(isDevelopment),
    sassModule: sassModuleRules(isDevelopment),
    jsTs: jsTsRules(isDevelopment),
    assets: assetsRules(),
});
