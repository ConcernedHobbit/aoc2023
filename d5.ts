import { getInput, parseNumbers } from "./common";

const input = await getInput(5);
const [rawSeeds, ...rawMaps] = input.split("\n\n");

const seeds = parseNumbers(rawSeeds);

type Map = {
  dest: string;
  source: string;
  mappings: Mapping[];
};
type Mapping = {
  destStart: number;
  sourceStart: number;
  len: number;
};

const parseMap = (map: string) => {
  const [header, ...data] = map.split("\n");
  const [source, dest] = header.split(" ")[0].split("-to-");
  const mappings = data.map((line) => {
    const [destStart, sourceStart, len] = parseNumbers(line);
    return { destStart, sourceStart, len } satisfies Mapping;
  });

  return {
    dest,
    source,
    mappings,
  } satisfies Map;
};
const inMapping = (source: number, mapping: Mapping) => {
  const mapEnd = mapping.sourceStart + mapping.len;
  return source >= mapping.sourceStart && source <= mapEnd;
};
const getMapping = (source: number, mappings: Array<Mapping>) => {
  for (const mapping of mappings) {
    if (!inMapping(source, mapping)) continue;
    const delta = source - mapping.sourceStart;
    return mapping.destStart + delta;
  }

  return source;
};
const mappings = rawMaps.map(parseMap);
const fetchMapping = (wantedSource: string): Map | null => {
  const mapping = mappings.filter(({ source }) => source === wantedSource);
  if (mapping.length > 1)
    throw new Error(`multiple mappings found for filter ${wantedSource}`);

  if (mapping.length === 0) return null;

  return mapping[0];
};

const iterate = (initial: number) => {
  let mapping = "seed";
  let dest = initial;

  while (true) {
    const map = fetchMapping(mapping);
    if (!map) {
      break;
    }

    mapping = map.dest;
    dest = getMapping(dest, map.mappings);
  }

  return dest;
};

console.log(Math.min(...seeds.map(iterate)));
