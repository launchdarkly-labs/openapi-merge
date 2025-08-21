"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDispute = getDispute;
exports.applyDispute = applyDispute;
function getDispute(input) {
    if ('disputePrefix' in input) {
        if (input.disputePrefix !== undefined) {
            return {
                prefix: input.disputePrefix
            };
        }
        return undefined;
    }
    else if ('dispute' in input) {
        return input.dispute;
    }
    return undefined;
}
function isDisputePrefix(dispute) {
    return 'prefix' in dispute;
}
function applyDispute(dispute, input, status) {
    if (dispute === undefined) {
        return input;
    }
    if (status === 'disputed' || dispute.alwaysApply) {
        return isDisputePrefix(dispute) ? `${dispute.prefix}${input}` : `${input}${dispute.suffix}`;
    }
    return input;
}
