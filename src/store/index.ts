import { createStore } from "vuex";

import type { Gallery } from "@/entities/gallery";
import type { GalleryImage } from "@/entities/galleryImage";
import type { FormContact } from "@/entities/formContact";
import type { FormItem } from "@/entities/formItem";
import type { SwiperSlider } from "@/entities/swiperSlider";
import type { Section } from "@/entities/section";
import type { Button } from "@/entities/button";
import type { Heading } from "@/entities/heading";
import type { Image } from "@/entities/image";
import type { Text } from "@/entities/text";

import ListGallery from "@/data/gallery";
import ListFormContact from "@/data/formContact";
import ListSwiperSlider from "@/data/swiperSlider";
import ListComponentForm from "@/data/componentForm";

const store = createStore({
  state() {
    return {
      galleryListItems: ListGallery as Gallery,
      formContactList: ListFormContact as FormContact,
      swiperSliderListItems: ListSwiperSlider as SwiperSlider,
      componentFormListItems: ListComponentForm as Array<Section>,
    };
  },
  getters: {
    getGalleryListItems(state : any) {
      return state.galleryListItems.items;
    },
    getFormContactItems(state: any) {
      return state.formContactList.items;
    },
    getFormContactButtons(state: any) {
      return state.formContactList.buttons;
    },
    getSwiperSliderList(state: any) {
      return state.swiperSliderListItems.items;
    },
    getGalleryOptions(state: any) {
      return state.galleryListItems.liquidData;
    },
    getSwiperSliderOptions(state: any) {
      return state.swiperSliderListItems.liquidData;
    },
    getComponentFormListItems(state: any) {
      return state.componentFormListItems;
    },
  },
  mutations: {
    changeGalleryItemContent(state: any, data: any) {
      let galleryIndex = -1;
      state.galleryListItems.items.forEach((item : GalleryImage, index: number) => {
        if (item.liquidData.index === data.index) {
          galleryIndex = index;
        }
      })
      if (galleryIndex === -1) {
        alert("Some thing wrong!!!");
      } else {
        const indexChange = state.galleryListItems.items[galleryIndex].liquidData.index;
        state.galleryListItems.items.forEach((item: GalleryImage) => {
          if (item.liquidData.index === data.gallery.index) {
            item.liquidData.index = indexChange;
          }
        });
        state.galleryListItems.items[galleryIndex].liquidData = data.gallery;
      }
    },
    addGalleryItem(state: any, item: Gallery) {
      state.galleryListItems.items.push(item);
    },
    deleteGalleryItem(state: any, index: number) {
      state.galleryListItems.items.forEach((item: GalleryImage, i: number) => {
        if (item.liquidData.index === index) {
          state.galleryListItems.items.splice(i, 1);
        }
      });
      state.galleryListItems.items.forEach((item: GalleryImage) => {
        if (item.liquidData.index && item.liquidData.index > index) {
          item.liquidData.index = item.liquidData.index - 1;
        }
      });
    },
    addFormContactItem(state: any, item: any) {
      state.formContactList.items.push(item);
    },
    deleteFormContactItem(state: any, index: number) {
      state.formContactList.items.forEach((item: FormItem, i: number) => {
        if (item.index === index) {
          state.formContactList.items.splice(i, 1);
        }
      });
      state.formContactList.items.forEach((item: FormItem) => {
        if (item.index > index) {
          item.index = item.index - 1;
        }
      });
      if (state.formContactList.buttons[0].index > index) {
        state.formContactList.buttons[0].index = state.formContactList.buttons[0].index - 1;
      };
    },
    changeFormContactItem(state: any, data: any) {
      if (data.type === "Button") {
        state.formContactList.buttons[data.index].liquidData = data.formEdit;
      } else {
        state.formContactList.items[data.index].liquidData = data.formEdit;
      }
    },
    addNewSwiperSlider(state: any, item: SwiperSlider) {
      state.swiperSliderListItems.items.push(item);
    },
    deleteSwiperSlider(state: any, index: number) {
      state.swiperSliderListItems.items.forEach((item: FormItem, i: number) => {
        if (item.index === index) {
          state.swiperSliderListItems.items.splice(i, 1);
        }
      });
      state.swiperSliderListItems.items.forEach((item: FormItem) => {
        if (item.index > index) {
          item.index = item.index - 1;
        }
      });
    },
    changeSwiperSliderItemContent(state: any, data: any) {
      state.swiperSliderListItems.items[data.index].items[1].liquidData.content = data.title;
      state.swiperSliderListItems.items[data.index].items[2].liquidData.content =
        data.content;
      state.swiperSliderListItems.items[data.index].items[0].liquidData.src = data.img;
    },
    setGalleryOptions(state: any, data: any) {
      state.galleryListItems.liquidData = data;
    },
    setSwiperSliderOptions(state: any, data: any) {
      state.swiperSliderListItems.liquidData = data;
    },
    addComponentFormSection(state: any, item: any) {
      state.componentFormListItems.push(item);
    },
    deleteComponentFormSection(state: any, index: number) {
      state.componentFormListItems.splice(index, 1);
      state.componentFormListItems.forEach((item: Section) => {
        if (item.index > index) {
          item.index = item.index - 1;
        }
      })
    },
    addComponentFormItem(state: any, item: any) {
      if (item.data.type === "Button") {
        state.componentFormListItems[item.index].buttons.push(item.data);
      } else if (item.data.type === "Form Contact") {
        state.componentFormListItems[item.index].listFormContact.push(item.data);
      } else if (item.data.type === "Gallery") {
        state.componentFormListItems[item.index].listGallery.push(item.data);
      } else if (item.data.type === "Heading") {
        state.componentFormListItems[item.index].headings.push(item.data);
      } else if (item.data.type === "Image") {
        state.componentFormListItems[item.index].images.push(item.data);
      } else if (item.data.type === "Gallery Image") {
        state.componentFormListItems[item.index].listGalleryImage.push(item.data);
      } else if (item.data.type === "Swiper Slider") {
        state.componentFormListItems[item.index].listSwiperSlider.push(item.data);
      } else if (item.data.type === "Text") {
        state.componentFormListItems[item.index].texts.push(item.data);
      } else if (item.data.type === "Input Text") {
        state.componentFormListItems[item.index].inputTexts.push(item.data);
      } else if (item.data.type === "Long Text") {
        state.componentFormListItems[item.index].longTexts.push(item.data);
      } else if (item.data.type === "Input Upload") {
        state.componentFormListItems[item.index].inputUploads.push(item.data);
      } else if (item.data.type === "Input Email") {
        state.componentFormListItems[item.index].inputEmails.push(item.data);
      } else if (item.data.type === "Input Datetime") {
        state.componentFormListItems[item.index].inputDatetimes.push(item.data);
      } else if (item.data.type === "Select") {
        state.componentFormListItems[item.index].selects.push(item.data);
      } else if (item.data.type === "Checkbox") {
        state.componentFormListItems[item.index].checkboxes.push(item.data);
      } else if (item.data.type === "Radio") {
        state.componentFormListItems[item.index].radioes.push(item.data);
      }
    },
    deleteComponentFormItem(state: any, data: any) {
      if (data.type === "Button") {
        state.componentFormListItems[data.index].buttons.forEach((button: Button, index: number) => {
          if (button.index === data.itemIndex) {
            state.componentFormListItems[data.index].buttons.splice(index, 1);
          }
        })
      } else if (data.type === "Form Contact") {
        state.componentFormListItems[data.index].listFormContact.forEach((item: FormContact, index: number) => {
          if (item.index === data.itemIndex) {
            state.componentFormListItems[data.index].listFormContact.splice(index, 1);
          }
        })
      } else if (data.type === "Gallery") {
        state.componentFormListItems[data.index].listGallery.forEach((item: Gallery, index: number) => {
          if (item.index === data.itemIndex) {
            state.componentFormListItems[data.index].listGallery.splice(index, 1);
          }
        })
      } else if (data.type === "Heading") {
        state.componentFormListItems[data.index].headings.forEach((item: Heading, index: number) => {
          if (item.index === data.itemIndex) {
            state.componentFormListItems[data.index].headings.splice(index, 1);
          }
        })
      } else if (data.type === "Image") {
        state.componentFormListItems[data.index].images.forEach((item: Image, index: number) => {
          if (item.index === data.itemIndex) {
            state.componentFormListItems[data.index].images.splice(index, 1);
          }
        })
      } else if (data.type === "Gallery Image") {
        state.componentFormListItems[data.index].listGalleryImage.forEach((item: GalleryImage, index: number) => {
          if (item.index && item.index === data.itemIndex) {
            state.componentFormListItems[data.index].listGalleryImage.splice(index, 1);
          }
        })
      } else if (data.type === "Swiper Slider") {
        state.componentFormListItems[data.index].listSwiperSlider.forEach((item: SwiperSlider, index: number) => {
          if (item.index === data.itemIndex) {
            state.componentFormListItems[data.index].listSwiperSlider.splice(index, 1);
          }
        })
      } else if (data.type === "Text") {
        state.componentFormListItems[data.index].texts.forEach((item: Text, index: number) => {
          if (item.index === data.itemIndex) {
            state.componentFormListItems[data.index].texts.splice(index, 1);
          }
        })
      } else if (data.type === "Input Text") {
        state.componentFormListItems[data.index].inputTexts.forEach((item: FormItem, index: number) => {
          if (item.index === data.itemIndex) {
            state.componentFormListItems[data.index].inputTexts.splice(index, 1);
          }
        })
      } else if (data.type === "Long Text") {
        state.componentFormListItems[data.index].longTexts.forEach((item: FormItem, index: number) => {
          if (item.index === data.itemIndex) {
            state.componentFormListItems[data.index].longTexts.splice(index, 1);
          }
        })
      } else if (data.type === "Input Upload") {
        state.componentFormListItems[data.index].inputUploads.forEach((item: FormItem, index: number) => {
          if (item.index === data.itemIndex) {
            state.componentFormListItems[data.index].inputUploads.splice(index, 1);
          }
        })
      } else if (data.type === "Input Email") {
        state.componentFormListItems[data.index].inputEmails.forEach((item: FormItem, index: number) => {
          if (item.index === data.itemIndex) {
            state.componentFormListItems[data.index].inputEmails.splice(index, 1);
          }
        })
      } else if (data.type === "Input Datetime") {
        state.componentFormListItems[data.index].inputDatetimes.forEach((item: FormItem, index: number) => {
          if (item.index === data.itemIndex) {
            state.componentFormListItems[data.index].inputDatetimes.splice(index, 1);
          }
        })
      } else if (data.type === "Select") {
        state.componentFormListItems[data.index].selects.forEach((item: FormItem, index: number) => {
          if (item.index === data.itemIndex) {
            state.componentFormListItems[data.index].selects.splice(index, 1);
          }
        })
      } else if (data.type === "Checkbox") {
        state.componentFormListItems[data.index].checkboxes.forEach((item: FormItem, index: number) => {
          if (item.index === data.itemIndex) {
            state.componentFormListItems[data.index].checkboxes.splice(index, 1);
          }
        })
      } else if (data.type === "Radio") {
        state.componentFormListItems[data.index].radioes.forEach((item: FormItem, index: number) => {
          if (item.index === data.itemIndex) {
            state.componentFormListItems[data.index].radioes.splice(index, 1);
          }
        })
      }
      state.componentFormListItems[data.index].buttons.forEach((item: Button) => {
        if (item.index > data.itemIndex) {
          item.index = item.index - 1;
        }
      })
      state.componentFormListItems[data.index].listFormContact.forEach((item: FormContact) => {
        if (item.index > data.itemIndex) {
          item.index = item.index - 1;
        }
      })
      state.componentFormListItems[data.index].listGallery.forEach((item: Gallery) => {
        if (item.index > data.itemIndex) {
          item.index = item.index - 1;
        }
      })
      state.componentFormListItems[data.index].headings.forEach((item: Heading) => {
        if (item.index > data.itemIndex) {
          item.index = item.index - 1;
        }
      })
      state.componentFormListItems[data.index].listGalleryImage.forEach((item: GalleryImage) => {
        if (item.index && item.index > data.itemIndex) {
          item.index = item.index - 1;
        }
      })
      state.componentFormListItems[data.index].images.forEach((item: Image) => {
        if (item.index > data.itemIndex) {
          item.index = item.index - 1;
        }
      })
      state.componentFormListItems[data.index].listSwiperSlider.forEach((item: SwiperSlider) => {
        if (item.index > data.itemIndex) {
          item.index = item.index - 1;
        }
      })
      state.componentFormListItems[data.index].texts.forEach((item: Text) => {
        if (item.index > data.itemIndex) {
          item.index = item.index - 1;
        }
      })
      state.componentFormListItems[data.index].inputTexts.forEach((item: FormItem) => {
        if (item.index > data.itemIndex) {
          item.index = item.index - 1;
        }
      })
      state.componentFormListItems[data.index].inputEmails.forEach((item: FormItem) => {
        if (item.index > data.itemIndex) {
          item.index = item.index - 1;
        }
      })
      state.componentFormListItems[data.index].inputDatetimes.forEach((item: FormItem) => {
        if (item.index > data.itemIndex) {
          item.index = item.index - 1;
        }
      })
      state.componentFormListItems[data.index].selects.forEach((item: FormItem) => {
        if (item.index > data.itemIndex) {
          item.index = item.index - 1;
        }
      })
      state.componentFormListItems[data.index].checkboxes.forEach((item: FormItem) => {
        if (item.index > data.itemIndex) {
          item.index = item.index - 1;
        }
      })
      state.componentFormListItems[data.index].radioes.forEach((item: FormItem) => {
        if (item.index > data.itemIndex) {
          item.index = item.index - 1;
        }
      })
      state.componentFormListItems[data.index].longTexts.forEach((item: FormItem) => {
        if (item.index > data.itemIndex) {
          item.index = item.index - 1;
        }
      })
      state.componentFormListItems[data.index].inputUploads.forEach((item: FormItem) => {
        if (item.index > data.itemIndex) {
          item.index = item.index - 1;
        }
      })
    },
    changeListItemComponentForm(state: any, item: any) {
      if (item.type === "Button") {
        state.componentFormListItems[item.index].buttons[item.itemIndex].liquidData = item.data;
      } else if (item.type === "Gallery") {
        state.componentFormListItems[item.index].listGallery[item.itemIndex].liquidData = item.data;
      } else if (item.type === "Heading") {
        state.componentFormListItems[item.index].headings[item.itemIndex].liquidData = item.data;
      } else if (item.type === "Image") {
        state.componentFormListItems[item.index].images[item.itemIndex].liquidData = item.data;
      } else if (item.type === "Gallery Image") {
        state.componentFormListItems[item.index].listGalleryImage[item.itemIndex].liquidData = item.data;
      } else if (item.type === "Swiper Slider") {
        state.componentFormListItems[item.index].listSwiperSlider[item.itemIndex].liquidData = item.data;
      } else if (item.type === "Text") {
        state.componentFormListItems[item.index].texts[item.itemIndex].liquidData = item.data;
      } else if (item.type === "Input Text") {
        state.componentFormListItems[item.index].inputTexts[item.itemIndex].liquidData = item.data;
      } else if (item.type === "Long Text") {
        state.componentFormListItems[item.index].longTexts[item.itemIndex].liquidData = item.data;
      } else if (item.type === "Input Upload") {
        state.componentFormListItems[item.index].inputUploads[item.itemIndex].liquidData = item.data;
      } else if (item.type === "Input Email") {
        state.componentFormListItems[item.index].inputEmails[item.itemIndex].liquidData = item.data;
      } else if (item.type === "Input Datetime") {
        state.componentFormListItems[item.index].inputDatetimes[item.itemIndex].liquidData = item.data;
      } else if (item.type === "Select") {
        state.componentFormListItems[item.index].selects[item.itemIndex].liquidData = item.data;
      } else if (item.type === "Checkbox") {
        state.componentFormListItems[item.index].checkboxes[item.itemIndex].liquidData = item.data;
      } else if (item.type === "Radio") {
        state.componentFormListItems[item.index].radioes[item.itemIndex].liquidData = item.data;
      }
    },
    changeItemComponentFormGroupField(state: any, item: any) {
      if (item.fatherType === "Gallery") {
        state.componentFormListItems[item.index].listGallery[item.groupIndex].items[item.itemIndex].liquidData = item.data;
      } else if (item.fatherType === "Form Contact") {
        state.componentFormListItems[item.index].listFormContact[item.groupIndex].items[item.itemIndex].liquidData = item.data;
      } else if (item.fatherType === "Slider Item") {
        if (item.type === "Image") {
          state.componentFormListItems[item.index].listSwiperSlider[item.groupIndex].items[0].liquidData = item.data;
        } else if (item.type === "Heading") {
          state.componentFormListItems[item.index].listSwiperSlider[item.groupIndex].items[1].liquidData = item.data;
        } else if (item.type === "Content") {
          state.componentFormListItems[item.index].listSwiperSlider[item.groupIndex].items[2].liquidData = item.data;
        }
      }
    }
  },
});

export default store;
