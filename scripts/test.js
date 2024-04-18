const { spawn } = require("node:child_process");
const path = require("node:path");

const tsNodeProject = path.join(process.cwd(), "configs", "tsconfig.json");
const jestConfig = path.join(process.cwd(), "configs", "jest.config.ts");

const command = "jest";
const args = [`--config=${jestConfig}`, ...process.argv.slice(2)];

const env = {
    ...process.env,
    TS_NODE_PROJECT: tsNodeProject,
    NODE_ENV: "test",
};

const child = spawn(command, args, {
    env: env,
    stdio: "inherit",
});

child.on("exit", (code) => {
    process.exit(code);
});
