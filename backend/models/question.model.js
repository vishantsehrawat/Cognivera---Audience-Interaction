const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  option: {
    type: String,
    required: true
  },
  is_correct: {
    type: Boolean,
    default: false
  }
});

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: [optionSchema]
});

const QuestionModel = mongoose.model('question', questionSchema);

module.exports ={
  QuestionModel
}
