const mongoose = require('mongoose');
// package so the we can use email schema type also install this package
// require('mongoose-type-email');

// timestamps for creation and updatin date 
const  chattingSchema = mongoose.Schema({
    name: { type: String },
    message: {type:String}
}, { versionKey: false, timestamps: true, expires: '120s' });// expires is working but ttl cycle is of 60 seconds so , it takes more time to expire




const ChattingModel = mongoose.model("chat", chattingSchema);

module.exports = { ChattingModel };

// createdAt: { type: Date, expires: '2m', default: Date.now }