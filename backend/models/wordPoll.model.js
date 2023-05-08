const mongoose = require("mongoose")

const wordCloudSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    uuid: {
        type: String,
        required: true,
    },
    wordCloud: [{
        word: {
            type: String,
            required: true,
        },
        frequency: {
            type: Number,
            required: true,
            default: 1,
        },
    }],
});

const wordCloudModel = mongoose.model('wordCloud', wordCloudSchema);

module.exports = { wordCloudModel };