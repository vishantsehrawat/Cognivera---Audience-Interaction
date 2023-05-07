const express = require("express");
const { QuestionModel } = require("../models/question.model");

const createQuestionRouter = express();
createQuestionRouter.use(express.json())


// submit question to mongodb
createQuestionRouter.post('/submit-question',authMiddleware, async (req, res) => {
    try {
        const { question, options } = req.body;
        // // console.log("🚀 ~ file: createQuestion.routes.js:38 ~ createQuestionRouter.post ~ req.body:", req.body)

        const newQuestion = new QuestionModel({
            question: question,
            options: [
                { option: options[0].option, is_correct: options[0].is_correct },
                { option: options[1].option, is_correct: options[1].is_correct },
                { option: options[2].option, is_correct: options[2].is_correct },
                { option: options[3].option, is_correct: options[3].is_correct },
            ],
        });
        // // console.log("🚀 ~ file: createQuestion.routes.js:49 ~ createQuestionRouter.post ~ newQuestion:", newQuestion)
        let queSearch = await QuestionModel.findOne({question:newQuestion.question})
        // console.log("🚀 ~ file: createQuestion.routes.js:51 ~ createQuestionRouter.post ~ queSearch:", queSearch)
        if (queSearch) {
            res.send({ msg: "question already added " })
        }
        else {
            const savedQuestion = await newQuestion.save();
            res.json({ message: 'Question saved successfully', question: savedQuestion });
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send({error,message: 'An error occurred while saving the question' });
    }
});

// get question by id 
createQuestionRouter.get('/get-question/:id',authMiddleware, async (req, res) => {
  // console.log(req.params)
    try {
      const question = await QuestionModel.findById(req.params.id);
      // console.log("🚀 ~ file: createQuestion.routes.js:69 ~ createQuestionRouter.get ~ question:", question)
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
      res.json({msg:"question Found",question});
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// get all questions
createQuestionRouter.get('/get-all-questions',authMiddleware, async (req, res) => {
  try {
    const questions = await QuestionModel.find({});
    if (!questions) {
      return res.status(404).json({ message: 'No questions found' });
    }
    res.json({msg:"Questions Found",questions});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



module.exports = { createQuestionRouter }