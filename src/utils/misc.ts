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
