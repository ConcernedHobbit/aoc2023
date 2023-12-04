import { getInput, parseNumbers, sum } from "./common";

const input = await getInput(1);

const charMap: Record<string, number> = {
  oneight: 18,
  twone: 21,
  sevenine: 79,
  eightwo: 82,
  eightree: 83,
  nineight: 98,

  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const findLowestOccurrence = (line: string) => {
  let lowest = Infinity;
  let foundKey = "";
  for (const key in charMap) {
    const index = line.indexOf(key);
    if (index !== -1 && index < lowest) {
      lowest = index;
      foundKey = key;
    }
  }
  if (lowest === Infinity) return null;
  return foundKey;
};

const replaceWordsWithDigits = (line: string) => {
  while (true) {
    const key = findLowestOccurrence(line);
    if (!key) break;
    line = line.replace(key, charMap[key].toString());
  }
  return line;
};

async function part1() {
  const n = input.split("\n").map((line) => {
    const nums = parseNumbers(line, "");
    if (nums.length === 0) return 0;
    return parseInt(`${nums[0]}${nums[nums.length - 1]}`);
  });
  return sum(n);
}

async function part2() {
  const n = input.split("\n").map((line) => {
    const numerizedLine = replaceWordsWithDigits(line);
    const nums = numerizedLine
      .split("")
      .map((char) => parseInt(char))
      .filter((n) => !isNaN(n));
    if (nums.length === 0) return 0;
    return parseInt(`${nums[0]}${nums[nums.length - 1]}`);
  });
  return sum(n);
}

console.log(await part1());
console.log(await part2());

export default {};
