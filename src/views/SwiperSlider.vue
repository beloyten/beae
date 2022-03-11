<template>
  <div class="page swiper-slider">
    <div class="left">
      <div class="config-swiper">
        <div>
          <label for="item-per-page">Items per page</label>
          <input id="item-per-page" type="number" v-model="itemPerPage" />
        </div>
        <div class="input-checkbox">
          <div>
            <input
              id="pagination-config"
              type="checkbox"
              v-model="pagination"
            />
            <label for="pagination-config">Pagination</label>
          </div>
          <div>
            <input
              id="navigation-config"
              type="checkbox"
              v-model="navigation"
            />
            <label for="navigation-config">Navigation</label>
          </div>
        </div>
        <div class="actions">
          <button @click="applyConfig">Apply</button>
          <button @click="resetConfig">Reset</button>
        </div>
      </div>
      <div class="items">
        <div class="list-item-title">
          <h4>Items</h4>
          <button @click="openFormAdd()">Add</button>
        </div>
        <div class="add-new" v-if="checkAddNew">
          <div class="title">Add new</div>
          <div class="item-content">
            <div>
              <label for="new-title">Title</label>
              <input id="new-title" type="text" v-model="itemTitle" />
            </div>
            <div>
              <label for="new-content">Content</label>
              <input id="new-content" type="text" v-model="itemContent" />
            </div>
            <div>
              <label for="new-image">Image</label>
              <input id="new-image" type="text" v-model="itemImg" />
            </div>
            <div class="item-actions">
              <button @click="addNewItem()">Apply</button>
              <button @click="cancelAdd()">Cancel</button>
            </div>
          </div>
        </div>
        <ul>
          <li
            v-for="(item, index) in slides"
            :class="selected === index ? 'active' : ''"
            :key="index"
          >
            <div class="title" @click="select(index)">
              {{ item.title }}
            </div>
            <div class="item-content" v-if="selected === index">
              <div>
                <label for="edit-title">Title</label>
                <input id="edit-title" type="text" v-model="itemTitle" />
              </div>
              <div>
                <label for="edit-content">Content</label>
                <input id="edit-content" type="text" v-model="itemContent" />
              </div>
              <div>
                <label for="edit-image">Image</label>
                <input id="edit-image" type="text" v-model="itemImg" />
              </div>
              <div class="item-actions">
                <button @click="changeItemContent(index)">Apply</button>
                <button @click="deleteItem(index)">Delete</button>
                <button @click="closeItemDetail()">Cancel</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="right">
      <swiper
        :effect="'coverflow'"
        :grabCursor="true"
        :spaceBetween="20"
        :navigation="navigationConfig"
        :centeredSlides="true"
        :slidesPerView="itemPerPageConfig"
        :coverflowEffect="{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }"
        :pagination="
          paginationConfig
            ? {
                clickable: true,
              }
            : false
        "
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide v-for="(item, index) in slides" :key="index">
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
      slides: [
        {
          img: "https://swiperjs.com/demos/images/nature-1.jpg",
          title: "The Title 1",
          content: "Content",
        },
        {
          img: "https://swiperjs.com/demos/images/nature-2.jpg",
          title: "The Title 2",
          content: "Content",
        },
        {
          img: "https://swiperjs.com/demos/images/nature-3.jpg",
          title: "The Title 3",
          content: "Content",
        },
        {
          img: "https://swiperjs.com/demos/images/nature-4.jpg",
          title: "The Title 4",
          content: "Content",
        },
        {
          img: "https://swiperjs.com/demos/images/nature-5.jpg",
          title: "The Title 5",
          content: "Content",
        },
        {
          img: "https://swiperjs.com/demos/images/nature-6.jpg",
          title: "The Title 6",
          content: "Content",
        },
        {
          img: "https://swiperjs.com/demos/images/nature-7.jpg",
          title: "The Title 7",
          content: "Content",
        },
        {
          img: "https://swiperjs.com/demos/images/nature-8.jpg",
          title: "The Title 8",
          content: "Content",
        },
        {
          img: "https://swiperjs.com/demos/images/nature-9.jpg",
          title: "The Title 9",
          content: "Content",
        },
      ],
      checkAddNew: false,
      itemTitle: "",
      itemContent: "",
      itemImg: "",
      selected: null,
      itemPerPage: 3,
      pagination: true,
      navigation: true,
      itemPerPageConfig: 3,
      paginationConfig: true,
      navigationConfig: true,
      modules: [EffectCoverflow, Pagination, Navigation],
    };
  },
  methods: {
    openFormAdd() {
      this.closeItemDetail();
      this.checkAddNew = true;
    },
    closeItemDetail() {
      this.selected = null;
      this.itemTitle = "";
      this.itemContent = "";
      this.itemImg = "";
    },
    addNewItem() {
      this.slides.push({
        img: this.itemImg,
        title: this.itemTitle,
        content: this.itemContent
      });
      this.cancelAdd();
    },
    cancelAdd() {
      this.closeItemDetail();
      this.checkAddNew = false;
    },
    select(index) {
      if (this.selected !== index) {
        this.cancelAdd();
        this.selected = index;
        this.itemTitle = this.slides[index].title;
        this.itemContent = this.slides[index].content;
        this.itemImg = this.slides[index].img;
      } else {
        this.closeItemDetail();
      }
    },
    changeItemContent(index) {
      this.slides[index].title = this.itemTitle;
      this.slides[index].content = this.itemContent;
      this.slides[index].img = this.itemImg;
      this.closeItemDetail();
    },
    deleteItem(index) {
      this.slides.splice(index, 1);
      this.closeItemDetail();
    },
    applyConfig() {
      if (this.itemPerPage < 1 || this.itemPerPage > this.slides.length) {
        alert("You must input item per page >= 1 and <=" + this.slides.length);
        this.itemPerPage = 3;
        this.pagination = true;
        this.navigation = true;
      } else {
        this.itemPerPageConfig = this.itemPerPage;
        this.paginationConfig = this.pagination;
        this.navigationConfig = this.navigation;
      }
    },
    resetConfig() {
      this.itemPerPage = 3;
      this.pagination = true;
      this.navigation = true;
      this.applyConfig();
    },
  },
};
</script>
