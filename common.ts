/**
 * Reads d<n>.txt for input or defers to cli input
 */
export const getInput = async (day: number) => {
  const file = Bun.file(`d${day.toString()}.txt`);
  const cli = process.argv[2];
  return cli ?? (await file.text());
};
/**
 * Returns the sum of an array of numbers
 */
export const sum = (numbers: number[]) => numbers.reduce((a, b) => a + b, 0);
/**
 * Extracts valid numbers from a space-limited string
 */
export const parseNumbers = (str: string, delimiter = " ") =>
  str
    .split(delimiter)
    .map((str) => parseInt(str))
    .filter((num) => !Number.isNaN(num));
