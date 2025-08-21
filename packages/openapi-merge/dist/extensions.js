"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeExtensions = mergeExtensions;
function extractExtensions(input) {
    const result = {};
    const plainObject = input;
    for (const key in plainObject) {
        /* eslint-disable-next-line no-prototype-builtins */
        if (key.startsWith('x-') && plainObject.hasOwnProperty(key)) {
            result[key] = plainObject[key];
        }
    }
    return result;
}
function mergeExtensionsHelper(extensions) {
    if (extensions.length === 0) {
        return {};
    }
    if (extensions.length === 1) {
        return extensions[0];
    }
    const result = { ...extensions[0] };
    for (let extensionIndex = 1; extensionIndex < extensions.length; extensionIndex++) {
        const ext = extensions[extensionIndex];
        for (const extensionKey in ext) {
            /* eslint-disable-next-line no-prototype-builtins */
            if (result[extensionKey] === undefined && ext.hasOwnProperty(extensionKey)) {
                result[extensionKey] = ext[extensionKey];
            }
        }
    }
    return result;
}
function mergeExtensions(mergeTarget, oass) {
    return {
        ...mergeTarget,
        ...mergeExtensionsHelper([extractExtensions(mergeTarget), ...oass.map(extractExtensions)])
    };
}
