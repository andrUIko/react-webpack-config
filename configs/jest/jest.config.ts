import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
    rootDir: "../..",
    projects: ["<rootDir>/configs/jest/jest.client.ts"],
    watchPlugins: [
        "jest-watch-select-projects",
        "jest-watch-typeahead/filename",
        "jest-watch-typeahead/testname",
    ],
};

export default config;
