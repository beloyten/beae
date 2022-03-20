import { Button } from "./button";
import { FormContact } from "./formContact";
import { Gallery } from "./gallery";
import { Heading } from "./heading";
import { Image } from "./image";
import { GalleryImage } from "./galleryImage";
import { SwiperSlider } from "./swiperSlider";
import { Text } from "./text";
import { FormItem } from "./formItem";

export interface Section {
  buttons: Array<Button>;
  listFormContact: Array<FormContact>;
  listGallery: Array<Gallery>;
  headings: Array<Heading>;
  listGalleryImage: Array<GalleryImage>;
  images: Array<Image>;
  listSwiperSlider: Array<SwiperSlider>;
  texts: Array<Text>;
  inputTexts: Array<FormItem>;
  inputEmails: Array<FormItem>;
  inputDatetimes: Array<FormItem>;
  selects: Array<FormItem>;
  checkboxes: Array<FormItem>;
  radioes: Array<FormItem>;
  longTexts: Array<FormItem>;
  inputUploads: Array<FormItem>;
  type: string;
  index: number;
}
