import type { Button } from "../entities/button";
import type { FormContact } from "../entities/formContact";
import type { Gallery } from "../entities/gallery";
import type { Heading } from "../entities/heading";
import type { Image } from "../entities/image";
import type { GalleryImage } from "../entities/galleryImage";
import type { SwiperSlider } from "../entities/swiperSlider";
import type { Text } from "../entities/text";
import type { FormItem } from "../entities/formItem";

export default [
  {
    buttons: [] as Array<Button>,
    listFormContact: [] as Array<FormContact>,
    listGallery: [] as Array<Gallery>,
    headings: [] as Array<Heading>,
    images: [] as Array<Image>,
    listGalleryImage: [] as Array<GalleryImage>,
    listSwiperSlider: [] as Array<SwiperSlider>,
    texts: [] as Array<Text>,
    inputTexts: [] as Array<FormItem>,
    inputEmails: [] as Array<FormItem>,
    inputDatetimes: [] as Array<FormItem>,
    selects: [] as Array<FormItem>,
    checkboxes: [] as Array<FormItem>,
    radioes: [] as Array<FormItem>,
    longTexts: [] as Array<FormItem>,
    inputUploads: [] as Array<FormItem>,
    type: "Section",
    index: 0,
  }
]

