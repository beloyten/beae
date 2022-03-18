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
      state.galleryListItems[data.index].options.title = data.gallery.title;
      state.galleryListItems[data.index].options.thumbnail =
        data.gallery.thumbnail;
      state.galleryListItems[data.index].options.src = data.gallery.src;
      const indexChange = state.galleryListItems[data.index].index;
      state.galleryListItems.forEach((item: any, i: number) => {
        if (i + 1 === data.itemIndex) {
          item.index = indexChange;
        } else if (i == data.index) {
          item.index = data.itemIndex;
        }
      });
    },
    addGalleryItem(state: any, item: Gallery) {
      state.galleryListItems.push(item);
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
      state.formContactList[data.index].options = data.formEdit;
      state.formContactList[data.index].options.width = data.width;
    },
    selecOptionFormContact(state: any, data: any) {
      console.log(data);
      if (!state.formContactList[data.index].options.listSelected) {
        state.formContactList[data.index].options.listSelected = [];
        state.formContactList[data.index].options.listSelected.push(data.value);
      } else {
        let i = -1;
        state.formContactList[data.index].options.listSelected.forEach(
          (item: any, position: number) => {
            if (item === data.value) {
              i = position;
            }
          }
        );
        if (i !== -1) {
          state.formContactList[data.index].options.listSelected.splice(i, 1);
        } else {
          state.formContactList[data.index].options.listSelected.push(
            data.value
          );
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
      state.swiperSliderListItems[data.index].options.title = data.item.title;
      state.swiperSliderListItems[data.index].options.content =
        data.item.content;
      state.swiperSliderListItems[data.index].options.img = data.item.img;
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
    addComponentFormSection(state: any, item: any) {
      state.componentFormListItems.push(item);
    },
    deleteComponentFormSection(state: any, index: number) {
      state.componentFormListItems.splice(index, 1);
    },
    addComponentFormItem(state: any, item: any) {
      state.componentFormListItems[item.sectionIndex].section.items.push(
        item.data
      );
    },
    deleteComponentFormItem(state: any, item: any) {
      state.componentFormListItems[item.sectionIndex].section.items.splice(
        item.index,
        1
      );
    },
    setComponentFormItemOptions(state: any, data: any) {
      state.componentFormListItems[data.sectionIndex].section.items[
        data.index
      ].options = data.options;
    },
    addListItemComponentForm(state: any, data: any) {
      state.componentFormListItems[data.index].fields.list.push(data.item);
    },
    deleteListItemComponentForm(state: any, data: any) {
      state.componentFormListItems[data.index].fields.list.splice(
        data.itemIndex,
        1
      );
    },
    changeListItemComponentForm(state: any, data: any) {
      if (state.componentFormListItems[data.index].type === "gallery") {
        state.componentFormListItems[data.index].fields.list[
          data.itemIndex
        ].title = data.data.title;
        state.componentFormListItems[data.index].fields.list[
          data.itemIndex
        ].thumbnail = data.data.thumbnail;
        state.componentFormListItems[data.index].fields.list[
          data.itemIndex
        ].src = data.data.src;
        const indexChange =
          state.componentFormListItems[data.index].fields.list[data.itemIndex]
            .index;
        state.componentFormListItems[data.index].fields.list.forEach((item: any, i: number) => {
            if (i + 1 === data.data.index) {
              item.index = indexChange;
            } else if (i == data.itemIndex) {
              item.index = data.data.index;
            }
          }
        );
      } else if (
        state.componentFormListItems[data.index].type === "form-contact"
      ) {
        state.componentFormListItems[data.index].fields.list[data.itemIndex] =
          data.data;
        state.componentFormListItems[data.index].fields.list[
          data.itemIndex
        ].width = data.width;
      } else if (
        state.componentFormListItems[data.index].type === "swiper-slider"
      ) {
        state.componentFormListItems[data.index].fields.list[data.itemIndex] =
          data.data;
      }
    },
    selecOptionFormContactComponentForm(state: any, data: any) {
      console.log(data);
      if (
        !state.componentFormListItems[data.index].fields.list[data.itemIndex]
          .listSelected
      ) {
        state.componentFormListItems[data.index].fields.list[
          data.itemIndex
        ].listSelected = [];
        state.componentFormListItems[data.index].fields.list[
          data.itemIndex
        ].listSelected.push(data.value);
      } else {
        let i = -1;
        state.componentFormListItems[data.index].fields.list[
          data.itemIndex
        ].listSelected.forEach((item: any, position: number) => {
          if (item === data.value) {
            i = position;
          }
        });
        if (i !== -1) {
          state.omponentFormListItems[data.index].fields.list[
            data.itemIndex
          ].listSelected.splice(i, 1);
        } else {
          state.componentFormListItems[data.index].fields.list[
            data.itemIndex
          ].listSelected.push(data.value);
        }
      }
    },
  },
});

export default store;
