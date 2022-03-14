import { createStore } from "vuex";
import type { Gallery } from "@/entities/gallery";
import ListGallery from "@/data/gallery";

const store = createStore({
  state() {
    return {
      galleryListItems: ListGallery as Array<Gallery>,
      gallery: {} as Gallery,
    };
  },
  getters: {
    galleryListItems(state : any) {
      return state.galleryListItems;
    },
    getGalleryItem(state: any, index: number) {
      return state.galleryListItems[index];
    },
    getGallery(state: any) {
      return state.gallery;
    }
  },
  mutations: {
    setGallery(state: any,gallery: Gallery) {
      state.gallery = gallery;
    },
    changeGalleryIndex(state: any, index: number, itemIndex: number, gallery: Gallery) {
      state.galleryListItems[index].title = gallery.title;
      state.galleryListItems[index].thumbnail = gallery.thumbnail;
      state.galleryListItems[index].src = gallery.src;
      let indexChange = state.galleryListItems[index].index;
      state.galleryListItems.forEach((item :any, i : number) => {
        if (i + 1 === itemIndex) {
          item.index = indexChange;
        } else if (i == index) {
          item.index = this.itemIndex;
        }
      });
    }
  }
});

export default store;
