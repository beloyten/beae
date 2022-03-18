<template>
  <div class="page gallery">
    <div class="left">
      <div class="gap-column">
        <div>
          <label for="item-per-row">Items per row</label>
          <input id="item-per-row" type="number" v-model="columns" />
        </div>
        <div>
          <label for="column-gap">Column gap (px)</label>
          <input id="column-gap" type="number" v-model="columnGap" />
        </div>
        <div>
          <label for="row-gap">Row gap (px)</label>
          <input id="row-gap" type="number" v-model="rowGap" />
        </div>
        <div class="actions">
          <button @click="applyCSS">Apply</button>
          <button @click="resetCSS">Reset</button>
        </div>
      </div>
      <div class="items">
        <div class="list-item-title">
          <h4>Items</h4>
          <button @click="openFormAdd()">Add</button>
        </div>
        <div class="add-new" v-if="checkAddNew">
          <div class="title">Add new</div>
          <div class="item-content">
            <div>
              <label for="new-title">Title</label>
              <input id="new-title" type="text" v-model="itemTitle" />
            </div>
            <div>
              <label for="new-thumbnail">Thumbnail</label>
              <input id="new-thumbnail" type="text" v-model="itemThumbnail" />
            </div>
            <div>
              <label for="new-src">Src</label>
              <input id="new-src" type="text" v-model="itemSrc" />
            </div>
            <div class="item-actions">
              <button @click="addNewItem()">Apply</button>
              <button @click="cancelAdd()">Cancel</button>
            </div>
          </div>
        </div>
        <ul>
          <li
            v-for="(item, index) in sortItems"
            :class="selected === index ? 'active' : ''"
            :key="index">
            <div class="title" @click="select(index)">
              {{ item.options.title }}
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
    <div
      class="right"
      id="grid-content"
      :style="
        '--column: ' +
        galleryOptions.columns +
        '; --rowGap: ' +
        galleryOptions.rowGap +
        'px;--columnGap: ' +
        galleryOptions.columnGap +
        'px;'
      "
    >
      <div
        v-for="(item, index) in sortItems"
        class="item"
        :class="'item-' + (index + 1)"
        :key="index"
        @click="openImage(item)"
      >
        <img :src="item.options.thumbnail" alt="" />
      </div>
    </div>
    <LightBox
      v-if="openPopup"
      :item="selectedItem"
      v-model:openPopup="openPopup"
    />
  </div>
</template>

<script>
import LightBox from "./components/LightBox.vue";

export default {
  components: {
    LightBox,
  },
  data() {
    return {
      columns: 4,
      rowGap: 50,
      columnGap: 50,
      itemTitle: "",
      itemThumbnail: "",
      itemSrc: "",
      itemIndex: 0,
      selected: null,
      checkAddNew: false,
      selectedItem: {},
      openPopup: false,
    };
  },
  computed: {
    sortItems() {
      let newArrays = Object.assign([], this.listGallery);
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
    listGallery() {
      return this.$store.getters.getGalleryListItems;
    },
    galleryOptions() {
      return this.$store.getters.getGalleryOptions;
    },
  },
  created() {
    this.columns = this.galleryOptions.columns;
    this.rowGap = this.galleryOptions.rowGap;
    this.columnGap = this.galleryOptions.columnGap;
  },
  methods: {
    select(index) {
      if (this.selected !== index) {
        this.cancelAdd();
        this.selected = index;
        this.itemTitle = this.sortItems[index].options.title;
        this.itemThumbnail = this.sortItems[index].options.thumbnail;
        this.itemSrc = this.sortItems[index].options.src;
        this.itemIndex = this.sortItems[index].index;
      } else {
        this.closeItemDetail();
      }
    },
    applyCSS() {
      if (this.columns < 1) {
        alert("The columns field must be >= 1!");
      } else if (this.columnGap < 0 || this.rowGap < 0) {
        alert("The gap values must be >= 0!");
      } else {
        this.$store.commit("setGalleryOptions", {
          columns: this.columns,
          rowGap: this.rowGap,
          columnGap: this.columnGap,
        });
      }
    },
    resetCSS() {
      this.columns = 4;
      this.rowGap = 50;
      this.columnGap = 50;
      this.applyCSS();
    },
    changeItemContent(index) {
      if (this.itemIndex >= 1 && this.itemIndex <= this.listGallery.length) {
        this.$store.commit("changeGalleryItemContent", {
          index: index,
          itemIndex: this.itemIndex,
          gallery: {
            title: this.itemTitle,
            thumbnail: this.itemThumbnail,
            src: this.itemSrc,
            index: this.itemIndex,
          },
        });
        this.closeItemDetail();
      } else {
        alert("Index value must be between 1 and the length of the array");
      }
    },
    closeItemDetail() {
      this.selected = null;
      this.itemTitle = "";
      this.itemThumbnail = "";
      this.itemSrc = "";
      this.itemIndex = 0;
    },
    openFormAdd() {
      this.closeItemDetail();
      this.checkAddNew = true;
    },
    cancelAdd() {
      this.closeItemDetail();
      this.checkAddNew = false;
    },
    addNewItem() {
      this.$store.commit("addGalleryItem", {
        children: [],
        options: {
          src: this.itemSrc,
          title: this.itemTitle,
          thumbnail: this.itemThumbnail,
        },
        type: "Image",
        index: this.listGallery.length + 1,
      });
      this.cancelAdd();
    },
    deleteItem(index) {
      this.$store.commit("deleteGalleryItem", index);
      this.closeItemDetail();
    },
    openImage(item) {
      this.selectedItem = item;
      this.openPopup = true;
    },
  },
}
</script>
