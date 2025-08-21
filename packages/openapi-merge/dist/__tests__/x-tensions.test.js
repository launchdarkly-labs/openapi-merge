"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const oas_generation_1 = require("./oas-generation");
const __1 = require("..");
const test_utils_1 = require("./test-utils");
describe('extensions', () => {
    it('should take the first extension definition at the top level', () => {
        const first = (0, oas_generation_1.toOAS)({});
        first["x-atlassian-narrative"] = {
            documents: [{
                    anchor: 'first-intro',
                    title: 'First Introduction',
                    body: 'First intro section for reading'
                }]
        };
        const second = (0, oas_generation_1.toOAS)({});
        second["x-atlassian-narrative"] = {
            documents: [{
                    anchor: 'second-intro',
                    title: 'Second Introduction',
                    body: 'Second intro section for reading'
                }]
        };
        const output = (0, oas_generation_1.toOAS)({});
        output["x-atlassian-narrative"] = {
            documents: [{
                    anchor: 'first-intro',
                    title: 'First Introduction',
                    body: 'First intro section for reading'
                }]
        };
        (0, test_utils_1.expectMergeResult)((0, __1.merge)((0, test_utils_1.toMergeInputs)([first, second])), {
            output
        });
    });
});
