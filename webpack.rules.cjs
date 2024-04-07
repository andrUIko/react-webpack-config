const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("node:path");

const cssRules = (isDevelopment) => ({
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

const sassRules = (isDevelopment) => ({
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

const cssModuleRules = (isDevelopment) => ({
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

const sassModuleRules = (isDevelopment) => ({
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

const jsTsRules = (isDevelopment) => ({
    test: /\.(js|jsx|ts|tsx)$/,
    exclude: /node_modules/,
    use: [
        {
            loader: require.resolve("babel-loader"),
            options: {
                configFile: path.join(__dirname, "configs", "babel.config.cjs"),
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

module.exports = {
    cssRules,
    sassRules,
    cssModuleRules,
    sassModuleRules,
    jsTsRules,
    assetsRules,
};
