import path from "node:path";
import type { Configuration } from "webpack-dev-server";

const devServerConfig = {
    static: {
        directory: path.join(__dirname, "./public"),
    },
    hot: true,
    compress: true,
    port: 8080,
    historyApiFallback: true,
    open: false,
} as const satisfies Configuration;

export default devServerConfig;
