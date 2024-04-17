const spawn = require("cross-spawn");
const path = require("path");

const tsNodeProject = path.join(process.cwd(), "configs", "tsconfig.json");
const webpackConfig = path.join(
    process.cwd(),
    "configs",
    "webpack",
    "webpack.config.ts"
);

const command = "webpack";
const args = ["--mode=production", `--config=${webpackConfig}`];

try {
    const result = spawn.sync(
        "cross-env",
        [
            `TS_NODE_PROJECT=${tsNodeProject}`,
            `NODE_ENV=production`,
            command,
            ...args,
        ],
        { stdio: "inherit" }
    );

    if (result.error) {
        throw result.error;
    }

    if (result.status !== 0) {
        throw new Error(`Command failed with exit code ${result.status}`);
    }
} catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
}
