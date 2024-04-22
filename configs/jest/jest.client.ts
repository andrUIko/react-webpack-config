import { JestConfigWithTsJest } from "ts-jest";
import commonConfig from "./jest.common.ts";

const config: JestConfigWithTsJest = {
    // snapshotSerializers: ["@emotion/jest/serializer"],
    ...commonConfig,
    displayName: "client",
    testEnvironment: "jsdom",
    testEnvironmentOptions: {
        customExportConditions: [""],
    },
};

export default config;
