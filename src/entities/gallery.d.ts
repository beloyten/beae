import { Field } from "./field";

export interface Gallery {
  children?: Array<Field>;
  options: {
    src: string;
    title: string;
    thumbnail: string;
  };
  type: string;
  index: number;
}
