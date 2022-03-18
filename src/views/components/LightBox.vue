<template>
  <div class="overlay">
    <div class="popup">
      <div class="title">
        <h3>{{ item.options.title }}</h3>
        <span @click="$emit('update:openPopup', false)">x</span>
      </div>
      <div class="content">
        <img :src="item.options.src" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item", "openPopup"],
};
</script>
