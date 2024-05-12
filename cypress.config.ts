import { defineConfig } from "cypress";
import webpackConfig from "./configs/webpack/webpack.config.ts";

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        experimentalRunAllSpecs: true,
    },

    component: {
        devServer: {
            framework: "react",
            bundler: "webpack",
            webpackConfig,
        },
    },
});
