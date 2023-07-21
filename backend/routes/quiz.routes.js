const express = require("express");
const { QuizModel } = require("../models/quiz.model");
const { authMiddleware } = require("../middlewares/authMiddleware.middleware");
const quizRouter = express.Router();

quizRouter.use(express.json())

quizRouter.post('/add',authMiddleware, async (req, res) => {
    try {

        const newQuiz = new QuizModel({
            quiz: req.body
        });

        await newQuiz.save();

        res.status(200).send({ msg: 'quiz saved' });
    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
});


// to get all quizzes 

quizRouter.get('/get',authMiddleware, async (req, res) => {
    try {
        const quiz = await QuizModel.find();
        if (!quiz) {
            return res.status(404).send({ msg: 'Quiz not found' });
        }
        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
});


// to get quiz by id 

quizRouter.get('/get/:id',authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const quiz = await QuizModel.findById({ _id: id });
        if (!quiz) {
            return res.status(404).send({ msg: 'Quiz not found' });
        }
        res.status(200).send(quiz);
    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
});

//delete quiz by id 

quizRouter.get('/delete/:id',authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const quiz = await QuizModel.findByIdAndDelete({ _id: id });
        if (!quiz) {
            return res.status(404).send({ msg: 'Quiz not found' });
        }
        res.status(200).send({ msg: "quiz deleted" });
    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
});


module.exports = {
    quizRouter
}

