import path from "node:path";
import type { Configuration } from "webpack-dev-server";

const devServerConfig: Configuration = {
	static: {
		directory: path.join(__dirname, "./public"),
	},
	hot: true,
	compress: true,
	port: 8080,
	historyApiFallback: true,
	open: true,
};

export default devServerConfig;
