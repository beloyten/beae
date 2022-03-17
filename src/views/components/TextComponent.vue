<template>
  <div class="text-component">
    <label
      >{{ options.label
      }}<span class="required" v-if="options.required">*</span></label
    >
    <input id="text" type="text" :placeholder="options.placeholder" />
    <span>{{ options.description }}</span>
  </div>
</template>

<script>
export default {
  props: ["fields"],
  data() {
    return {
      options: {},
    };
  },
  created() {
    this.options = Object.assign({}, this.fields.fields.list[0]);
  },
};
</script>
