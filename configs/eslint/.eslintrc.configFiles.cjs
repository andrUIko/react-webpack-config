/** @type {import('eslint').Linter.ConfigOverride} */
module.exports = {
    files: ["./configs/babel.config.js", "*.cjs"],
    env: {
        node: true,
    },
};
