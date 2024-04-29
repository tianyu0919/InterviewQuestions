"use strict";
/*
 * @Author: 卢天宇
 * @Date: 2024-04-29 21:11:38
 * @Description: 递归题，
 */
const arr = [5, [[4, 3], 2, 1]];
function isArray(param) {
    return typeof param === "object" && Array.isArray(param);
}
var types;
(function (types) {
    types["ADD"] = "add";
    types["SUB"] = "sub";
    types["MULTIPLY"] = "multiply";
    types["DIVISION"] = "division";
})(types || (types = {}));
function curry(type = types.ADD) {
    return function deep(arr) {
        if (!isArray(arr)) {
            return (arr || 0);
        }
        if (isArray(arr)) {
            const result = arr.reduce((pre, curr) => {
                switch (type) {
                    case types.ADD:
                        return deep(pre) + deep(curr);
                    case types.SUB:
                        return deep(pre) - deep(curr);
                    case types.MULTIPLY:
                        return deep(pre) * deep(curr);
                    case types.DIVISION:
                        return deep(pre) / deep(curr);
                    default:
                        return deep(pre) + deep(curr);
                }
            });
            return result;
        }
        return 0;
    };
}
const deep = curry(types.SUB);
console.log(deep(arr));
