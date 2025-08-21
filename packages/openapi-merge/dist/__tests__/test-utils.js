"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectErrorType = expectErrorType;
exports.expectMergeResult = expectMergeResult;
exports.toMergeInputs = toMergeInputs;
const data_1 = require("../data");
function expectErrorType(result, type) {
    if ((0, data_1.isErrorResult)(result)) {
        expect(result.type).toEqual(type);
    }
    else {
        fail(`Expected an error, but instead got: ${JSON.stringify(result, null, 2)}`);
    }
}
function expectMergeResult(actual, expected) {
    if ((0, data_1.isErrorResult)(actual)) {
        fail(`We expected to have a successful merge and instead got: ${JSON.stringify(actual, null, 2)}`);
    }
    expect(actual).toEqual(expected);
}
function toMergeInputs(oass) {
    return oass.map(oas => ({ oas }));
}
