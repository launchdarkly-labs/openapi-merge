"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isConfigurationInputFromFile = isConfigurationInputFromFile;
function isConfigurationInputFromFile(input) {
    return 'inputFile' in input;
}
