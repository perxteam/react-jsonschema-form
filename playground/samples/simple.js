module.exports = {
  schema: {
    title: "A registration form",
    description: "A simple form example.",
    type: "object",
//    required: ["firstName", "lastName", "checkbox", "phone"],
//    required: ["lastName", "checkbox", "phone", "datetime"],
    properties: {
      firstName: {
        type: "string",
        title: "First name",
        minLength: 5,
      },
      lastName: {
        type: "string",
        title: "Last name",
      },
      button1: {
        type: "string",
        title: "Submit",
      },
    }
  },
  uiSchema: {
    firstName: {
      "ui:autofocus": true,
      "ui:inputClassNames": "input-lalala"
    },
    button1: {
      "ui:widget": "button",
      "ui:type": "submit",
    },
  },
  formData: {
  }
};
