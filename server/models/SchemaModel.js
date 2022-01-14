const mongoose = require("mongoose");
const SchemaModel = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
});

const SchemaTemplate = mongoose.model("userData", SchemaModel);

module.exports = SchemaTemplate;
