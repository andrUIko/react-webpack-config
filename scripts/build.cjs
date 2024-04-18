const { spawn } = require("cross-spawn");
const path = require("node:path");

const tsNodeProject = path.join(process.cwd(), "configs", "tsconfig.json");
const webpackConfig = path.join(
    process.cwd(),
    "configs",
    "webpack",
    "webpack.config.ts"
);

const command = "webpack";
const args = ["--mode=production", `--config=${webpackConfig}`];

const env = {
    ...process.env,
    TS_NODE_PROJECT: tsNodeProject,
    NODE_ENV: "production",
};

const child = spawn(command, args, {
    env: env,
    stdio: "inherit",
});

child.on("exit", process.exit);
