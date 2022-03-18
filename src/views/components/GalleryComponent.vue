<template>
  <div
    class="gallery-component"
    id="gallery-component"
    :style="
      '--column: ' +
      items.options.columns +
      '; --rowGap: ' +
      items.options.rowGap +
      'px;--columnGap: ' +
      items.options.columnGap +
      'px;'
    "
  >
    <div
      v-for="(item, index) in listItems"
      class="item"
      :class="'item-' + (index + 1)"
      :key="index"
      @click="openImage(item)"
    >
      <img :src="item.options.thumbnail" alt="" />
    </div>
    <LightBox
      v-if="openPopup"
      :item="selectedItem"
      v-model:openPopup="openPopup"
    />
  </div>
</template>

<script>
import LightBox from "./LightBox.vue";

export default {
  props: ["items"],
  components: {
    LightBox,
  },
  data() {
    return {
      openPopup: false,
      selectedItem: null,
    };
  },
  computed: {
    listItems() {
      let newArrays = [];
      newArrays = Object.assign([], this.items.children);
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
  },
  watch: {
    openPopup(e) {
      if (!e) {
        this.selectedItem = null;
      }
    },
  },
  methods: {
    openImage(item) {
      this.selectedItem = item;
      this.openPopup = true;
    },
  },
};
</script>
