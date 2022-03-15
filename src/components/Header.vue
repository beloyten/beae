<template>
  <div class="header">
    <router-link to="/gallery" :class="route === 'Gallery' ? 'active' : ''"
      >Gallery</router-link
    >
    <router-link
      to="/form-contact"
      :class="route === 'Form Contact' ? 'active' : ''"
      >Form Contact</router-link
    >
    <router-link
      to="/swiper-slider"
      :class="route === 'Swiper Slider' ? 'active' : ''"
      >Swiper Slider</router-link
    >
    <router-link
      to="/component-form"
      :class="route === 'Component Form' ? 'active' : ''"
      >Component Form</router-link
    >
    <router-link
      to="/products-collection"
      :class="route === 'Products Collection' ? 'active' : ''"
      >Products Collection</router-link
    >
  </div>
</template>

<script>
export default {
  computed: {
    route() {
      return this.$route.name;
    },
  },
};
</script>
