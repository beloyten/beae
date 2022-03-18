import { Field } from "./field";

export interface SwiperSlider {
  children?: Array<Field>;
  options: {
    img: string;
    title: string;
    content: string;
  };
  type: string;
  index: number;
}
