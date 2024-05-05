import path from "node:path";
import { JestConfigWithTsJest } from "ts-jest";
import babelConfig from "../babel.config.js";

const config: JestConfigWithTsJest = {
    moduleNameMapper: {
        "\\.(css|sass|scss)$": "identity-obj-proxy",
    },
    modulePathIgnorePatterns: ["<rootDir>/scripts/"],
    rootDir: "../..",
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
    silent: false,
    collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx,js,jsx}"],
    coverageThreshold: {
        global: {
            branches: 20,
            functions: 20,
            lines: 20,
            statements: 20,
        },
        "./src/shared/utils.ts": {
            branches: 85,
            functions: 85,
            lines: 85,
            statements: 85,
        },
    },
};

export default config;
