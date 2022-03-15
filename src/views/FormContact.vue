<template>
  <div class="page form-contact">
    <div class="left">
      <div class="items">
        <div class="list-item-title">
          <h4>Items</h4>
          <button @click="addItem()">Add</button>
          <div class="add-list" :class="showAddList ? 'show' : ''">
            <span @click="cancelAdd()">x</span>
            <ul>
              <li @click="setCreateType('Text')">Text</li>
              <li @click="setCreateType('Email')">Email</li>
              <li @click="setCreateType('Datetime')">Datetime</li>
              <li @click="setCreateType('Select')">Select</li>
              <li @click="setCreateType('Checkbox')">Checkbox</li>
              <li @click="setCreateType('Radio')">Radio</li>
              <li @click="setCreateType('Long Text')">Long Text</li>
            </ul>
          </div>
        </div>
        <div class="add-new" v-show="checkAddNew">
          <div class="title">Add new {{ createType }}</div>
          <div class="item-content">
            <div>
              <label for="form-label">Label</label>
              <input id="form-label" type="text" v-model="form.label" />
            </div>
            <div
              v-if="
                createType === 'Text' ||
                createType === 'Email' ||
                createType === 'Long Text'
              "
            >
              <label for="form-placeholder">Placeholder</label>
              <input
                id="form-placeholder"
                type="text"
                v-model="form.placeholder"
              />
            </div>
            <div>
              <label for="form-description">Description</label>
              <textarea id="form-description" v-model="form.description" />
              <span>Description about the field</span>
            </div>
            <div class="required">
              <label for="form-required">Required</label>
              <input
                id="form-required"
                type="checkbox"
                v-model="form.required"
              />
            </div>
            <div
              class="options"
              v-if="
                createType === 'Select' ||
                createType === 'Checkbox' ||
                createType === 'Radio'
              "
            >
              <div class="label">
                <label>Options</label>
                <button @click="addOptions(form)">Add</button>
              </div>
              <div class="options-content">
                <div v-for="(item, index) in form.options" :key="index">
                  <div class="title-option">
                    <h4>Option {{ index + 1 }}</h4>
                    <button @click="deleteOption(index, form)">Delete</button>
                  </div>
                  <div>
                    <label>Text</label>
                    <input type="text" v-model="item.text" />
                  </div>
                  <div>
                    <label>Value</label>
                    <input type="text" v-model="item.value" />
                  </div>
                </div>
              </div>
            </div>
            <div class="field-width">
              <label for="form-width">Field width</label>
              <div class="slider">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value="50"
                  id="form-width"
                  oninput="this.nextElementSibling.value = this.value + ' %'"
                />
                <output id="output-value">50 %</output>
              </div>
            </div>
            <div class="item-actions">
              <button @click="addNewItem()">Apply</button>
              <button @click="closeAdd()">Cancel</button>
            </div>
          </div>
        </div>
        <ul>
          <li
            v-for="(item, index) in fields"
            :class="selected === index ? 'active' : ''"
            :key="index"
          >
            <div class="title" @click="select(index)">
              {{ item.type }}
            </div>
            <div class="item-content" v-show="selected === index">
              <div>
                <label for="edit-label">Label</label>
                <input id="edit-label" type="text" v-model="formEdit.label" />
              </div>
              <div
                v-if="
                  item.type === 'Text' ||
                  item.type === 'Email' ||
                  item.type === 'Long Text'
                "
              >
                <label for="edit-placeholder">Placeholder</label>
                <input
                  id="edit-placeholder"
                  type="text"
                  v-model="formEdit.placeholder"
                />
              </div>
              <div>
                <label for="edit-description">Description</label>
                <textarea
                  id="edit-description"
                  v-model="formEdit.description"
                />
                <span>Description about the field</span>
              </div>
              <div class="required">
                <label for="edit-required">Required</label>
                <input
                  id="edit-required"
                  type="checkbox"
                  v-model="formEdit.required"
                />
              </div>
              <div
                class="options"
                v-if="
                  item.type === 'Select' ||
                  item.type === 'Checkbox' ||
                  item.type === 'Radio'
                "
              >
                <div class="label">
                  <label>Options</label>
                  <button @click="addOptions(item)">Add</button>
                </div>
                <div class="options-content">
                  <div v-for="(i, position) in item.options" :key="position">
                    <div class="title-option">
                      <h4>Option {{ position + 1 }}</h4>
                      <button @click="deleteOption(position, item)">
                        Delete
                      </button>
                    </div>
                    <div>
                      <label>Text</label>
                      <input type="text" v-model="i.text" />
                    </div>
                    <div>
                      <label>Value</label>
                      <input type="text" v-model="i.value" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="field-width">
                <label for="edit-width">Field width</label>
                <div class="slider">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value="50"
                    :id="'edit-width-' + index"
                    @input="onUpdateWidth"
                  />
                  <output :id="'output-value-edit-' + index">50 %</output>
                </div>
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
      <form @submit="onSubmit">
        <div class="content" id="form-content">
          <div
            class="item"
            :class="item.type"
            :id="'item-' + index"
            v-for="(item, index) in fields"
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        label: "",
        description: "",
        required: false,
        width: 0,
      },
      formEdit: {
        label: "",
        description: "",
        required: false,
        width: 0,
      },
      checkAddNew: false,
      selected: null,
      showAddList: false,
      createType: null,
    };
  },
  computed: {
    fields() {
      return this.$store.getters.getFormContactList;
    },
  },
  methods: {
    select(index) {
      console.log(this.fields[index]);
      if (this.selected !== index) {
        this.closeAdd();
        this.formEdit = Object.assign([], this.fields[index]);
        this.selected = index;
        document.getElementById("output-value-edit-" + index).innerHTML =
          this.formEdit.width + " %";
        document.getElementById("edit-width-" + index).value =
          this.formEdit.width;
      } else {
        this.closeItemDetail();
      }
    },
    closeAdd() {
      this.checkAddNew = false;
      this.showAddList = false;
      this.createType = null;
      this.form = {
        label: "",
        fieldName: "",
        description: "",
        required: false,
        width: 0,
      };
    },
    closeItemDetail() {
      this.selected = null;
      this.formEdit = {
        label: "",
        placeholder: "",
        fieldName: "",
        description: "",
        required: false,
        width: 0,
      };
    },
    addItem() {
      this.showAddList = true;
    },
    cancelAdd() {
      this.showAddList = false;
    },
    setCreateType(string) {
      if (string === "Text" || string === "Email" || string === "Long Text") {
        this.form.placeholder = "";
        if (string === "Long Text") {
          document.getElementById("output-value").innerHTML = "100 %";
          document.getElementById("form-width").value = 100;
        }
      } else if (
        string === "Select" ||
        string === "Checkbox" ||
        string === "Radio"
      ) {
        this.form.options = [
          {
            text: "The Title 1",
            value: "The value 1",
          },
        ];
      }
      this.createType = string;
      this.closeItemDetail();
      this.showAddList = false;
      this.checkAddNew = true;
    },
    addOptions(list) {
      list.options.push({
        text: "The Title " + (list.options.length + 1),
        value: "The Value " + (list.options.length + 1),
      });
    },
    deleteOption(index, list) {
      list.options.splice(index, 1);
    },
    addNewItem() {
      this.form.type = this.createType;
      this.form.width = document.getElementById("form-width").value;
      if (this.createType === "Checkbox" || this.createType === "Radio") {
        this.form.listSelected = [];
      } else {
        this.form.value = "";
      }
      this.$store.commit("addFormContactItem", this.form);
      this.closeAdd();
    },
    changeItemContent(index) {
      this.$store.commit("changeFormContactItemContent", {
        index: index,
        formEdit: this.formEdit,
        width: document.getElementById("edit-width-" + index).value,
      });
      this.closeItemDetail();
    },
    deleteItem(index) {
      this.$store.commit("deleteFormContactItem", index);
    },
    onUpdateWidth(e) {
      let width = e.target.value;
      let element = document.getElementById("item-" + this.selected).style;
      document.getElementById("output-value-edit-" + this.selected).innerHTML =
        width + "%";
      if (width > 50) {
        element.gridColumn = "1/3";
        element.width = width + "%";
      } else {
        element.gridColumn = "auto";
        element.width = width * 2 + "%";
      }
    },
    onSubmit(e) {
      e.preventDefault();
      let check = true;
      this.fields.forEach((item) => {
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
    selectOptions(e, index) {
      this.$store.commit("selecOptionFormContact", {
        index: index,
        value: e.target.value,
      });
    },
    showSuccessMsg() {
      let message = "Submit successful!\n";
      this.fields.forEach((item) => {
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
  },
};
</script>
