<template>
  <div class="header">
    <a :class="route === 'Gallery' ? 'active' : ''">Gallery</a>
    <a>Form Contact</a>
    <a>Slider</a>
  </div>
</template>

<script>
export default {
  computed: {
    route() {
      return this.$route.name;
    }
  },
  created() {
    console.log(this.route);
  }
}
</script>