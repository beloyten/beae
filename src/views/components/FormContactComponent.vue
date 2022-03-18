<template>
  <div class="form-contact-component">
    <form @submit.prevent="onSubmit">
      <div class="content" id="form-content">
        <div
          class="item"
          :class="item.type"
          :id="'item-' + index"
          :style="
            item.options.width > 50
              ? '--width: ' + item.options.width + '%; --gridColumn: 1/3'
              : '--width: ' + item.options.width * 2 + '%; --gridColumn: auto'
          "
          v-for="(item, index) in list"
          :key="index"
        >
          <div v-if="item.type === 'Text' || item.type === 'Email'">
            <label :for="'field-item-' + index"
              >{{ item.options.label }}
              <span v-if="item.options.required">*</span></label
            >
            <input
              :id="'field-item-' + index"
              :placeholder="item.options.placeholder"
              :type="item.type.toLowerCase()"
              :required="item.options.required"
              v-model="item.options.value"
            />
            <span class="description">{{ item.options.description }}</span>
          </div>
          <div v-else-if="item.type === 'Long Text'">
            <label :for="'field-item-' + index"
              >{{ item.options.label }}
              <span v-if="item.options.required">*</span></label
            >
            <textarea
              :id="'field-item-' + index"
              :placeholder="item.options.placeholder"
              :required="item.options.required"
              v-model="item.options.value"
            />
            <span class="description">{{ item.options.description }}</span>
          </div>
          <div v-else-if="item.type === 'Datetime'">
            <label :for="'field-item-' + index"
              >{{ item.options.label }}
              <span v-if="item.options.required">*</span></label
            >
            <input
              type="datetime-local"
              :id="'field-item-' + index"
              :required="item.options.required"
              v-model="item.options.value"
            />
            <span class="description">{{ item.options.description }}</span>
          </div>
          <div v-else-if="item.type === 'Select'">
            <label :for="'field-item-' + index"
              >{{ item.options.label }}
              <span v-if="item.options.required">*</span></label
            >
            <select
              :id="'field-item-' + index"
              :required="item.options.required"
              v-model="item.options.value"
            >
              <option
                v-for="(i, index) in item.options.options"
                :key="index"
                :value="i.value"
              >
                {{ i.text }}
              </option>
            </select>
            <span class="description">{{ item.options.description }}</span>
          </div>
          <div v-else-if="item.type === 'Checkbox'">
            <label :for="'field-item-' + index"
              >{{ item.options.label }}
              <span v-if="item.options.required">*</span></label
            >
            <div
              class="option"
              v-for="(i, position) in item.options.options"
              :key="position"
            >
              <input
                type="checkbox"
                :id="'checkbox-' + index + '' + position"
                :value="i.value"
                @change="selectOptions($event, index)"
              />
              <label :for="'checkbox-' + index + '' + position">{{
                i.text
              }}</label>
            </div>
            <span class="description">{{ item.options.description }}</span>
          </div>
          <div v-else-if="item.type === 'Radio'">
            <label :for="'field-item-' + index"
              >{{ item.options.label }}
              <span v-if="item.options.required">*</span></label
            >
            <div
              class="option"
              v-for="(i, position) in item.options.options"
              :key="position"
            >
              <input
                type="radio"
                :id="'radio-' + index + '' + position"
                :value="i.value"
                :name="'radio-' + index"
                :required="item.options.required"
                @change="selectOptions($event, index)"
              />
              <label :for="'radio-' + index + '' + position">{{
                i.text
              }}</label>
            </div>
            <span class="description">{{ item.options.description }}</span>
          </div>
        </div>
      </div>
      <div class="actions">
        <input type="submit" class="btn" value="Send message" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ["fields"],
  data() {
    return {
      list: [],
    };
  },
  methods: {
    onSubmit() {
      let check = true;
      this.list.forEach((item) => {
        if (item.type === "Checkbox" && item.options.required) {
          if (
            !item.options.listSelected ||
            (item.options.listSelected &&
              item.options.listSelected.length === 0)
          ) {
            check = false;
            alert("Please input required Checkbox!");
            return;
          }
        }
      });
      if (check) {
        this.showSuccessMsg();
      }
    },
    showSuccessMsg() {
      let message = "Submit successful!\n";
      this.list.forEach((item) => {
        if (item.type === "Checkbox" || item.type === "Radio") {
          message +=
            item.options.label +
            ": " +
            this.arrayToString(item.options.listSelected) +
            "\n";
        } else {
          message += item.options.label + ": " + item.options.value + "\n";
        }
      });
      alert(message);
    },
    arrayToString(array) {
      let string = "[ ";
      Object.keys(array).forEach((item, index) => {
        string += array[item];
        if (index !== Object.keys(array).length - 1) {
          string += ", ";
        }
      });
      string += " ]";
      return string;
    },
    selectOptions(e, index) {
      this.$store.commit("selecOptionFormContactComponentForm", {
        index: this.fields.index - 1,
        itemIndex: index,
        value: e.target.value,
      });
    },
  },
  created() {
    this.list = Object.assign([], this.fields.children);
  },
};
</script>
