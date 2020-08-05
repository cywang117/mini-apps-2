/**
 * Debounce: delays function execution until input ms have passed
 * @param {Function} func
 * @param {Number} wait
 * @returns {Function}
 */
export const debounce = <F extends (...args: any) => any>(func: F, wait: number) => {
  let timeout: number = 0;

  const debouncedFn = (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };

  return debouncedFn as (...args: Parameters<F>) => ReturnType<F>;
};
