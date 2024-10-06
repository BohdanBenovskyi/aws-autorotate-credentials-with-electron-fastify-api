import { fixupConfigRules, includeIgnoreFile } from "@eslint/compat";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

const gitignorePath = path.resolve(__dirname, ".gitignore");

export default [
    ...fixupConfigRules(
        compat.extends(
            "eslint:recommended",
            "plugin:@typescript-eslint/eslint-recommended",
            "plugin:@typescript-eslint/recommended",
            "plugin:import/recommended",
            "plugin:import/typescript",
        )
    ),
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },

            parserOptions: {
                project: true,
                tsconfigRootDir: __dirname,
            },
        },
        rules: {
            "@typescript-eslint/consistent-type-definitions": "off",
            "import/no-unresolved": "error",
            "@typescript-eslint/no-misused-promises": ["error", {
                checksVoidReturn: false,
            }],
        },
        settings: {
            "import/parsers": {
                "@typescript-eslint/parser": [".ts", ".tsx"]
            },
            "import/resolver": {
                typescript: {
                    alwaysTryTypes: true,
                    project: "./tsconfig.json",

                }
             }
        }
    },
    {
        ignores: [
            "*.config.mjs",
            "*.config.js",
            "*.config.ts",
            "./tests/setup-jest.ts",
            ...includeIgnoreFile(gitignorePath).ignores
        ],
    },
];