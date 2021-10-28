export interface RawOutdoorPractice {
  id: string;
  sector: number;
  name: string;
}

export interface OutdoorPractice {
  id: string;
  name: string;
  pictogram: string;
}

export interface OutdoorPracticeChoices {
  [value: string]: OutdoorPractice;
}
