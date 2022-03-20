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
              <li @click="setCreateType('Input Text')">Input Text</li>
              <li @click="setCreateType('Input Email')">Input Email</li>
              <li @click="setCreateType('Input Datetime')">Input Datetime</li>
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
                createType === 'Input Text' ||
                createType === 'Input Email' ||
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
            v-for="(item, index) in allItems"
            :class="selected === item.index ? 'active' : ''"
            :key="index"
          >
            <div class="title" @click="select(item.index, index)">
              {{ item.type }}
            </div>
            <div class="item-content" v-show="selected === item.index">
              <div v-if="item.type !== 'Button'">
                <label for="edit-label">Label</label>
                <input id="edit-label" type="text" v-model="formEdit.label" />
              </div>
              <div
                v-if="
                  item.type === 'Input Text' ||
                  item.type === 'Input Email' ||
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
              <div v-if="item.type !== 'Button'">
                <label for="edit-description">Description</label>
                <textarea
                  id="edit-description"
                  v-model="formEdit.description"
                />
                <span>Description about the field</span>
              </div>
              <div class="required" v-if="item.type !== 'Button'">
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
                  <button @click="addOptions(formEdit)">Add</button>
                </div>
                <div class="options-content">
                  <div v-for="(i, position) in formEdit.options" :key="position">
                    <div class="title-option">
                      <h4>Option {{ position + 1 }}</h4>
                      <button @click="deleteOption(position, formEdit)">
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
              <div v-if="item.type === 'Button'">
                <label for="edit-label">Text</label>
                <input id="edit-label" type="text" v-model="formEdit.text" />
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
                    @input="onUpdateWidth($event, item.index)"
                  />
                  <output :id="'output-value-edit-' + item.index">50 %</output>
                </div>
              </div>
              <div class="item-actions">
                <button @click="changeItemContent(index)">Apply</button>
                <button @click="deleteItem(item.index)" v-if="item.type !== 'Button'">Delete</button>
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
            :id="'item-' + item.index"
            :style="
              item.liquidData.width > 50
                ? '--width: ' + item.liquidData.width + '%; --gridColumn: 1/3'
                : '--width: ' + item.liquidData.width * 2 + '%; --gridColumn: auto'
            "
            v-for="(item, index) in list"
            :key="index"
          >
            <div v-if="item.type === 'Input Text' || item.type === 'Input Email'">
              <label :for="'field-item-' + index"
                >{{ item.liquidData.label }}
                <span v-if="item.liquidData.required">*</span></label
              >
              <input
                :id="'field-item-' + index"
                :placeholder="item.liquidData.placeholder"
                :type="item.type.toLowerCase()"
                :required="item.liquidData.required"
                v-model="item.liquidData.value"
              />
              <span class="description">{{ item.liquidData.description }}</span>
            </div>
            <div v-else-if="item.type === 'Long Text'">
              <label :for="'field-item-' + index"
                >{{ item.liquidData.label }} <span v-if="item.liquidData.required">*</span></label
              >
              <textarea
                :id="'field-item-' + index"
                :placeholder="item.liquidData.placeholder"
                :required="item.liquidData.required"
                v-model="item.liquidData.value"
              />
              <span class="description">{{ item.liquidData.description }}</span>
            </div>
            <div v-else-if="item.type === 'Input Datetime'">
              <label :for="'field-item-' + index"
                >{{ item.liquidData.label
                }}<span v-if="item.liquidData.required">*</span></label
              >
              <input
                type="datetime-local"
                :id="'field-item-' + index"
                :required="item.liquidData.required"
                v-model="item.liquidData.value"
              />
              <span class="description">{{ item.liquidData.description }}</span>
            </div>
            <div v-else-if="item.type === 'Select'">
              <label :for="'field-item-' + index"
                >{{ item.liquidData.label }}
                <span v-if="item.liquidData.required">*</span></label
              >
              <select
                :id="'field-item-' + index"
                :required="item.liquidData.required"
                v-model="item.liquidData.value"
              >
                <option
                  v-for="(i, index) in item.liquidData.options"
                  :key="index"
                  :value="i.value"
                >
                  {{ i.text }}
                </option>
              </select>
              <span class="description">{{ item.liquidData.description }}</span>
            </div>
            <div v-else-if="item.type === 'Checkbox'">
              <label :for="'field-item-' + index"
                >{{ item.liquidData.label }}
                <span v-if="item.liquidData.required">*</span></label
              >
              <div
                class="option"
                v-for="(i, position) in item.liquidData.options"
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
              <span class="description">{{ item.liquidData.description }}</span>
            </div>
            <div v-else-if="item.type === 'Radio'">
              <label :for="'field-item-' + index"
                >{{ item.liquidData.label }}
                <span v-if="item.liquidData.required">*</span></label
              >
              <div
                class="option"
                v-for="(i, position) in item.liquidData.options"
                :key="position"
              >
                <input
                  type="radio"
                  :id="'radio-' + index + '' + position"
                  :value="i.value"
                  :name="'radio-' + index"
                  :required="item.liquidData.required"
                  v-model="item.liquidData.value"
                />
                <label :for="'radio-' + index + '' + position">{{
                  i.text
                }}</label>
              </div>
              <span class="description">{{ item.liquidData.description }}</span>
            </div>
          </div>
        </div>
        <div class="actions">
          <div v-for="(item, index) in buttons" :key="index" id="button-submit">
            <input type="submit" class="btn" :value="item.liquidData.text" />
          </div>
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
      formEdit: {},
      checkAddNew: false,
      selected: null,
      showAddList: false,
      createType: null,
      list: [],
    };
  },
  created() {
    this.list = Object.assign([], this.fields);
  },
  computed: {
    fields() {
      return this.$store.getters.getFormContactItems;
    },
    buttons() {
      return this.$store.getters.getFormContactButtons;
    },
    allItems() {
      return this.fields.concat(this.buttons);
    }
  },
  methods: {
    select(itemIndex, index) {
      if (this.selected !== itemIndex) {
        this.closeAdd();
        this.formEdit = Object.assign({}, this.allItems[index].liquidData);
        this.selected = itemIndex;
        document.getElementById("output-value-edit-" + itemIndex).innerHTML =
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
      this.formEdit = {};
    },
    addItem() {
      this.showAddList = true;
    },
    cancelAdd() {
      this.showAddList = false;
    },
    setCreateType(string) {
      if (string === "Input Text" || string === "Input Email" || string === "Long Text") {
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
      this.form.type = string;
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
      // this.form.type = this.createType;
      this.form.width = document.getElementById("form-width").value;
      if (this.createType === "Checkbox") {
        this.form.listSelected = [];
      } else {
        this.form.value = "";
      }
      this.form.index = this.allItems.length + 1;
      this.$store.commit("addFormContactItem", {
        liquidData: this.form,
        type: this.createType,
        index: this.allItems.length + 1,
      });
      this.list.push({
        liquidData: this.form,
        type: this.createType,
        index: this.allItems.length + 1,
      });
      this.closeAdd();
    },
    changeItemContent(index) {
      this.formEdit.width = document.getElementById("edit-width-" + index).value;
      this.$store.commit("changeFormContactItem", {
        index: this.allItems[index].type === "Button" ? 0 : index,
        type: this.allItems[index].type,
        formEdit: this.formEdit,
      });
      if (this.allItems[index].type !== "Button") {
        this.list[index] = Object.assign({}, this.fields[index]);
      }
      console.log(this.list);
      this.closeItemDetail();
    },
    deleteItem(index) {
      this.$store.commit("deleteFormContactItem", index);
      this.list = Object.assign([], this.fields);
      this.closeItemDetail();
    },
    onUpdateWidth(e, index) {
      let width = e.target.value;
      document.getElementById("output-value-edit-" + this.selected).innerHTML =
        width + "%";
      if (this.allItems[index].type !== "Button") {
        let element = document.getElementById("item-" + this.selected).style;
        if (width > 50) {
          element.gridColumn = "1/3";
          element.width = width + "%";
        } else {
          element.gridColumn = "auto";
          element.width = width * 2 + "%";
        }
      } else {
        document.getElementById("button-submit").style.width = width + "%";
      }
    },
    onSubmit(e) {
      e.preventDefault();
      let check = true;
      this.list.forEach((item) => {
        if (item.type === "Checkbox" && item.liquidData.required) {
          if (
            !item.liquidData.listSelected ||
            (item.liquidData.listSelected && item.liquidData.listSelected.length === 0)
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
      let value = e.target.value;
      if (!this.list[index].liquidData.listSelected) {
        this.list[index].liquidData.listSelected = [];
        this.list[index].liquidData.listSelected.push(value);
      } else {
        let i = -1;
        this.list[index].liquidData.listSelected.forEach(
          (item, position) => {
            if (item === value) {
              i = position;
            }
          }
        );
        if (i !== -1) {
          this.list[index].liquidData.listSelected.splice(i, 1);
        } else {
          this.list[index].liquidData.listSelected.push(value);
        }
      }
    },
    showSuccessMsg() {
      let message = "Submit successful!\n";
      this.list.forEach((item) => {
        if (item.type === "Checkbox") {
          message +=
            item.liquidData.label + ": " + this.arrayToString(item.liquidData.listSelected) + "\n";
        } else {
          message += item.liquidData.label + ": " + item.liquidData.value + "\n";
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
