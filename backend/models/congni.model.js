const mongoose = require('mongoose');

const cogniSchema = new mongoose.Schema({
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
  unique_id: {
    type: String,
    unique: true,
    required: true
  },
});

// Cogni Model
const CogniModel = mongoose.model('cogni', cogniSchema);

module.exports = {
  CogniModel
};
