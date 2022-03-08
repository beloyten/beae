<template>
  <div class="overlay">
    <div class="popup">
      <div class="title">
        <h3>{{ item.title }}</h3>
        <span @click="closePopup">x</span>
      </div>
      <div class="content">
        <img :src="item.src" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item", "openPopup"],
  emits: ["openPopup"],
  methods: {
    closePopup() {
      this.$emit("openPopup", false);
    },
  },
}
</script>
