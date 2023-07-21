const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const quizSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  uniqueQuizId: {
    type: String,
    default: uuidv4,
  },
  quiz: {
    creator: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    questions: [
      {
        title: {
          type: String,
          required: true
        },
        options: {
          //used array for multiple options 
          type: [String],
          required: true
        },
        correctOption: {
          // storing only single answer type quiz

          type: Number,
          required: true
        }
      }
    ],
    public: {
      type: Boolean,
      default: false,
    }
  },
  leaderboard: [
    {
      email: String,
      score: Number
    }
  ],

});

const QuizModel = mongoose.model('quiz', quizSchema);

module.exports = {
  QuizModel
};