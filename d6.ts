import { getInput, parseNumbers } from "./common";

const input = await getInput(6);
const [rawTimes, rawDistances] = input.split("\n");

const times = parseNumbers(rawTimes);
const distances = parseNumbers(rawDistances);
if (times.length !== distances.length)
  throw new Error(`malformed input, times and distances length mismatch`);

const calculateDistance = (totalTime: number, timeHeld: number) =>
  (totalTime - timeHeld) * timeHeld;

const races = times.length;
const allWaysToBeat: number[] = [];
for (let i = 0; i < races; i++) {
  let waysToBeat = 0;
  for (let j = times[i]; j >= 0; j--) {
    const dist = calculateDistance(times[i], j);
    if (dist > distances[i]) waysToBeat++;
  }
  allWaysToBeat.push(waysToBeat);
}
console.log(
  "Part 1",
  allWaysToBeat.reduce((a, b) => a * b, 1)
);

const mushedTogetherTime = parseInt(times.join(""));
const mushedTogetherDistance = parseInt(distances.join(""));
let waysToBeatLong = 0;

for (let n = 0; n < mushedTogetherTime; n++) {
  const distance = calculateDistance(mushedTogetherTime, n);
  if (distance >= mushedTogetherDistance) waysToBeatLong++;
}

console.log("Part 2", waysToBeatLong);
