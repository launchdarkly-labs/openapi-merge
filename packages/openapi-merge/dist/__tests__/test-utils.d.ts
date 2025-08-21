import { MergeResult, MergeInput } from "..";
import { ErrorType } from "../data";
import { Swagger } from "atlassian-openapi";
export declare function expectErrorType(result: MergeResult, type: ErrorType): void;
export declare function expectMergeResult(actual: MergeResult, expected: MergeResult): void;
export declare function toMergeInputs(oass: Swagger.SwaggerV3[]): MergeInput;
//# sourceMappingURL=test-utils.d.ts.map