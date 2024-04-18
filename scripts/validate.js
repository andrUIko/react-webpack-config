const concurrently = require("concurrently");
const { spawnSync } = require("node:child_process");
const Table = require("cli-table3");

const commands = [
    { command: "npm run check-types", name: "tsc", prefixColor: "blue" },
    { command: "npm run lint", name: "eslint", prefixColor: "yellow" },
    {
        command: "npm run check-format",
        name: "prettier",
        prefixColor: "magenta",
    },
];

const { result } = concurrently(commands, {
    prefix: "name",
});

let isErr = false;

result
    .then((res) => {
        printExecutionResults(res);
    })
    .catch((err) => {
        isErr = true;
        printExecutionResults(err);
    })
    .finally(() => {
        if (isErr) {
            process.exit(1);
        }
        const test = spawnSync("npm", ["run", "test"], { stdio: "inherit" });
        if (test.status !== 0) {
            process.exit(test.status);
        }
        const build = spawnSync("npm", ["run", "build"], { stdio: "inherit" });
        if (build.status !== 0) {
            process.exit(build.status);
        }
    });

function printExecutionResults(results) {
    const table = new Table({
        head: ["name", "duration", "exitCode", "killed", "command"],
    });

    for (const result of results) {
        const { name, command } = result.command;
        const { killed, exitCode } = result;
        const { durationSeconds: duration } = result.timings;
        table.push([name, duration, exitCode, killed, command]);
    }
    console.log(table.toString());
}
