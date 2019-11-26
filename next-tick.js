export let isUsingMicroTask = false; //是否使用微任务

const callbacks = []; //传入$nextTick的回调集合
let pending = false; //是否正在执行当前回调标示

function flushCallbacks() {
  pending = false;
  const copies = callbacks.slice(0); //拷贝一份的原因是解决在$nextTick中的回调中再次执行$nextTick，然后清空上次callbacks，将本次回调push进来
  callbacks.length = 0;
  for (let i = 0; i < copies.length; i++) {
    copies[i]();
  }
}
let timerFunc; //包含异步处理的临时函数
if (typeof Promise !== "undefined") {
  //当前环境是否支持Promise
  const p = Promise.resolve();
  timerFunc = () => {
    p.then(flushCallbacks);
  };
  isUsingMicroTask = true;
} else if (
  //当前环境是否支持 MutationObserver 对象，MutationObserver对象也是微任务，在一次task最后执行
  typeof MutationObserver !== "undefined" &&
  MutationObserver.toString() === "[object MutationObserverConstructor]"
) {
  let counter = 1;
  const observer = new MutationObserver(flushCallbacks);
  const textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = () => {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
  isUsingMicroTask = true;
} else {
  timerFunc = () => {
    setTimeout(flushCallbacks, 0);
  };
}
/**
 * this.$nextTick(cb1);
 * this.$nextTick(cb2);
 * this.$nextTick(cb3);
 */
export function nextTick(cb, ctx) {
  const callback = () => {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        throw e;
      }
    }
  };
  //回调集合
  callbacks.push(callback);
  //执行本次nextTick回调，padding设置为在执行中。。。
  if (!pending) {
    pending = true;
    timerFunc();
  }
}
