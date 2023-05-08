const express = require("express");
require("dotenv").config();

const wordPollRouter = express();
wordPollRouter.use(express.json());

// create word poll question 

// define a route for saving a new word cloud question
// wordPollRouter.post('/questions', (req, res) => {
  

//     // TODO: save the new question to your database or data store
//     // ...

//     // send a response with the saved question object
//     res.status(201).json(newQuestion);
// });






module.exports = {
    wordPollRouter
}
