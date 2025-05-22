window.onload = () => {
  // * 当前正在执行的effect，共享作用域，存在RefImp中
  let activeEffect = null;

  class RefImp {
    _value = null;
    _set = new Set();
    constructor(value) {
      this._value = value;
    }

    get value() {
      // * 如果当前有正在执行的effect，则将当前的effect添加到set中
      if (activeEffect) {
        this._set.add(activeEffect);
      }
      return this._value;
    }

    set value(value) {
      this._value = value;
      // * 执行set中的所有effect
      this._set.forEach((fn) => fn());
    }
  }

  function Ref(value) {
    return new RefImp(value);
  }

  const ref = Ref(0);

  function effect(fn) {
    activeEffect = fn;
    fn();
    activeEffect = null;
  }

  effect(() => {
    document.body.innerHTML = ref.value;
  });

  setTimeout(() => {
    ref.value = 1;
  }, 1000);
};
