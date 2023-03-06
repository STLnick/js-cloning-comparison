export const calcAverage = (data: number[]) => {
  return (
    data.reduce((sum, num) => {
      sum = sum + num;
      return sum;
    }, 0) / data.length
  );
};

const shouldAddComma = (index: number, length: number): boolean => {
  return index + 1 !== length && (index + 1) % 3 === 0;
};

export const formatNumber = (num: number): string => {
  const numStringArr: string[] = String(num).split("").reverse();
  const dotIndex: number = numStringArr.findIndex((c) => c === ".");
  const decimal: string =
    dotIndex !== -1
      ? `.${numStringArr.slice(0, dotIndex).reverse().join("")}`
      : "";
  const valueToFormat: string[] =
    dotIndex !== -1 ? numStringArr.slice(dotIndex + 1) : [...numStringArr];
  const formatted: string[] = [];

  valueToFormat.forEach((num, i) => {
    formatted.push(num);
    if (shouldAddComma(i, valueToFormat.length)) {
      formatted.push(",");
    }
  });

  return `${formatted.reverse().join("")}${decimal}`;
};

const colorMap = {
  0: (dark: boolean) => `rgba(255, 0, 0, ${dark ? 0.2 : 0.1})`,
  1: (dark: boolean) => `rgba(255, 62, 0, ${dark ? 0.2 : 0.1})`,
  2: (dark: boolean) => `rgba(149, 53, 83, ${dark ? 0.2 : 0.1})`,
};

export const getColor = (i: number, dark = false) => colorMap[i](dark);
