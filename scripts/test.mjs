import { $ } from "execa";
import path from "node:path";

const paths = {
    tsConfig: path.join(process.cwd(), "configs", "tsconfig.json"),
    jestConfig: path.join(process.cwd(), "configs", "jest.config.ts"),
};

const args = process.argv.slice(2).join(" ");

const env = {
    TS_NODE_PROJECT: paths.tsConfig,
};

const $$ = $({ stdio: "inherit", env });

await $$`jest --config=${paths.jestConfig} ${args}`;
