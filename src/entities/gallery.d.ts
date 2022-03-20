import { GalleryImage } from "./galleryImage";

export interface Gallery {
  items: Array<GalleryImage>;
  liquidData: {
    columns: number;
    rowGap: number;
    columnGap: number;
  };
  type: string;
  index: number;
}
