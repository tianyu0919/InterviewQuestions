/*
 * @Author: 卢天宇
 * @Date: 2024-04-29 21:11:38
 * @Description: 递归题，
 */
const arr = [5, [[4, 3], 2, 1]];

function isArray(param: any) {
  return typeof param === "object" && Array.isArray(param);
}

enum types {
  ADD = "add",
  SUB = "sub",
  MULTIPLY = "multiply",
  DIVISION = "division",
}

type Arr = number | (number | number[])[];

function curry(type: types = types.ADD) {
  return function deep(arr: Arr): number {
    if (!isArray(arr)) {
      return (arr || 0) as number;
    }
    if (isArray(arr)) {
      const result = arr.reduce((pre: Arr, curr: Arr) => {
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
      }) as number;
      return result;
    }
    return 0;
  };
}

const deep = curry(types.SUB);

console.log(deep(arr as Arr));
