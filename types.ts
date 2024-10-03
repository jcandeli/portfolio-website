type GenericMedia = {
  type: Type;
  id: string;
  title: string;
  orientation?: Orinetation;
};

export type Video = GenericMedia;

export type Photo = GenericMedia & {
  location?: string;
  camera?: string;
};

export type Orinetation = "vertical" | "horizontal" | "banner" | "block";

export type Type = "photo" | "video" | "music" | "design";

export type Media = Video | Photo;
