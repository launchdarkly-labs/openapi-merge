"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toOAS = toOAS;
function toOAS(paths, components) {
    return {
        openapi: '3.0.3',
        info: {
            title: 'Generated Swagger Template',
            version: '1.2.3'
        },
        paths,
        components
    };
}
