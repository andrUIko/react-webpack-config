import path from "node:path";
import babelConfig from "./babel.config.js";
import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(css|sass|scss)$": "identity-obj-proxy",
    },
    modulePathIgnorePatterns: ["<rootDir>/scripts/"],
    rootDir: "../",
    injectGlobals: true,
    prettierPath: require.resolve("prettier-2"),
    moduleDirectories: [
        "node_modules",
        path.join(process.cwd(), "src"),
        path.join(process.cwd(), "test"),
    ],
    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                babelConfig,
            },
        ],
    },
};

export default config;
