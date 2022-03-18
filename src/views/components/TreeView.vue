<template>
  <div class="tree-view" :id="'tree-' + deep">
    <div v-for="(item, index) in items" :key="index" class="tree-item">
      <div
        class="tree-title"
        :id="'tree-title-' + deep + '-' + index"
        @click="showSection(item, index)"
      >
        {{ item.type }}
      </div>
      <tree-view
        :items="item.children"
        :deep="Number(deep) + 1"
        v-if="item.children && item.children.length > 0"
        @select-children="selectChildren"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["items", "deep", "selectedField", "selectedFieldIndex", "keyOptions"],
  methods: {
    showSection(item, index) {
      document.getElementById(
        "tree-title-" + this.deep + "-" + index
      ).style.fontWeight = "bold";
      this.items.forEach((i, position) => {
        if (position !== index) {
          document.getElementById(
            "tree-title-" + this.deep + "-" + position
          ).style.fontWeight = "normal";
        }
      });
      let treeList = document
        .getElementById("navigator-item")
        .querySelectorAll("#tree-" + (Number(this.deep) + 1));
      if (treeList.length > 0) {
        treeList.forEach((item) => {
          item.classList.toggle("active");
        });
      } else {
        this.selectChildren(item);
      }
    },
    selectChildren(item) {
      this.$emit("selectChildren", item);
    },
  },
};
</script>
