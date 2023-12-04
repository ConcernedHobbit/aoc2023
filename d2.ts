import { getInput, sum } from "./common";

const input = await getInput(2);

type Color = "red" | "green" | "blue";
interface Structure {
  parts: Array<Array<{ amount: number; color: Color }>>;
  gameId: number;
}

const isColor = (str: unknown): str is Color => {
  if (str === undefined || str === null) return false;
  return ["red", "green", "blue"].includes(str.toString());
};

function getParts(line: string) {
  const raw = line.split(";").map((str) => str.trim());
  const gameId = parseInt(raw[0].split(":")[0].substring(5));
  raw[0] = raw[0].split(": ")[1];
  const parts = raw.map((part) => {
    return part.split(", ").map((str) => {
      const [num, color] = str.split(" ");
      if (!isColor(color)) throw new Error(`unknown color ${color}`);
      return { amount: parseInt(num), color };
    });
  });
  return { parts, gameId } satisfies Structure;
}

type Amounts = Partial<Record<Color, number>>;
function validate(parts: Structure["parts"], amounts: Amounts) {
  for (const part of parts) {
    for (const rule of part) {
      const maxAmount = amounts[rule.color];
      if (maxAmount === undefined)
        throw new Error(
          `Amounts does not define limit for ${rule.color} that is in part`
        );

      if (rule.amount > maxAmount) {
        return false;
      }
    }
  }

  return true;
}

const amounts = {
  red: 12,
  green: 13,
  blue: 14,
};
const games = input.split("\n");

async function part1() {
  let validIds: number[] = [];
  for (const game of games) {
    const { parts, gameId } = await getParts(game);
    if (validate(parts, amounts)) {
      validIds.push(gameId);
    }
  }
  return sum(validIds);
}

function getFewest(parts: Structure["parts"]) {
  const fewestAmounts = {
    red: 0,
    blue: 0,
    green: 0,
  };

  for (const part of parts) {
    for (const rule of part) {
      if (rule.amount > fewestAmounts[rule.color]) {
        fewestAmounts[rule.color] = rule.amount;
      }
    }
  }

  return fewestAmounts;
}

const getPower = (fewestAmounts: Record<Color, number>) =>
  fewestAmounts.blue * fewestAmounts.red * fewestAmounts.green;
async function part2() {
  return sum(
    games
      .map(getParts)
      .map((parts) => getFewest(parts.parts))
      .map(getPower)
  );
}

console.log(await part1());
console.log(await part2());

export default {};
