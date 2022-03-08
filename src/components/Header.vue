<template>
  <div class="header">
    <router-link to="/gallery" :class="route === 'Gallery' ? 'active' : ''">Gallery</router-link>
    <router-link to="/form-contact" :class="route === 'Form Contact' ? 'active' : ''">Form Contact</router-link>
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