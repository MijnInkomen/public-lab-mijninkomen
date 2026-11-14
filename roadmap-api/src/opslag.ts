export type epicType = featureType & {
  features: featureType[],
};
export type featureType = {
  title: string,
  description: string,
  labels: string[],
  status: string,
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
    toekomstig: publiekeCardType,
  },
  community: {
    roadmap: epicType[],
  },
};

export function slaOp(data: any) {
  console.log(data)
}
