function createOverload() {
  const map = new Map();

  function overload(...args) {
    const type = args.map((item) => typeof item).join(",");
    if (type && map.get(type)) {
      return map.get(type).apply(this, args);
    }
    throw new Error("not search function");
  }

  /**
   * 添加重载的方法
   * @param  {...any} args 
   */
  overload.addImpl = function (...args) {
    const fn = args.pop();
    map.set(args.join(","), fn);
  };

  return overload;
}

export default createOverload;
