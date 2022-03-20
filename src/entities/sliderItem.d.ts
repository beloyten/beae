import { Image } from "./image";
import { Heading } from "./heading";
import { Text } from "./text";

export interface SliderItem {
  items: Array<Image | Heading | Text>;
  type: string;
  index: number;
}