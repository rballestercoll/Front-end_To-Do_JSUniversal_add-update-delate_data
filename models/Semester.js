const { Schema, model } = require("mongoose");

const semestreSchema = new Schema({
  numSemester: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
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
  }
});

module.exports = model("Semestre", semestreSchema);