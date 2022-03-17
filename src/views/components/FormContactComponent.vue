<template>
  <div class="form-contact-component">
    <form @submit.prevent="onSubmit">
      <div class="content" id="form-content">
        <div
          class="item"
          :class="item.type"
          :id="'item-' + index"
          v-for="(item, index) in list"
          :key="index"
        >
          <div v-if="item.type === 'Text' || item.type === 'Email'">
            <label :for="'field-item-' + index"
              >{{ item.label }} <span v-if="item.required">*</span></label
            >
            <input
              :id="'field-item-' + index"
              :placeholder="item.placeholder"
              :type="item.type.toLowerCase()"
              :required="item.required"
              v-model="item.value"
            />
            <span class="description">{{ item.description }}</span>
          </div>
          <div v-else-if="item.type === 'Long Text'">
            <label :for="'field-item-' + index"
              >{{ item.label }} <span v-if="item.required">*</span></label
            >
            <textarea
              :id="'field-item-' + index"
              :placeholder="item.placeholder"
              :required="item.required"
              v-model="item.value"
            />
            <span class="description">{{ item.description }}</span>
          </div>
          <div v-else-if="item.type === 'Datetime'">
            <label :for="'field-item-' + index"
              >{{ item.label }} <span v-if="item.required">*</span></label
            >
            <input
              type="datetime-local"
              :id="'field-item-' + index"
              :placeholder="item.placeholder"
              :required="item.required"
              v-model="item.value"
            />
            <span class="description">{{ item.description }}</span>
          </div>
          <div v-else-if="item.type === 'Select'">
            <label :for="'field-item-' + index"
              >{{ item.label }} <span v-if="item.required">*</span></label
            >
            <select
              :id="'field-item-' + index"
              :required="item.required"
              v-model="item.value"
            >
              <option
                v-for="(i, index) in item.options"
                :key="index"
                :value="i.value"
              >
                {{ i.text }}
              </option>
            </select>
            <span class="description">{{ item.description }}</span>
          </div>
          <div v-else-if="item.type === 'Checkbox'">
            <label :for="'field-item-' + index"
              >{{ item.label }} <span v-if="item.required">*</span></label
            >
            <div
              class="option"
              v-for="(i, position) in item.options"
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
            <span class="description">{{ item.description }}</span>
          </div>
          <div v-else-if="item.type === 'Radio'">
            <label :for="'field-item-' + index"
              >{{ item.label }} <span v-if="item.required">*</span></label
            >
            <div
              class="option"
              v-for="(i, position) in item.options"
              :key="position"
            >
              <input
                type="radio"
                :id="'radio-' + index + '' + position"
                :value="i.value"
                :name="'radio-' + index"
                :required="item.required"
                @change="selectOptions($event, index)"
              />
              <label :for="'radio-' + index + '' + position">{{
                i.text
              }}</label>
            </div>
            <span class="description">{{ item.description }}</span>
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
        if (item.type === "Checkbox" && item.required) {
          if (
            !item.listSelected ||
            (item.listSelected && item.listSelected.length === 0)
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
            item.label + ": " + this.arrayToString(item.listSelected) + "\n";
        } else {
          message += item.label + ": " + item.value + "\n";
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
  mounted() {
    this.fields.fields.list.forEach((item, index) => {
      let element = document.getElementById("item-" + index).style;
      if (item.width > 50) {
        element.gridColumn = "1/3";
        element.width = item.width + "%";
      } else {
        element.gridColumn = "auto";
        element.width = item.width * 2 + "%";
      }
    });
  },
  created() {
    this.list = Object.assign([], this.fields.fields.list);
  },
};
</script>
