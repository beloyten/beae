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
                  v-model="options[item]"
                />
              </div>
              <div class="actions">
                <button @click="applyConfig">Apply</button>
                <button @click="resetConfig">Reset</button>
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
              <button
                @click="openFormAdd()"
                v-if="selectedField.type !== 'form-contact'"
              >
                Add
              </button>
              <button @click="addItem()" v-else>Add</button>
              <div
                class="add-list"
                :class="showAddList ? 'show' : ''"
                v-if="selectedField.type === 'form-contact'"
              >
                <span @click="closeAdd()">x</span>
                <ul>
                  <li @click="setCreateType('Text')">Text</li>
                  <li @click="setCreateType('Email')">Email</li>
                  <li @click="setCreateType('Datetime')">Datetime</li>
                  <li @click="setCreateType('Select')">Select</li>
                  <li @click="setCreateType('Checkbox')">Checkbox</li>
                  <li @click="setCreateType('Radio')">Radio</li>
                  <li @click="setCreateType('Long Text')">Long Text</li>
                </ul>
              </div>
            </div>
            <div class="add-new" v-if="checkAddNew">
              <div class="title" v-if="selectedField.type === 'form-contact'">
                Add new {{ createType }}
              </div>
              <div class="title" v-else>Add new</div>
              <div class="item-content">
                <div v-if="selectedField.type === 'form-contact'">
                  <label for="form-label">Label</label>
                  <input id="form-label" type="text" v-model="form.label" />
                </div>
                <div
                  v-if="
                    selectedField.type === 'form-contact' &&
                    (createType === 'Text' ||
                      createType === 'Email' ||
                      createType === 'Long Text')
                  "
                >
                  <label for="form-placeholder">Placeholder</label>
                  <input
                    id="form-placeholder"
                    type="text"
                    v-model="form.placeholder"
                  />
                </div>
                <div v-if="selectedField.type === 'form-contact'">
                  <label for="form-description">Description</label>
                  <textarea id="form-description" v-model="form.description" />
                  <span>Description about the field</span>
                </div>
                <div
                  class="required"
                  v-if="selectedField.type === 'form-contact'"
                >
                  <label for="form-required">Required</label>
                  <input
                    id="form-required"
                    type="checkbox"
                    v-model="form.required"
                  />
                </div>
                <div
                  class="options-list"
                  v-if="
                    selectedField.type === 'form-contact' &&
                    (createType === 'Select' ||
                      createType === 'Checkbox' ||
                      createType === 'Radio')
                  "
                >
                  <div class="label">
                    <label>Options</label>
                    <button @click="addOptions(form)">Add</button>
                  </div>
                  <div class="options-content">
                    <div v-for="(item, index) in form.options" :key="index">
                      <div class="title-option">
                        <h4>Option {{ index + 1 }}</h4>
                        <button @click="deleteOption(index, form)">
                          Delete
                        </button>
                      </div>
                      <div>
                        <label>Text</label>
                        <input type="text" v-model="item.text" />
                      </div>
                      <div>
                        <label>Value</label>
                        <input type="text" v-model="item.value" />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="field-width"
                  v-if="selectedField.type === 'form-contact'"
                >
                  <label for="form-width">Field width</label>
                  <div class="slider">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value="50"
                      id="form-width"
                      oninput="this.nextElementSibling.value = this.value + ' %'"
                    />
                    <output id="output-value">50 %</output>
                  </div>
                </div>
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
                <div v-if="selectedField.type === 'swiper-slider'">
                  <label for="new-content">Content</label>
                  <input id="new-content" type="text" v-model="itemContent" />
                </div>
                <div v-if="selectedField.type === 'swiper-slider'">
                  <label for="new-image">Image</label>
                  <input id="new-image" type="text" v-model="itemImg" />
                </div>
                <div class="item-actions">
                  <button @click="addNewItem()">Apply</button>
                  <button @click="cancelAdd()">Cancel</button>
                </div>
              </div>
            </div>
            <ul>
              <li
                v-for="(item, index) in listItems"
                :class="selected === index ? 'active' : ''"
                :key="index"
              >
                <div class="title" @click="select(index)">
                  {{ item.title ? item.title : item.type }}
                </div>
                <div class="item-content" v-show="selected === index">
                  <div v-if="selectedField.type === 'form-contact'">
                    <label for="edit-label">Label</label>
                    <input id="edit-label" type="text" v-model="form.label" />
                  </div>
                  <div
                    v-if="
                      selectedField.type === 'form-contact' &&
                      (item.type === 'Text' ||
                        item.type === 'Email' ||
                        item.type === 'Long Text')
                    "
                  >
                    <label for="edit-placeholder">Placeholder</label>
                    <input
                      id="edit-placeholder"
                      type="text"
                      v-model="form.placeholder"
                    />
                  </div>
                  <div v-if="selectedField.type === 'form-contact'">
                    <label for="edit-description">Description</label>
                    <textarea
                      id="edit-description"
                      v-model="form.description"
                    />
                    <span>Description about the field</span>
                  </div>
                  <div
                    class="required"
                    v-if="selectedField.type === 'form-contact'"
                  >
                    <label for="edit-required">Required</label>
                    <input
                      id="edit-required"
                      type="checkbox"
                      v-model="form.required"
                    />
                  </div>
                  <div
                    class="options-list"
                    v-if="
                      selectedField.type === 'form-contact' &&
                      (item.type === 'Select' ||
                        item.type === 'Checkbox' ||
                        item.type === 'Radio')
                    "
                  >
                    <div class="label">
                      <label>Options</label>
                      <button @click="addOptions(form)">Add</button>
                    </div>
                    <div class="options-content">
                      <div v-for="(item, index) in form.options" :key="index">
                        <div class="title-option">
                          <h4>Option {{ index + 1 }}</h4>
                          <button @click="deleteOption(index, form)">
                            Delete
                          </button>
                        </div>
                        <div>
                          <label>Text</label>
                          <input type="text" v-model="item.text" />
                        </div>
                        <div>
                          <label>Value</label>
                          <input type="text" v-model="item.value" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="field-width"
                    v-if="selectedField.type === 'form-contact'"
                  >
                    <label :for="'edit-width-' + index">Field width</label>
                    <div class="slider">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value="50"
                        :id="'edit-width-' + index"
                        @input="onUpdateWidth"
                      />
                      <output :id="'output-value-edit-' + index">50 %</output>
                    </div>
                  </div>
                  <div
                    v-if="
                      selectedField.type === 'gallery' ||
                      selectedField.type === 'swiper-slider'
                    "
                  >
                    <label for="edit-title">Title</label>
                    <input id="edit-title" type="text" v-model="itemTitle" />
                  </div>
                  <div v-if="selectedField.type === 'gallery'">
                    <label for="edit-index">Index</label>
                    <input id="edit-index" type="number" v-model="itemIndex" />
                  </div>
                  <div v-if="selectedField.type === 'gallery'">
                    <label for="edit-thumbnail">Thumbnail</label>
                    <input
                      id="edit-thumbnail"
                      type="text"
                      v-model="itemThumbnail"
                    />
                  </div>
                  <div v-if="selectedField.type === 'gallery'">
                    <label for="edit-src">Src</label>
                    <input id="edit-src" type="text" v-model="itemSrc" />
                  </div>
                  <div v-if="selectedField.type === 'swiper-slider'">
                    <label for="edit-content">Content</label>
                    <input
                      id="edit-content"
                      type="text"
                      v-model="itemContent"
                    />
                  </div>
                  <div v-if="selectedField.type === 'swiper-slider'">
                    <label for="edit-image">Image</label>
                    <input id="edit-image" type="text" v-model="itemImg" />
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
        <span @click.stop="deleteComponent(index)" class="delete-component"
          >x</span
        >
        <gallery-component
          v-if="item.type === 'gallery'"
          :items="item.fields"
        />
        <form-contact-component
          v-else-if="item.type === 'form-contact'"
          :fields="item"
        />
        <swiper-slider-component
          v-else-if="item.type === 'swiper-slider'"
          :fields="item.fields"
        />
        <text-component v-else-if="item.type === 'text'" :fields="item" />
      </div>
    </div>
  </div>
</template>

<script>
import GalleryComponent from "./components/GalleryComponent.vue";
import FormContactComponent from "./components/FormContactComponent.vue";
import SwiperSliderComponent from "./components/SwiperSliderComponent.vue";
import TextComponent from "./components/TextComponent.vue";
import GalleryData from "@/data/gallery";
import FormContactData from "@/data/formContact";
import SwiperSliderData from "@/data/swiperSlider";

export default {
  components: {
    GalleryComponent,
    FormContactComponent,
    SwiperSliderComponent,
    TextComponent,
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
      itemImg: "",
      selectedItem: {},
      selectedFieldIndex: null,
      showAddList: false,
      form: {
        label: "",
        description: "",
        required: false,
        width: 0,
      },
      options: {},
      createType: null,
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
    listItems() {
      let newArrays = [];
      if (this.selectedField.type === "gallery") {
        newArrays = Object.assign([], this.selectedField.fields.list);
        for (let i = 0; i < newArrays.length - 1; i++) {
          for (let j = i + 1; j < newArrays.length; j++) {
            if (newArrays[i].index > newArrays[j].index) {
              let temp = newArrays[i];
              newArrays[i] = newArrays[j];
              newArrays[j] = temp;
            }
          }
        }
      } else {
        newArrays = this.selectedField.fields.list;
      }
      return newArrays;
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
        this.options = {
          columns: 4,
          rowGap: 50,
          columnGap: 50,
        };
        this.$store.commit("addComponentFormItem", {
          fields: {
            list: GalleryData,
            options: {
              columns: 4,
              rowGap: 50,
              columnGap: 50,
            },
          },
          type: "gallery",
          index: this.listComponentForm.length + 1,
        });
      } else if (id === "contact-form") {
        this.options = {};
        this.$store.commit("addComponentFormItem", {
          fields: {
            list: FormContactData,
            options: {},
          },
          type: "form-contact",
          index: this.listComponentForm.length + 1,
        });
      } else if (id === "slider") {
        this.options = {
          itemsPerPage: 3,
          pagination: true,
          navigation: true,
        };
        this.$store.commit("addComponentFormItem", {
          fields: {
            list: SwiperSliderData,
            options: {
              itemsPerPage: 3,
              pagination: true,
              navigation: true,
            },
          },
          type: "swiper-slider",
          index: this.listComponentForm.length + 1,
        });
      } else if (id === "text") {
        this.options = {};
        this.$store.commit("addComponentFormItem", {
          fields: {
            list: [
              {
                label: "New input",
                description: "",
                width: 50,
                required: false,
                placeholder: "Input text",
              },
            ],
            options: {},
          },
          type: "text",
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
      this.showAddList = false;
      this.checkAddNew = false;
    },
    closeItemDetail() {
      if (this.selected && this.selectedField.type === "form-contact") {
        let width = this.selectedField.fields.list[this.selected].width;
        let element = document.getElementById("item-" + this.selected).style;
        document.getElementById(
          "output-value-edit-" + this.selected
        ).innerHTML = width + "%";
        if (width > 50) {
          element.gridColumn = "1/3";
          element.width = width + "%";
        } else {
          element.gridColumn = "auto";
          element.width = width * 2 + "%";
        }
      }
      this.form = {
        label: "",
        description: "",
        required: false,
        width: 0,
      };
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
        if (this.selectedField.type === "gallery") {
          this.itemTitle = this.selectedField.fields.list[index].title;
          this.itemThumbnail = this.selectedField.fields.list[index].thumbnail;
          this.itemSrc = this.selectedField.fields.list[index].src;
          this.itemIndex = this.selectedField.fields.list[index].index;
        } else if (this.selectedField.type === "form-contact") {
          this.form = Object.assign({}, this.selectedField.fields.list[index]);
          console.log("output-value-edit-" + index);
          console.log(this.form);
          document.getElementById("output-value-edit-" + index).innerHTML =
            this.form.width + " %";
          document.getElementById("edit-width-" + index).value =
            this.form.width;
        } else if (this.selectedField.type === "swiper-slider") {
          this.itemTitle = this.selectedField.fields.list[index].title;
          this.itemContent = this.selectedField.fields.list[index].content;
          this.itemImg = this.selectedField.fields.list[index].img;
        }
      } else {
        this.closeItemDetail();
      }
    },
    selectField(item, index) {
      this.selectedField = item;
      this.closeAdd();
      this.closeItemDetail();
      this.selectedFieldIndex = index;
      this.options = this.selectedField.fields.options;
      this.tab = "navigator";
    },
    addItem() {
      this.showAddList = true;
    },
    closeAdd() {
      this.showAddList = false;
    },
    setCreateType(string) {
      this.closeItemDetail();
      if (string === "Text" || string === "Email" || string === "Long Text") {
        this.form.placeholder = "";
        if (string === "Long Text") {
          document.getElementById("output-value").innerHTML = "100 %";
          document.getElementById("form-width").value = 100;
        }
      } else if (
        string === "Select" ||
        string === "Checkbox" ||
        string === "Radio"
      ) {
        this.form.options = [
          {
            text: "The Title 1",
            value: "The value 1",
          },
        ];
      }
      this.createType = string;
      this.showAddList = false;
      this.checkAddNew = true;
    },
    addOptions(list) {
      list.options.push({
        text: "The Title " + (list.options.length + 1),
        value: "The Value " + (list.options.length + 1),
      });
    },
    deleteOption(index, list) {
      list.options.splice(index, 1);
    },
    addNewItem() {
      let data = {};
      if (this.selectedField.type === "form-contact") {
        this.form.type = this.createType;
        this.form.width = document.getElementById("form-width").value;
        if (this.createType === "Checkbox" || this.createType === "Radio") {
          this.form.listSelected = [];
        } else {
          this.form.value = "";
        }
        data = this.form;
      } else if (this.selectedField.type === "gallery") {
        data = {
          title: this.itemTitle,
          index: this.itemIndex,
          thumbnail: this.itemThumbnail,
          src: this.itemSrc,
        };
      } else if (this.selectedField.type === "swiper-slider") {
        data = {
          title: this.itemTitle,
          img: this.itemImg,
          content: this.itemContent,
        };
      }
      this.$store.commit("addListItemComponentForm", {
        index: this.selectedFieldIndex,
        item: data,
      });
      this.cancelAdd();
    },
    changeItemContent(index) {
      let data = {};
      if (this.selectedField.type === "gallery") {
        data = {
          index: this.selectedFieldIndex,
          itemIndex: index,
          data: {
            title: this.itemTitle,
            thumbnail: this.itemThumbnail,
            src: this.itemSrc,
            index: this.itemIndex,
          },
        };
      } else if (this.selectedField.type === "form-contact") {
        data = {
          index: this.selectedFieldIndex,
          itemIndex: index,
          data: this.form,
          width: document.getElementById("edit-width-" + index).value,
        };
      } else if (this.selectedField.type === "swiper-slider") {
        data = {
          index: this.selectedFieldIndex,
          itemIndex: index,
          data: {
            title: this.itemTitle,
            content: this.itemContent,
            img: this.itemImg,
          },
        };
      }
      this.$store.commit("changeListItemComponentForm", data);
      this.selected = null;
      this.closeItemDetail();
    },
    deleteItem(index) {
      this.$store.commit("deleteListItemComponentForm", {
        index: this.selectedFieldIndex,
        itemIndex: index,
      });
    },
    onUpdateWidth(e) {
      let width = e.target.value;
      let element = document.getElementById("item-" + this.selected).style;
      document.getElementById("output-value-edit-" + this.selected).innerHTML =
        width + "%";
      if (width > 50) {
        element.gridColumn = "1/3";
        element.width = width + "%";
      } else {
        element.gridColumn = "auto";
        element.width = width * 2 + "%";
      }
    },
    selectOptions(e, index) {
      this.$store.commit("selecOptionFormContact", {
        index: index,
        value: e.target.value,
      });
    },
    applyConfig() {
      if (this.selectedField.type === "gallery") {
        if (this.options.columns < 1) {
          alert("The columns field must be >= 1!");
        } else if (this.options.columnGap < 0 || this.options.rowGap < 0) {
          alert("The gap values must be >= 0!");
        } else {
          this.$store.commit("setComponentFormItemOptions", {
            index: this.selectedFieldIndex,
            options: {
              columns: this.options.columns,
              rowGap: this.options.rowGap,
              columnGap: this.options.columnGap,
            },
          });
        }
      } else if (this.selectedField.type === "swiper-slider") {
        if (
          this.options.itemsPerPage < 1 ||
          this.options.itemPerPage > this.selectedField.fields.list.length
        ) {
          alert(
            "You must input item per page >= 1 and <=" +
              this.selectedField.fields.list.length
          );
        } else {
          this.$store.commit("setComponentFormItemOptions", {
            index: this.selectedFieldIndex,
            options: {
              itemsPerPage: this.options.itemsPerPage,
              pagination: this.options.pagination,
              navigation: this.options.navigation,
            },
          });
        }
      }
    },
    deleteComponent(index) {
      this.$store.commit("deleteComponentFormItem", index);
    },
    resetConfig() {
      if (this.selectedField.type === "gallery") {
        this.options = {
          columns: 4,
          rowGap: 50,
          columnGap: 50,
        };
      } else if (this.selectedField.type === "swiper-slider") {
        this.options = {
          itemsPerPage: 3,
          pagination: true,
          navigation: true,
        };
      }
      this.applyConfig();
    },
  },
};
</script>
