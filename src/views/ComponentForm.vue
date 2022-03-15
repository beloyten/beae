<template>
  <div class="page component-form">
    <div class="left">
      <div class="items">
        <div class="list-item-title">
          <ul>
            <li
              @click="setTab('navigator')"
              :class="tab === 'navigator' ? 'active' : ''"
            >
              Navigator
            </li>
            <li
              @click="setTab('elements')"
              :class="tab === 'elements' ? 'active' : ''"
            >
              Elements
            </li>
          </ul>
        </div>
        <div class="item-content-elements" v-if="tab === 'elements'">
          <div class="button" id="gallery" draggable="true" @dragstart="drag">
            Gallery
          </div>
          <div
            class="button"
            id="contact-form"
            draggable="true"
            @dragstart="drag"
          >
            Contact Form
          </div>
          <div class="button" id="slider" draggable="true" @dragstart="drag">
            Slider
          </div>
          <div
            class="button"
            id="group-fields"
            draggable="true"
            @dragstart="drag"
          >
            Group Fields
          </div>
          <div class="button" id="text" draggable="true" @dragstart="drag">
            Text
          </div>
          <div class="button" id="textarea" draggable="true" @dragstart="drag">
            Textarea
          </div>
          <div
            class="button"
            id="image-upload"
            draggable="true"
            @dragstart="drag"
          >
            Image Upload
          </div>
        </div>
        <div v-else class="item-content-navigator">
          <div class="options" v-if="keyOptions.length > 0">
            <h4>Options</h4>
            <div class="option-list">
              <div
                class="option"
                v-for="(item, index) in keyOptions"
                :key="index"
                :class="
                  typeof selectedField.fields.options[item] === 'boolean'
                    ? 'checkbox'
                    : ''
                "
              >
                <label
                  :for="
                    'option-' +
                    selectedField.type +
                    '-' +
                    selectedField.index +
                    '' +
                    index
                  "
                  >{{
                    item === "columns"
                      ? "Items per row"
                      : item === "rowGap"
                      ? "Row gap (px)"
                      : item === "columnGap"
                      ? "Column gap (px)"
                      : item === "itemsPerPage"
                      ? "Items per page"
                      : item === "pagination"
                      ? "Pagination"
                      : item === "navigation"
                      ? "Navigation"
                      : ""
                  }}</label
                >
                <input
                  :type="
                    typeof selectedField.fields.options[item] === 'string'
                      ? 'text'
                      : typeof selectedField.fields.options[item] === 'number'
                      ? 'number'
                      : typeof selectedField.fields.options[item] === 'boolean'
                      ? 'checkbox'
                      : ''
                  "
                  :id="
                    'option-' +
                    selectedField.type +
                    '-' +
                    selectedField.index +
                    '' +
                    index
                  "
                  v-model="selectedField.fields.optionsModal[item]"
                />
              </div>
              <div class="actions">
                <button @click="applyCSS">Apply</button>
                <button @click="resetCSS">Reset</button>
              </div>
            </div>
          </div>
          <div
            class="items-list"
            v-if="
              selectedField && selectedField.fields && selectedField.fields.list
            "
          >
            <div class="item-title">
              <h4>Items</h4>
              <button @click="openFormAdd()">Add</button>
            </div>
            <div class="add-new" v-if="checkAddNew">
              <div class="title">Add new</div>
              <div class="item-content">
                <div
                  v-if="
                    selectedField.type === 'gallery' ||
                    selectedField.type === 'swiper-slider'
                  "
                >
                  <label for="new-title">Title</label>
                  <input id="new-title" type="text" v-model="itemTitle" />
                </div>
                <div v-if="selectedField.type === 'gallery'">
                  <label for="new-thumbnail">Thumbnail</label>
                  <input
                    id="new-thumbnail"
                    type="text"
                    v-model="itemThumbnail"
                  />
                </div>
                <div v-if="selectedField.type === 'gallery'">
                  <label for="new-src">Src</label>
                  <input id="new-src" type="text" v-model="itemSrc" />
                </div>
                <div v-if="selectedField.type === 'gallery'">
                  <label for="new-src">Src</label>
                  <input id="new-src" type="text" v-model="itemSrc" />
                </div>
                <div v-if="selectedField.type === 'swiper-slider'">
                  <label for="new-content">Content</label>
                  <input id="new-content" type="text" v-model="itemContent" />
                </div>
                <div v-if="selectedField.type === 'swiper-slider'">
                  <label for="new-image">Image</label>
                  <input id="new-image" type="text" v-model="itemImage" />
                </div>
                <div class="item-actions">
                  <button @click="addNewItem()">Apply</button>
                  <button @click="cancelAdd()">Cancel</button>
                </div>
              </div>
            </div>
            <ul>
              <li
                v-for="(item, index) in selectedField.fields.list"
                :class="selected === index ? 'active' : ''"
                :key="index"
              >
                <div class="title" @click="select(index)">
                  {{ item.title }}
                </div>
                <div class="item-content" v-if="selected === index">
                  <div>
                    <label for="edit-title">Title</label>
                    <input id="edit-title" type="text" v-model="itemTitle" />
                  </div>
                  <div>
                    <label for="edit-index">Index</label>
                    <input id="edit-index" type="number" v-model="itemIndex" />
                  </div>
                  <div>
                    <label for="edit-thumbnail">Thumbnail</label>
                    <input
                      id="edit-thumbnail"
                      type="text"
                      v-model="itemThumbnail"
                    />
                  </div>
                  <div>
                    <label for="edit-src">Src</label>
                    <input id="edit-src" type="text" v-model="itemSrc" />
                  </div>
                  <div class="item-actions">
                    <button @click="changeItemContent(index)">Apply</button>
                    <button @click="deleteItem(index)">Delete</button>
                    <button @click="closeItemDetail()">Cancel</button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="right" id="div" @drop.prevent="drop" @dragover.prevent>
      <div
        v-for="(item, index) in sortComponentForm"
        :key="index"
        class="form-component"
        @click="selectField(item, index)"
        :class="selectedFieldIndex === index ? 'active' : ''"
      >
        <gallery-component
          v-if="item.type === 'gallery'"
          :items="item.fields.list"
        />
        <form-contact-component
          v-else-if="item.type === 'form-contact'"
          :fields="item.fields.list"
        />
        <swiper-slider-component
          v-else-if="item.type === 'swiper-slider'"
          :fields="item.fields"
        />
      </div>
    </div>
  </div>
</template>

<script>
import GalleryComponent from "./components/GalleryComponent.vue";
import FormContactComponent from "./components/FormContactComponent.vue";
import SwiperSliderComponent from "./components/SwiperSliderComponent.vue";
import GalleryData from "@/data/gallery";
import FormContactData from "@/data/formContact";
import SwiperSliderData from "@/data/swiperSlider";

export default {
  components: {
    GalleryComponent,
    FormContactComponent,
    SwiperSliderComponent,
  },
  data() {
    return {
      tab: "elements",
      selectedField: {},
      selected: null,
      checkAddNew: false,
      itemTitle: "",
      itemIndex: 0,
      itemThumbnail: "",
      itemSrc: "",
      itemContent: "",
      itemImage: "",
      selectedItem: {},
      selectedFieldIndex: null,
    };
  },
  computed: {
    listComponentForm() {
      return this.$store.getters.getComponentFormListItems;
    },
    sortComponentForm() {
      let newArrays = Object.assign([], this.listComponentForm);
      for (let i = 0; i < newArrays.length - 1; i++) {
        for (let j = i + 1; j < newArrays.length; j++) {
          if (newArrays[i].index > newArrays[j].index) {
            let temp = newArrays[i];
            newArrays[i] = newArrays[j];
            newArrays[j] = temp;
          }
        }
      }
      return newArrays;
    },
    keyOptions() {
      return this.selectedField &&
        this.selectedField.fields &&
        this.selectedField.fields.options
        ? Object.keys(this.selectedField.fields.options)
        : [];
    },
  },
  methods: {
    setTab(string) {
      this.tab = string;
    },
    drag(e) {
      e.dataTransfer.setData("id", e.target.id);
    },
    drop(e) {
      let id = e.dataTransfer.getData("id");
      if (id === "gallery") {
        this.$store.commit("addComponentFormItem", {
          fields: {
            list: GalleryData,
            options: {
              columns: 4,
              rowGap: 50,
              columnGap: 50,
            },
            optionsModal: {
              columns: 4,
              rowGap: 50,
              columnGap: 50,
            },
          },
          type: "gallery",
          index: this.listComponentForm.length + 1,
        });
      } else if (id === "contact-form") {
        this.$store.commit("addComponentFormItem", {
          fields: {
            list: FormContactData,
            options: {},
          },
          type: "form-contact",
          index: this.listComponentForm.length + 1,
        });
      } else if (id === "slider") {
        this.$store.commit("addComponentFormItem", {
          fields: {
            list: SwiperSliderData,
            options: {
              itemsPerPage: 3,
              pagination: true,
              navigation: true,
            },
            optionsModal: {
              itemsPerPage: 3,
              pagination: true,
              navigation: true,
            },
          },
          type: "swiper-slider",
          index: this.listComponentForm.length + 1,
        });
      }
      this.selectedFieldIndex = this.listComponentForm.length - 1;
      this.selectedField =
        this.listComponentForm[this.listComponentForm.length - 1];
      console.log(this.listComponentForm);
    },
    openFormAdd() {
      this.closeItemDetail();
      this.checkAddNew = true;
    },
    cancelAdd() {
      this.closeItemDetail();
      this.checkAddNew = false;
    },
    closeItemDetail() {
      this.selected = null;
      this.itemTitle = "";
      this.itemThumbnail = "";
      this.itemSrc = "";
      this.itemIndex = 0;
    },
    select(index) {
      if (this.selected !== index) {
        this.cancelAdd();
        this.selected = index;
        this.itemTitle = this.selectedField.fields.list[index].title;
        this.itemThumbnail = this.selectedField.fields.list[index].thumbnail;
        this.itemSrc = this.selectedField.fields.list[index].src;
        this.itemIndex = this.selectedField.fields.list[index].index;
      } else {
        this.closeItemDetail();
      }
    },
    selectField(item, index) {
      this.selectedField = item;
      this.selectedFieldIndex = index;
      this.tab = "navigator";
    },
  },
};
</script>
