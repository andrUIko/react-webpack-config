import { $ } from "execa";
import path from "node:path";

const paths = {
    tsConfig: path.join(process.cwd(), "configs", "tsconfig.json"),
    webpackConfig: path.join(
        process.cwd(),
        "configs",
        "webpack",
        "webpack.config.ts"
    ),
};

const env = {
    TS_NODE_PROJECT: paths.tsConfig,
    NODE_ENV: "production",
};

const $$ = $({ stdio: "inherit", env });

try {
    await $$`webpack --mode=production --config=${paths.webpackConfig}`;
} catch (_e) {
    process.exit(1);
}
