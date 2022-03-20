import { Field } from "./field";

export interface SwiperSlider {
  items: Array<SliderItem>;
  liquidData: {
    itemsPerPage: number;
    pagination: boolean;
    navigation: boolean;
  };
  type: string;
  index: number;
}
