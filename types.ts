type Music = {
  type: "music";
  id: string;
};

export type Video = {
  type: "video";
  id: string;
  title: string;
};

export type Photo = {
  type: "photo";
  id: string;
  title: string;
  description?: string;
  camera?: string;
  orientation?: Orientation;
  colors?: string[];
  colorProportions?: number[];
};

export type Design = {
  type: "design";
  id: string;
  title: string;
  orientation?: Orientation;
  colors?: string[];
  colorProportions?: number[];
};

export type Orientation = "vertical" | "horizontal" | "banner" | "block";

export type Media = Video | Photo | Music | Design;
