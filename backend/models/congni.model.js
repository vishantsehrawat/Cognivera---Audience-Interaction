const mongoose = require('mongoose');
const { QuizModel } = require('./quiz.model');


const cogniSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  cogniUniqueId: {
    type: String,
    unique: true,
    required: true,
  },
  quizzes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'quiz'
    }
  ]
}, {
  // expires: 'end_date'
});
// cogniSchema.index({ end_date: 1 }, { expires: 'end_date' });
// Cogni Model
const CogniModel = mongoose.model('mycogni', cogniSchema);

module.exports = {
  CogniModel
};
