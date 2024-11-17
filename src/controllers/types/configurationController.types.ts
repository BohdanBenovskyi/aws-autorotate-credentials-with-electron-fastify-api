export type Configuration = {
  id: string;
  mapping: Mapping[];
};

export type Mapping = {
  originKeyName: string;
  mappedKeyName: string;
  aliases: string[];
};
