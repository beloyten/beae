<template>
  <div class="gallery-component">
    <div
      v-for="(item, index) in items"
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
