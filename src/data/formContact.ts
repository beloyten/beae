export default [
  {
    children: [],
    options: {
      label: "Your name",
      placeholder: "Your name",
      description: "",
      required: true,
      width: 50,
      value: "",
    },
    type: "Text",
    index: 1,
  },
  {
    children: [],
    options: {
      label: "Your Email",
      placeholder: "Email",
      description: "",
      required: true,
      width: 50,
      value: "",
    },
    type: "Email",
    index: 2,
  },
  {
    children: [],
    options: {
      label: "Time",
      description: "",
      required: true,
      width: 50,
      value: "",
    },
    type: "Datetime",
    index: 3,
  },
  {
    children: [],
    options: {
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
    index: 4,
  },
  {
    children: [],
    options: {
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
    index: 5,
  },
  {
    children: [],
    options: {
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
    index: 6,
  },
  {
    children: [],
    options: {
      label: "Your message",
      placeholder: "Your message",
      description: "",
      required: true,
      width: 100,
      value: "",
    },
    type: "Long Text",
    index: 7,
  },
];
