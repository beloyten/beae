<template>
  <div class="page component-form">
    <div class="left">
      <div class="items">
        <div class="list-item-title">
          <ul>
            <li>Navigator</li>
            <li class="active">Elements</li>
          </ul>
        </div>
        <div class="item-content">
          <div class="button" id="gallery" draggable="true" @dragstart="drag">
            Gallery
          </div>
          <div
            class="button"
            id="contact-form"
            draggable="true"
            @dragstart="drag"
          >
            Contact Form
          </div>
          <div class="button" id="slider" draggable="true" @dragstart="drag">
            Slider
          </div>
          <div
            class="button"
            id="group-fields"
            draggable="true"
            @dragstart="drag"
          >
            Group Fields
          </div>
          <div class="button" id="text" draggable="true" @dragstart="drag">
            Text
          </div>
          <div class="button" id="textarea" draggable="true" @dragstart="drag">
            Textarea
          </div>
          <div
            class="button"
            id="image-upload"
            draggable="true"
            @dragstart="drag"
          >
            Image Upload
          </div>
        </div>
      </div>
    </div>
    <div class="right" id="div" @drop.prevent="drop" @dragover.prevent></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    drag(e) {
      e.dataTransfer.setData("text", e.target.id);
    },
    drop(e) {
      e.target.appendChild(document.getElementById("gallery-component"));
    },
  },
};
</script>
