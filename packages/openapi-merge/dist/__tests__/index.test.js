"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const test_utils_1 = require("./test-utils");
const oas_generation_1 = require("./oas-generation");
describe('merge', () => {
    describe('simple cases', () => {
        it('should return an error if no inputs are provided', () => {
            (0, test_utils_1.expectErrorType)((0, __1.merge)([]), 'no-inputs');
        });
        it('should result in a no-op on a simple swagger file', () => {
            (0, test_utils_1.expectMergeResult)((0, __1.merge)((0, test_utils_1.toMergeInputs)([(0, oas_generation_1.toOAS)({})])), { output: (0, oas_generation_1.toOAS)({}) });
        });
    });
});
