export const debounce = (fn, interval) => {
  let timer;
  let gapTime = interval || 1500; // 间隔时间，如果interval不传，则默认1000ms
  return function() {
    clearTimeout(timer);
    let context = this;
    let args = arguments; // 保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
    timer = setTimeout(function() {
      fn.call(context, args);
    }, gapTime);
  };

};