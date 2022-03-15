<template>
  <div class="swiper-slider-component">
    <swiper
      :effect="'coverflow'"
      :grabCursor="true"
      :spaceBetween="20"
      :navigation="fields.options.navigation"
      :centeredSlides="true"
      :slidesPerView="fields.options.itemsPerPage"
      :coverflowEffect="{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }"
      :pagination="
        fields.options.pagination
          ? {
              clickable: true,
            }
          : false
      "
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="(item, index) in fields.list" :key="index">
        <div class="slider-item">
          <img
            :src="
              item.img
                ? item.img
                : 'https://swiperjs.com/demos/images/nature-9.jpg'
            "
            alt=""
          />
          <div class="content">
            <h3>{{ item.title }}</h3>
            <p>{{ item.content }}</p>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { EffectCoverflow, Pagination, Navigation } from "swiper";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      modules: [EffectCoverflow, Pagination, Navigation],
    };
  },
  props: ["fields"],
};
</script>
