const path = require("node:path");

/** @type {import('webpack-dev-server').Configuration} */
module.exports = {
    static: {
        directory: path.join(__dirname, "./public"),
    },
    hot: true,
    compress: true,
    port: 8080,
    historyApiFallback: true,
    open: true,
};
