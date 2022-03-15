export default [
  {
    label: "Your name",
    placeholder: "Your name",
    description: "",
    required: true,
    width: 50,
    type: "Text",
    value: "",
  },
  {
    label: "Your Email",
    placeholder: "Email",
    description: "",
    required: true,
    width: 50,
    type: "Email",
    value: "",
  },
  {
    label: "Time",
    description: "",
    required: true,
    width: 50,
    type: "Datetime",
    value: "",
  },
  {
    label: "Select",
    description: "",
    required: true,
    width: 50,
    type: "Select",
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
  {
    label: "Checkbox",
    description: "",
    required: true,
    width: 50,
    type: "Checkbox",
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
  {
    label: "Radio",
    description: "",
    required: true,
    width: 50,
    type: "Radio",
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
  {
    label: "Your message",
    placeholder: "Your message",
    description: "",
    required: true,
    width: 100,
    type: "Long Text",
    value: "",
  },
];
