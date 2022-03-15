import { createStore } from "vuex";

import type { Gallery } from "@/entities/gallery";
import type { FormContact } from "@/entities/formContact";
import type { SwiperSlider } from "@/entities/swiperSlider";
import type { ComponentForm } from "@/entities/componentForm";

import ListGallery from "@/data/gallery";
import ListFormContact from "@/data/formContact";
import ListSwiperSlider from "@/data/swiperSlider";
import ListComponentForm from "@/data/componentForm";

const store = createStore({
  state() {
    return {
      galleryListItems: ListGallery as Array<Gallery>,
      formContactList: ListFormContact as Array<FormContact>,
      swiperSliderListItems: ListSwiperSlider as Array<SwiperSlider>,
      componentFormListItems: ListComponentForm as Array<ComponentForm>,
      galleryOptions: {
        columns: 4,
        rowGap: 50,
        columnGap: 50,
      },
      swiperSliderOptions: {
        itemsPerPage: 3,
        pagination: true,
        navigation: true,
      },
    };
  },
  getters: {
    getGalleryListItems(state : any) {
      return state.galleryListItems;
    },
    getGalleryOptions(state: any) {
      return state.galleryOptions;
    },
    getFormContactList(state: any) {
      return state.formContactList;
    },
    getSwiperSliderList(state: any) {
      return state.swiperSliderListItems;
    },
    getSwiperSliderOptions(state: any) {
      return state.swiperSliderOptions;
    },
    getComponentFormListItems(state: any) {
      return state.componentFormListItems;
    },
  },
  mutations: {
    changeGalleryItemContent(state: any, data: any) {
      state.galleryListItems[data.index].title = data.gallery.title;
      state.galleryListItems[data.index].thumbnail = data.gallery.thumbnail;
      state.galleryListItems[data.index].src = data.gallery.src;
      const indexChange = state.galleryListItems[data.index].index;
      state.galleryListItems.forEach((item: any, i: number) => {
        if (i + 1 === data.itemIndex) {
          item.index = indexChange;
        } else if (i == data.index) {
          item.index = data.itemIndex;
        }
      });
    },
    addGalleryItem(state: any, item: any) {
      state.galleryListItems.push(item as Gallery);
    },
    deleteGalleryItem(state: any, index: number) {
      state.galleryListItems.splice(index, 1);
    },
    addFormContactItem(state: any, item: any) {
      state.formContactList.push(item);
    },
    deleteFormContactItem(state: any, index: number) {
      state.formContactList.splice(index, 1);
    },
    changeFormContactItemContent(state: any, data: any) {
      state.formContactList[data.index] = data.formEdit;
      state.formContactList[data.index].width = data.width;
    },
    selecOptionFormContact(state: any, data: any) {
      console.log(data);
      if (!state.formContactList[data.index].listSelected) {
        state.formContactList[data.index].listSelected = [];
        state.formContactList[data.index].listSelected.push(data.value);
      } else {
        let i = -1;
        state.formContactList[data.index].listSelected.forEach(
          (item: any, position: number) => {
            if (item === data.value) {
              i = position;
            }
          }
        );
        if (i !== -1) {
          state.formContactList[data.index].listSelected.splice(i, 1);
        } else {
          state.formContactList[data.index].listSelected.push(data.value);
        }
      }
    },
    addNewSwiperSlider(state: any, item: SwiperSlider) {
      state.swiperSliderListItems.push(item);
    },
    deleteSwiperSlider(state: any, index: number) {
      state.swiperSliderListItems.splice(index, 1);
    },
    changeSwiperSliderItemContent(state: any, data: any) {
      state.swiperSliderListItems[data.index].title = data.item.title;
      state.swiperSliderListItems[data.index].content = data.item.content;
      state.swiperSliderListItems[data.index].img = data.item.img;
    },
    setGalleryOptions(state: any, data: any) {
      state.galleryOptions.columns = data.columns;
      state.galleryOptions.rowGap = data.rowGap;
      state.galleryOptions.columnGap = data.columnGap;
    },
    setSwiperSliderOptions(state: any, data: any) {
      state.swiperSliderOptions.itemsPerPage = data.itemsPerPage;
      state.swiperSliderOptions.pagination = data.pagination;
      state.swiperSliderOptions.navigation = data.navigation;
    },
    addComponentFormItem(state: any, item: any) {
      state.componentFormListItems.push(item);
    },
  },
});

export default store;
