"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const oas_generation_1 = require("./oas-generation");
const test_utils_1 = require("./test-utils");
describe('OAS Path Merge', () => {
    it('should merge paths where one paths is null', () => {
        const first = (0, oas_generation_1.toOAS)({});
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        first['paths'] = null;
        const second = (0, oas_generation_1.toOAS)({
            '/path/b': {
                post: {
                    responses: {}
                }
            }
        });
        const output = (0, oas_generation_1.toOAS)({
            '/path/b': {
                post: {
                    responses: {}
                }
            }
        });
        (0, test_utils_1.expectMergeResult)((0, __1.merge)((0, test_utils_1.toMergeInputs)([first, second])), {
            output
        });
    });
    it('should merge paths from two files that do not overlap', () => {
        const first = (0, oas_generation_1.toOAS)({
            '/path/a': {
                get: {
                    responses: {}
                }
            }
        });
        const second = (0, oas_generation_1.toOAS)({
            '/path/b': {
                post: {
                    responses: {}
                }
            }
        });
        const output = (0, oas_generation_1.toOAS)({
            '/path/a': {
                get: {
                    responses: {}
                }
            },
            '/path/b': {
                post: {
                    responses: {}
                }
            }
        });
        (0, test_utils_1.expectMergeResult)((0, __1.merge)((0, test_utils_1.toMergeInputs)([first, second])), {
            output
        });
    });
    it('should ensure unique operationIds even if paths are different', () => {
        const first = (0, oas_generation_1.toOAS)({
            '/path/a': {
                get: {
                    operationId: 'same',
                    responses: {}
                }
            }
        });
        const second = (0, oas_generation_1.toOAS)({
            '/path/b': {
                post: {
                    operationId: 'same',
                    responses: {}
                }
            }
        });
        const output = (0, oas_generation_1.toOAS)({
            '/path/a': {
                get: {
                    operationId: 'same',
                    responses: {}
                }
            },
            '/path/b': {
                post: {
                    operationId: 'same1',
                    responses: {}
                }
            }
        });
        (0, test_utils_1.expectMergeResult)((0, __1.merge)((0, test_utils_1.toMergeInputs)([first, second])), {
            output
        });
    });
    it('should prefix paths correctly', () => {
        const first = (0, oas_generation_1.toOAS)({
            '/path/a': {
                get: {
                    responses: {}
                }
            }
        });
        const output = (0, oas_generation_1.toOAS)({
            '/service/path/a': {
                get: {
                    responses: {}
                }
            }
        });
        (0, test_utils_1.expectMergeResult)((0, __1.merge)([{ oas: first, pathModification: { prepend: '/service' } }]), {
            output
        });
    });
    it('should strip suffixed correctly', () => {
        const first = (0, oas_generation_1.toOAS)({
            '/rest/path/a': {
                get: {
                    responses: {}
                }
            }
        });
        const output = (0, oas_generation_1.toOAS)({
            '/path/a': {
                get: {
                    responses: {}
                }
            }
        });
        (0, test_utils_1.expectMergeResult)((0, __1.merge)([{ oas: first, pathModification: { stripStart: '/rest' } }]), {
            output
        });
    });
    it('should strip first and then prefix paths', () => {
        const first = (0, oas_generation_1.toOAS)({
            '/rest/path/a': {
                get: {
                    responses: {}
                }
            }
        });
        const output = (0, oas_generation_1.toOAS)({
            '/service/path/a': {
                get: {
                    responses: {}
                }
            }
        });
        (0, test_utils_1.expectMergeResult)((0, __1.merge)([{ oas: first, pathModification: { stripStart: '/rest', prepend: '/service' } }]), {
            output
        });
    });
    /**
     * TODO this is simpler logic to implement for now but, ideally, we would merge paths together if we could, if
     * the HTTP methods do not overlap. I can see a use case for two different services providing different methods
     * on the same path.
     */
    it('should return an error if there are duplicate paths (simple case)', () => {
        const first = (0, oas_generation_1.toOAS)({
            '/path/a': {
                get: {
                    responses: {}
                }
            }
        });
        const second = (0, oas_generation_1.toOAS)({
            '/path/a': {
                post: {
                    responses: {}
                }
            }
        });
        (0, test_utils_1.expectErrorType)((0, __1.merge)((0, test_utils_1.toMergeInputs)([first, second])), 'duplicate-paths');
    });
    it('should return an error if modifying a path would result in a duplicate', () => {
        const first = (0, oas_generation_1.toOAS)({
            '/path/a': {
                get: {
                    responses: {}
                }
            }
        });
        const second = (0, oas_generation_1.toOAS)({
            '/service/rest/path/a': {
                post: {
                    responses: {}
                }
            }
        });
        const firstInput = {
            oas: first,
            pathModification: {
                prepend: '/rest'
            }
        };
        const secondInput = {
            oas: second,
            pathModification: {
                stripStart: '/service'
            }
        };
        (0, test_utils_1.expectErrorType)((0, __1.merge)([firstInput, secondInput]), 'duplicate-paths');
    });
    describe('Tag Exclusion', () => {
        it('should strip out Path Items with no operations', () => {
            const first = (0, oas_generation_1.toOAS)({
                '/path/a': {
                    get: {
                        responses: {}
                    }
                },
                '/path/b': {
                    servers: []
                },
                '/path/emptyTags': {
                    delete: {
                        tags: [],
                        responses: {}
                    }
                },
                '/path/noTags': {
                    head: {
                        responses: {}
                    }
                }
            });
            const second = (0, oas_generation_1.toOAS)({
                '/path/b': {
                    get: {
                        responses: {}
                    }
                }
            });
            const output = (0, oas_generation_1.toOAS)({
                '/path/a': {
                    get: {
                        responses: {}
                    }
                },
                '/path/b': {
                    get: {
                        responses: {}
                    }
                },
                '/path/emptyTags': {
                    delete: {
                        tags: [],
                        responses: {}
                    }
                },
                '/path/noTags': {
                    head: {
                        responses: {}
                    }
                }
            });
            (0, test_utils_1.expectMergeResult)((0, __1.merge)([{ oas: first }, { oas: second }]), {
                output
            });
        });
        it('should remove operations that have been excluded', () => {
            const first = (0, oas_generation_1.toOAS)({
                '/path/a': {
                    get: {
                        tags: ['included'],
                        responses: {}
                    }
                },
                '/path/b': {
                    servers: []
                },
                '/path/c': {
                    get: {
                        tags: ['excluded'],
                        responses: {}
                    }
                },
                '/path/d': {
                    get: {
                        tags: ['included', 'excluded'],
                        responses: {}
                    }
                },
                '/path/emptyTags': {
                    delete: {
                        tags: [],
                        responses: {}
                    }
                },
                '/path/noTags': {
                    head: {
                        responses: {}
                    }
                }
            });
            const second = (0, oas_generation_1.toOAS)({
                '/path/b': {
                    get: {
                        responses: {}
                    }
                }
            });
            const output = (0, oas_generation_1.toOAS)({
                '/path/a': {
                    get: {
                        tags: ['included'],
                        responses: {}
                    }
                },
                '/path/b': {
                    get: {
                        responses: {}
                    }
                },
                '/path/emptyTags': {
                    delete: {
                        tags: [],
                        responses: {}
                    }
                },
                '/path/noTags': {
                    head: {
                        responses: {}
                    }
                }
            });
            (0, test_utils_1.expectMergeResult)((0, __1.merge)([{ oas: first, operationSelection: { excludeTags: ['excluded'] } }, { oas: second }]), {
                output
            });
        });
        it('should include operations that have been included', () => {
            const first = (0, oas_generation_1.toOAS)({
                '/path/a': {
                    get: {
                        tags: ['included'],
                        responses: {}
                    }
                },
                '/path/b': {
                    servers: []
                },
                '/path/c': {
                    get: {
                        tags: ['excluded'],
                        responses: {}
                    }
                },
                '/path/d': {
                    get: {
                        tags: ['included', 'excluded'],
                        responses: {}
                    }
                },
                '/path/emptyTags': {
                    delete: {
                        tags: [],
                        responses: {}
                    }
                },
                '/path/noTags': {
                    head: {
                        responses: {}
                    }
                }
            });
            const second = (0, oas_generation_1.toOAS)({
                '/path/b': {
                    get: {
                        responses: {}
                    }
                }
            });
            const output = (0, oas_generation_1.toOAS)({
                '/path/a': {
                    get: {
                        tags: ['included'],
                        responses: {}
                    }
                },
                '/path/b': {
                    get: {
                        responses: {}
                    }
                },
                '/path/d': {
                    get: {
                        tags: ['included', 'excluded'],
                        responses: {}
                    }
                }
            });
            (0, test_utils_1.expectMergeResult)((0, __1.merge)([{ oas: first, operationSelection: { includeTags: ['included'] } }, { oas: second }]), {
                output
            });
        });
        it('should follow exclusion precidence to inclusion', () => {
            const first = (0, oas_generation_1.toOAS)({
                '/path/a': {
                    get: {
                        tags: ['included'],
                        responses: {}
                    }
                },
                '/path/b': {
                    servers: []
                },
                '/path/c': {
                    get: {
                        tags: ['excluded'],
                        responses: {}
                    }
                },
                '/path/d': {
                    get: {
                        tags: ['included', 'excluded'],
                        responses: {}
                    }
                },
                '/path/emptyTags': {
                    delete: {
                        tags: [],
                        responses: {}
                    }
                },
                '/path/noTags': {
                    head: {
                        responses: {}
                    }
                }
            });
            const second = (0, oas_generation_1.toOAS)({
                '/path/b': {
                    get: {
                        responses: {}
                    }
                }
            });
            const output = (0, oas_generation_1.toOAS)({
                '/path/a': {
                    get: {
                        tags: ['included'],
                        responses: {}
                    }
                },
                '/path/b': {
                    get: {
                        responses: {}
                    }
                }
            });
            (0, test_utils_1.expectMergeResult)((0, __1.merge)([{ oas: first, operationSelection: { includeTags: ['included'], excludeTags: ['excluded'] } }, { oas: second }]), {
                output
            });
        });
        it('should filter top level tags definitions', () => {
            const first = (0, oas_generation_1.toOAS)({
                '/path/a': {
                    get: {
                        tags: ['included'],
                        responses: {}
                    }
                },
                '/path/b': {
                    servers: []
                },
                '/path/c': {
                    get: {
                        tags: ['excluded'],
                        responses: {}
                    }
                },
                '/path/d': {
                    get: {
                        tags: ['included', 'excluded'],
                        responses: {}
                    }
                }
            });
            first.tags = [{
                    name: 'included',
                    description: 'This tag is included'
                }, {
                    name: 'excluded',
                    description: 'This tag is excluded'
                }, {
                    name: 'unused',
                    description: 'This tag is not used'
                }];
            const second = (0, oas_generation_1.toOAS)({
                '/path/b': {
                    get: {
                        responses: {}
                    }
                }
            });
            const output = (0, oas_generation_1.toOAS)({
                '/path/a': {
                    get: {
                        tags: ['included'],
                        responses: {}
                    }
                },
                '/path/b': {
                    get: {
                        responses: {}
                    }
                }
            });
            output.tags = [{
                    name: 'included',
                    description: 'This tag is included'
                }, {
                    name: 'unused',
                    description: 'This tag is not used'
                }];
            (0, test_utils_1.expectMergeResult)((0, __1.merge)([{ oas: first, operationSelection: { excludeTags: ['excluded'] } }, { oas: second }]), {
                output
            });
        });
    });
});
