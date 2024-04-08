import path from "node:path";
import { JestConfigWithTsJest } from "ts-jest";
import { defaults } from "ts-jest/presets";

const config = {
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(css|sass|scss)$": "identity-obj-proxy",
    },
    rootDir: "../",
    prettierPath: require.resolve("prettier-2"),
    moduleDirectories: [
        "node_modules",
        path.join(process.cwd(), "src"),
        path.join(process.cwd(), "test"),
    ],
    transform: {
        ...defaults.transform,
    },
} satisfies JestConfigWithTsJest;

export default config;
