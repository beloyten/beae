<template>
  <div class="gallery">
    <div class="left">
      <div class="gap-column">
        <div>
          <label>Columns: </label>
          <input type="number" v-model="columns" />
        </div>
        <div>
          <label>Gap: </label>
          <input type="number" v-model="gap" />
        </div>
        <div class="actions">
          <button @click="applyCSS">Apply</button>
          <button @click="resetCSS">Reset</button>
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
              <label>Title: </label>
              <input type="text" v-model="itemTitle" />
            </div>
            <div>
              <label>Thumbnail: </label>
              <input type="text" v-model="itemThumbnail" />
            </div>
            <div>
              <label>Src: </label>
              <input type="text" v-model="itemSrc" />
            </div>
            <div class="item-actions">
              <button @click="addNewItem()">Apply</button>
              <button @click="cancelAdd()">Cancel</button>
            </div>
          </div>
        </div>
        <ul>
          <li
            v-for="(item, index) in sortItems"
            :class="selected === index ? 'active' : ''"
            :key="index">
            <div class="title" @click="select(index)">
              {{ item.title }}
            </div>
            <div class="item-content" v-if="selected === index">
              <div>
                <label>Title: </label>
                <input type="text" v-model="itemTitle"/>
              </div>
              <div>
                <label>Index: </label>
                <input type="number" v-model="itemIndex"/>
              </div>
              <div>
                <label>Thumbnail: </label>
                <input type="text" v-model="itemThumbnail"/>
              </div>
              <div>
                <label>Src: </label>
                <input type="text" v-model="itemSrc"/>
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
    <div class="right" id="grid-content">
      <div
        v-for="(item, index) in sortItems"
        class="item"
        :class="'item-' + (index + 1)"
        :key="index"
        @click="openImage(item)"
      >
        <img :src="item.src" alt="" />
      </div>
    </div>
    <LightBox v-if="openPopup" :item="selectedItem" v-model:openPopup="openPopup" />
  </div>
</template>

<script>
import LightBox from "./components/LightBox.vue";

export default {
  components: {
    LightBox
  },
  data() {
    return {
      items: [
        {
          src: "https://i.pinimg.com/564x/62/ed/6e/62ed6ea71018a57a3ab0c8c959d78cb0.jpg",
          title: "anh 01",
          thumbnail:
            "https://i.pinimg.com/564x/62/ed/6e/62ed6ea71018a57a3ab0c8c959d78cb0.jpg",
          index: 1,
        },
        {
          src: "https://i.pinimg.com/564x/62/ed/6e/62ed6ea71018a57a3ab0c8c959d78cb0.jpg",
          title: "anh 02",
          thumbnail:
            "https://i.pinimg.com/564x/62/ed/6e/62ed6ea71018a57a3ab0c8c959d78cb0.jpg",
          index: 2,
        },
        {
          src: "https://i.pinimg.com/564x/62/ed/6e/62ed6ea71018a57a3ab0c8c959d78cb0.jpg",
          title: "anh 03",
          thumbnail:
            "https://i.pinimg.com/564x/62/ed/6e/62ed6ea71018a57a3ab0c8c959d78cb0.jpg",
          index: 3,
        },
        {
          src: "https://hinhnen123.com/wp-content/uploads/2021/06/hinh-nen-dep.jpg",
          title: "anh 04",
          thumbnail:
            "https://i.pinimg.com/564x/62/ed/6e/62ed6ea71018a57a3ab0c8c959d78cb0.jpg",
          index: 4,
        },
        {
          src: "https://i.pinimg.com/564x/62/ed/6e/62ed6ea71018a57a3ab0c8c959d78cb0.jpg",
          title: "anh 05",
          thumbnail:
            "https://i.pinimg.com/564x/62/ed/6e/62ed6ea71018a57a3ab0c8c959d78cb0.jpg",
          index: 5,
        },
        {
          src: "https://i.pinimg.com/564x/62/ed/6e/62ed6ea71018a57a3ab0c8c959d78cb0.jpg",
          title: "anh 06",
          thumbnail:
            "https://i.pinimg.com/564x/62/ed/6e/62ed6ea71018a57a3ab0c8c959d78cb0.jpg",
          index: 6,
        },
        {
          src: "https://i.pinimg.com/564x/62/ed/6e/62ed6ea71018a57a3ab0c8c959d78cb0.jpg",
          title: "anh 07",
          thumbnail:
            "https://i.pinimg.com/564x/62/ed/6e/62ed6ea71018a57a3ab0c8c959d78cb0.jpg",
          index: 7,
        },
        {
          src: "https://i.pinimg.com/564x/62/ed/6e/62ed6ea71018a57a3ab0c8c959d78cb0.jpg",
          title: "anh 08",
          thumbnail:
            "https://i.pinimg.com/564x/62/ed/6e/62ed6ea71018a57a3ab0c8c959d78cb0.jpg",
          index: 8,
        }
      ],
      columns: 4,
      gap: 50,
      itemTitle: "",
      itemThumbnail: "",
      itemSrc: "",
      itemIndex: 0,
      selected: null,
      checkAddNew: false,
      selectedItem: {},
      openPopup: false,
    };
  },
  computed: {
    sortItems() {
      let newArrays = Object.assign([], this.items);
      for (let i = 0; i < newArrays.length - 1; i++) {
        for (let j = i + 1; j < newArrays.length; j++) {
          if (newArrays[i].index > newArrays[j].index) {
            let temp = newArrays[i];
            newArrays[i] = newArrays[j];
            newArrays[j]=temp;
          }
        }
      }
      return newArrays;
    },
  },
  methods: {
    select(index) {
      if (this.selected !== index) {
        this.selected = index;
        this.itemTitle = this.sortItems[index].title;
        this.itemThumbnail = this.sortItems[index].thumbnail;
        this.itemSrc = this.sortItems[index].src;
        this.itemIndex = this.sortItems[index].index;
      } else {
        this.closeItemDetail();
      }
    },
    applyCSS() {
      let gridContent = document.getElementById("grid-content");
      gridContent.style.gridTemplateColumns = "repeat(" + this.columns + ", 1fr)";
      gridContent.style.gap = this.gap + "px";
    },
    resetCSS() {
      this.columns = 4;
      this.gap = 50;
      this.applyCSS();
    },
    changeItemContent(index) {
      if (1 <= index && index <= this.items.length) {
        this.items[index].title = this.itemTitle;
        this.items[index].thumbnail = this.itemThumbnail;
        this.items[index].src = this.itemSrc;
        let indexChange = this.items[index].index;
        console.log(indexChange, this.itemIndex);
        this.items.forEach((item, i) => {
          if (i + 1 == this.itemIndex) {
            item.index = indexChange;
          } else if (i == index) {
            item.index = this.itemIndex;
          }
        });
        this.closeItemDetail();
      } else {
        alert('Index value must be between 1 and the length of the array');
      }
    },
    closeItemDetail() {
      this.selected = null;
      this.itemTitle = "";
      this.itemThumbnail = "";
      this.itemSrc = "";
      this.itemIndex = 0;
    },
    openFormAdd() {
      this.checkAddNew = true;
    },
    cancelAdd() {
      this.closeItemDetail();
      this.checkAddNew = false;
    },
    addNewItem() {
      this.items.push({
        src: this.itemSrc,
        title: this.itemTitle,
        thumbnail: this.itemThumbnail,
        index: this.items.length + 1,
      })
      this.cancelAdd();
    },
    deleteItem(index) {
      this.items.splice(index, 1);
      this.closeItemDetail();
    },
    openImage(item) {
      this.selectedItem = item;
      this.openPopup = true;
    },
  },
}
</script>