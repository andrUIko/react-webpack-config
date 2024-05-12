import path from "node:path";
import { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
    moduleNameMapper: { "\\.(css|sass|scss)$": "identity-obj-proxy" },
    modulePathIgnorePatterns: ["<rootDir>/scripts/"],
    rootDir: "../..",
    preset: "ts-jest/presets/js-with-ts-esm",
    injectGlobals: true,
    prettierPath: require.resolve("prettier-2"),
    moduleDirectories: [
        "node_modules",
        path.join(process.cwd(), "src"),
        path.join(process.cwd(), "test"),
    ],
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
