const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  is_correct: {
    type: Boolean,
    default: false
  }
});

const QuestionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  options: [OptionSchema]
});

module.exports = mongoose.model('Question', QuestionSchema);
