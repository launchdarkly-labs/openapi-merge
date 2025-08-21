"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfiguration = loadConfiguration;
const ajv_1 = __importDefault(require("ajv"));
const configuration_schema_json_1 = __importDefault(require("./configuration.schema.json"));
const file_loading_1 = require("./file-loading");
const process_1 = __importDefault(require("process"));
async function validateConfiguration(rawData) {
    try {
        const data = await (0, file_loading_1.readYamlOrJSON)(rawData);
        const ajv = new ajv_1.default();
        const validate = ajv.compile(configuration_schema_json_1.default);
        const valid = validate(data);
        if (!valid) {
            return ajv.errorsText(validate.errors);
        }
        return data;
    }
    catch (e) {
        return `Could not parse configuration: ${e}`;
    }
}
const STANDARD_CONFIG_FILE = 'openapi-merge.json';
async function loadConfiguration(configLocation) {
    const configFile = configLocation === undefined ? STANDARD_CONFIG_FILE : configLocation;
    try {
        const rawData = await (0, file_loading_1.readFileAsString)(configFile);
        return await validateConfiguration(rawData);
    }
    catch {
        return `Could not find or read '${configFile}' in the current directory: ${process_1.default.cwd()}`;
    }
}
