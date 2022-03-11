import { createStore } from "vuex";
import ListGallery from "@/data/gallery";

const store = createStore({
  state() {
    return {
      galleryItems: ListGallery,
    };
  },
  getters: {
    galleryItems(state : any) {
      return state.galleryItems;
    },
  },
  mutations: {
  },
});

export default store;
