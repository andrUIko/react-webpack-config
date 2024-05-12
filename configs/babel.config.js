const isTest = process.env.NODE_ENV === "test";
const isProd = process.env.NODE_ENV === "production";
const isDevelopment = process.env.NODE_ENV === "development";

const sourceMaps = isProd ? false : "inline";

const presetEnvOpts = {
    modules: isTest ? "commonjs" : false,
};

const presetTypescriptOpts = {};

const presetReactOpts = {
    development: isDevelopment || isTest,
    runtime: "automatic",
};

export default {
    presets: [
        ["@babel/preset-env", presetEnvOpts],
        ["@babel/preset-react", presetReactOpts],
        ["@babel/preset-typescript", presetTypescriptOpts],
    ],
    sourceMaps,
    plugins: ["@babel/plugin-transform-runtime"],
    parserOpts: {
        strictMode: true,
    },
};
