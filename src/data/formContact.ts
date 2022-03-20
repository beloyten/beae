export default {
  items: [
    {
      liquidData: {
        label: "Your name",
        placeholder: "Your name",
        description: "",
        required: true,
        width: 50,
        value: "",
      },
      type: "Input Text",
      index: 0,
    },
    {
      liquidData: {
        label: "Your email",
        placeholder: "Email",
        description: "",
        required: true,
        width: 50,
        value: "",
      },
      type: "Input Email",
      index: 1,
    },
    {
      liquidData: {
        label: "Time",
        description: "",
        required: true,
        width: 50,
        value: "",
      },
      type: "Input Datetime",
      index: 2,
    },
    {
      liquidData: {
        label: "Select",
        description: "",
        required: true,
        width: 50,
        options: [
          {
            text: "The Title 1",
            value: "The value 1",
          },
          {
            text: "The Title 2",
            value: "The value 2",
          },
        ],
        value: "",
      },
      type: "Select",
      index: 3,
    },
    {
      liquidData: {
        label: "Checkbox",
        description: "",
        required: true,
        width: 50,
        options: [
          {
            text: "The Title 1",
            value: "The value 1",
          },
          {
            text: "The Title 2",
            value: "The value 2",
          },
        ],
        listSelected: [],
      },
      type: "Checkbox",
      index: 4,
    },
    {
      liquidData: {
        label: "Radio",
        description: "",
        required: true,
        width: 50,
        options: [
          {
            text: "The Title 1",
            value: "The value 1",
          },
          {
            text: "The Title 2",
            value: "The value 2",
          },
        ],
        listSelected: [],
      },
      type: "Radio",
      index: 5,
    },
    {
      liquidData: {
        label: "Your message",
        placeholder: "Your message",
        description: "",
        required: true,
        width: 100,
        value: "",
      },
      type: "Long Text",
      index: 6,
    },
  ],
  buttons: [
    {
      liquidData: {
        text: "Send message",
        width: 20,
      },
      type: "Button",
      index: 7,
    },
  ],
  type: "Form Contact",
  index: 0,
}