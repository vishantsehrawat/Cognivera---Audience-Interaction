const mongoose = require('mongoose');
// package so the we can use email schema type also install this package
// require('mongoose-type-email');

// timestamps for creation and updatin date 
const  chattingSchema = mongoose.Schema({
    name: { type: String, required: true },
    message: {type:String}
}, { versionKey: false, timestamps: true, expires: '120s' });




const ChattingModel = mongoose.model("chat", chattingSchema);

module.exports = { ChattingModel };
