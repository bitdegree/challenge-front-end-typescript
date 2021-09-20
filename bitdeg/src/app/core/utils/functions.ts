/**
 * Multiply a random number by the decimal equivalent #fff and then
 * convert to a hexadecimal number which can then be used for colors
 */
const generateRandomColor = (): string =>
  Math.floor(Math.random() * 16777215).toString(16);

const hashDetail = (arg: string): string => btoa(arg);

const unHashDetail = (arg: string): string => atob(arg);

const hyphenIze = (arg: string): string => arg.split(" ").join("-");

const isObjectEmpty = (arg: Object): boolean =>
  !arg || Object.keys(arg).length === 0;

const isNullOrUndefined = <T extends string | number | object>(
  arg: T,
): boolean => arg === null || arg === undefined || arg === "";

export {
  generateRandomColor,
  hashDetail,
  unHashDetail,
  isObjectEmpty,
  hyphenIze,
  isNullOrUndefined,
};
