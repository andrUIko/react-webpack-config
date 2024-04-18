const { spawn } = require("child_process");
const path = require("path");

const tsNodeProject = path.join(process.cwd(), "configs", "tsconfig.json");
const jestConfig = path.join(process.cwd(), "configs", "jest.config.ts");

const command = "node";
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

const child = spawn(command, args, {
    env: env,
    stdio: "inherit",
});

child.on("exit", (code) => {
    process.exit(code);
});
