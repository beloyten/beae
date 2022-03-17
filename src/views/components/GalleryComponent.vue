<template>
  <div class="gallery-component" id="gallery-component">
    <div
      v-for="(item, index) in listItems"
      class="item"
      :class="'item-' + (index + 1)"
      :key="index"
      @click="openImage(item)"
    >
      <img :src="item.src" alt="" />
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
    options() {
      return this.items.options;
    },
    listItems() {
      let newArrays = [];
      newArrays = Object.assign([], this.items.list);
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
    options: {
      handler: function (e) {
        let gridContent = document.getElementById("gallery-component");
        gridContent.style.gridTemplateColumns =
          "repeat(" + e.columns + ", 1fr)";
        gridContent.style.gap = e.rowGap + "px " + e.columnGap + "px";
      },
      deep: true,
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
