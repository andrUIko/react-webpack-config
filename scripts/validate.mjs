import { $ } from "execa";

const $$ = $({ stdio: "inherit" });

const args = [
    "-c",
    "blue,magenta,yellow",
    "-n",
    "tsc,prettier,eslint",
    "--timings",
    "npm run check-types",
    "npm run check-format",
    // "npm run lint",
];

try {
    await $$`concurrently ${args}`;
    await $$`npm run test`;
    await $$`npm run build`;
} catch (_e) {
    process.exit(1);
}
