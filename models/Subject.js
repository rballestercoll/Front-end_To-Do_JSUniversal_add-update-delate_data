const { Schema, model } = require("mongoose");

const subjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dateStart: {
    type: String,
  },
  dateEnd: {
    type: String,
  },
  color: {
    type: String,
  },
  description: {
    type: String,
  },
  opinion: {
    type: String,
  },
  difficulty: {
    type: Number,
  },
  status: {
    type: String,
  }
});

module.exports = model("Subject", subjectSchema);