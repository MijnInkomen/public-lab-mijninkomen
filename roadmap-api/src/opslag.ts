import fsPromises from "node:fs/promises";

export type epicType = featureType & {
  features: featureType[],
};
export type featureType = {
  title: string,
  description: string,
  labels: string[],
  status: string,
  isOpen: boolean,
};

export type publiekeCardType = {
  title: string,
  heading: string,
  description: string,
  gebruikers: string[],
  status: string,
};

export type jsonOpslageType = {
  publiek: {
    huidig: publiekeCardType[],
    toekomstig: publiekeCardType[],
  },
  community: {
    roadmap: epicType[],
  },
};

// TODO: VERANDER TIJDELIJKE OPSLAGMETHODE NAAR EEN DATABASE
const OPSLAG_PAD = "./opslag/storage.json";
export async function slaOp(data: jsonOpslageType) {
  const jsonString = JSON.stringify(data);
  await fsPromises.writeFile(OPSLAG_PAD, jsonString, { encoding: "utf-8" });
}

export async function leesOpslag() {
  const jsonString = await fsPromises.readFile(OPSLAG_PAD, { encoding: 'utf8' });
  return JSON.parse(jsonString) as jsonOpslageType;
}