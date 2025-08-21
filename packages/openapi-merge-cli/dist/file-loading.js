"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonOrYamlParseError = void 0;
exports.readFileAsString = readFileAsString;
exports.readYamlOrJSON = readYamlOrJSON;
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
class JsonOrYamlParseError extends Error {
    constructor(jsonError, yamlError) {
        super(`Failed to parse the input as either JSON or YAML.\n\nJSON Error: ${jsonError.message}\n\nYAML Error: ${yamlError.message}`);
    }
}
exports.JsonOrYamlParseError = JsonOrYamlParseError;
function readFilePromise(filePath) {
    return new Promise((resolve, reject) => {
        fs_1.default.readFile(filePath, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}
async function readFileAsString(filePath) {
    return (await readFilePromise(filePath)).toString('utf-8');
}
async function readYamlOrJSON(fileContents) {
    let jsonError;
    try {
        return JSON.parse(fileContents);
    }
    catch (e) {
        jsonError = e instanceof Error ? e : new Error(String(e));
    }
    let yamlError;
    try {
        return js_yaml_1.default.load(fileContents);
    }
    catch (e) {
        yamlError = e instanceof Error ? e : new Error(String(e));
    }
    throw new JsonOrYamlParseError(jsonError, yamlError);
}
