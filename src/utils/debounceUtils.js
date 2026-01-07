export const debounce = (callbackFunction, delay) => {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => callbackFunction(...args), delay);
  };
};
