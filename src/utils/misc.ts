export const calcAverage = (data: number[]) => {
  return data.reduce((sum, num) => {
    sum = sum + num;
    return sum;
  }, 0) / data.length;
}