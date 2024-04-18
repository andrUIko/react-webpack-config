import { $ } from "execa";
import path from "node:path";

const tsNodeProject = path.join(process.cwd(), "configs", "tsconfig.json");
const jestConfig = path.join(process.cwd(), "configs", "jest.config.ts");

const args = [
    "--inspect-brk",
    "node_modules/jest/bin/jest",
    "--config",
    jestConfig,
    "--runInBand",
    "--detectOpenHandles",
    "--watchAll",
];

const env = {
    ...process.env,
    TS_NODE_PROJECT: tsNodeProject,
    NODE_ENV: "test",
};

const $$ = $({
    env,
    stdio: "inherit",
});

await $$`node ${args}`;
