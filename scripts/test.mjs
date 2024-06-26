import { $ } from "execa";
import path from "node:path";

const paths = {
    tsConfig: path.join(process.cwd(), "configs", "tsconfig.json"),
    jestConfig: path.join(process.cwd(), "configs", "jest", "jest.config.ts"),
};

const args = [
    `--config=${paths.jestConfig}`,
    ...process.argv.slice(2),
    "--passWithNoTests",
];

const env = {
    TS_NODE_PROJECT: paths.tsConfig,
};

const $$ = $({ stdio: "inherit", env });

try {
    await $$`jest ${args}`;
} catch (_e) {
    process.exit(1);
}
