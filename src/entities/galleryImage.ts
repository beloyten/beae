export interface GalleryImage {
  liquidData: {
    src: string;
    title: string;
    thumbnail: string;
    index?: number;
  };
  index?: number;
  type: string;
}
