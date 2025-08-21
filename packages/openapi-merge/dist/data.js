"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isErrorResult = isErrorResult;
function isErrorResult(t) {
    return 'type' in t && 'message' in t;
}
