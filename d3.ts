import { getInput, sum } from "./common";

const input = await getInput(3);

const lines = input.split("\n");
let id = 1;
const map: Record<number, number> = {};
const parseLine = (line: string) => {
  let mappedLine: number[] = [];
  let number = "";
  for (const char of line) {
    const asNumber = parseInt(char);
    if (Number.isNaN(asNumber)) {
      if (number !== "") {
        map[id] = parseInt(number);
        id++;
        number = "";
      }

      if (char === ".") {
        mappedLine.push(-2);
      } else if (char === "*") {
        mappedLine.push(-1);
      } else {
        mappedLine.push(0);
      }
      continue;
    }

    number += char;
    mappedLine.push(id);
  }
  if (number !== "") {
    map[id] = parseInt(number);
    id++;
  }
  return mappedLine;
};

const mapped = lines.map(parseLine);

function getAllIndexes<T>(arr: Array<T>, val: T) {
  const indexes = [];
  for (let i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);
  return indexes;
}

const getAdjacentValues = (lineIdx: number, rowIdx: number) => {
  return [
    mapped[lineIdx - 1][rowIdx - 1],
    mapped[lineIdx - 1][rowIdx],
    mapped[lineIdx - 1][rowIdx + 1],
    mapped[lineIdx][rowIdx - 1],
    mapped[lineIdx][rowIdx + 1],
    mapped[lineIdx + 1][rowIdx - 1],
    mapped[lineIdx + 1][rowIdx],
    mapped[lineIdx + 1][rowIdx + 1],
  ];
};

async function day1() {
  const ids = new Set<number>();
  mapped.forEach((line, idx) => {
    const symbolIndexes = new Set([
      ...getAllIndexes(line, 0),
      ...getAllIndexes(line, -1),
    ]);
    for (const index of symbolIndexes) {
      getAdjacentValues(idx, index).forEach((id) => ids.add(id));
    }
  });

  ids.delete(-2);
  ids.delete(-1);
  ids.delete(0);

  const numbers: number[] = [];
  ids.forEach((id) => numbers.push(map[id]));

  return sum(numbers);
}

async function day2() {
  const ratios: number[] = [];
  mapped.forEach((line, idx) => {
    const gearIndexes = getAllIndexes(line, -1);
    for (const index of gearIndexes) {
      const indexes = new Set(getAdjacentValues(idx, index));
      indexes.delete(-2);
      indexes.delete(-1);
      indexes.delete(0);
      if (indexes.size !== 2) {
        continue;
      }
      const multipliers = [...indexes].map((id) => map[id]);
      ratios.push(multipliers[0] * multipliers[1]);
    }
  });

  return sum(ratios);
}

console.log(await day1());
console.log(await day2());

export default {};
