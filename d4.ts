import { getInput, parseNumbers, sum } from "./common";

const input = await getInput(4);
const lines = input.split("\n");

interface Card {
  id: number;
  winningNumbers: number[];
  numbers: number[];
  matchingNumbers: number;
}

function extractCard(line: string) {
  const [start, rawNumbers] = line.split(" | ");
  const numbers = parseNumbers(rawNumbers);

  const [rawCardNumber, rawWinningNumbers] = start.split(":");
  const winningNumbers = parseNumbers(rawWinningNumbers);
  const id = parseInt(rawCardNumber.substring(5).trim());

  const numberSet = new Set(numbers);
  const intersecting = new Set(winningNumbers.filter((i) => numberSet.has(i)));

  return {
    id,
    winningNumbers,
    numbers,
    matchingNumbers: intersecting.size,
  } satisfies Card;
}

const cards = lines.map(extractCard);

async function day1() {
  return sum(
    cards.map(({ matchingNumbers }) =>
      matchingNumbers === 0 ? 0 : Math.pow(2, matchingNumbers - 1)
    )
  );
}

async function day2() {
  const amounts = cards.map(({ matchingNumbers }) => ({
    matchingNumbers,
    amount: 1,
  }));

  for (let i = 0; i < amounts.length; i++) {
    let duplicates = amounts[i].matchingNumbers;
    for (let j = i + 1; j < duplicates + i + 1; j++) {
      amounts[j].amount += amounts[i].amount;
    }
  }

  return sum(amounts.map(({ amount }) => amount));
}

console.log(await day1());
console.log(await day2());

export default {};
