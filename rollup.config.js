// rollup.config.js
import fs from "fs";
import path from "path";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";

const pkg = JSON.parse(fs.readFileSync(path.resolve('./package.json'), 'utf-8'));
const external = Object.keys(pkg.dependencies || {});

external.push("events");
external.push("crypto");
external.push("url");
external.push("uuid/v4");
external.push("fs");
external.push("path");

export default {
  input: "src/index.js",
  output: {
    file: "lib/index.js",
    format: "cjs",
    name: "SuperLogin",
  },
  plugins: [
    commonjs({
      include: 'node_modules/**'
    }),
    json(),
    babel({
      exclude: "node_modules/**",
      presets: [
        ["env", {
          "modules": false,
          "shippedProposals": true,
          "targets": {
            "node": 6
          }
        }]
      ],
      plugins: [
        ["transform-runtime", {
        "helpers": false,
        "polyfill": false,
        "regenerator": true,
        "moduleName": "babel-runtime",
      }], "external-helpers"],
      runtimeHelpers: true
    })
  ],
  external
};
