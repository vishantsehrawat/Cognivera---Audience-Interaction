const express = require("express");
const { v4: uuidv4 } = require('uuid');
const { CogniModel } = require("../models/congni.model");
const { authMiddleware } = require("../middlewares/authMiddleware.middleware");

const cogniRouter = express.Router();
cogniRouter.use(express.json())

// save congni
cogniRouter.post('/add', authMiddleware, async (req, res) => {
    const newCogni = req.body;
    try {
        newCogni.cogniUniqueId = uuidv4();
        console.log("🚀 ~ file: cogni.routes.js:14 ~ cogniRouter.post ~ newCogni:", newCogni)
        const Cogni = new CogniModel(req.body);
        await Cogni.save();
        res.status(201).json(newCogni);
    } catch (error) {
        console.error('Error saving Cogni:', error);
        res.status(500).json(error.message);
    }
});

//get congni
cogniRouter.get('/get', authMiddleware, async (req, res) => {
    try {
        const allCogni = await CogniModel.find().populate('quizzes');
        res.status(200).json(allCogni);
    } catch (error) {
        console.error('Error getting Cogni:', error);
        res.status(500).json({ error: 'Failed to get Cogni' });
    }
});
// get public cogni 

cogniRouter.get('/getPublicCogni/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const cogni = await CogniModel.findOne({ cogniUniqueId: id }).populate({
            path: 'quizzes',
            match: { public: true }
        });
        console.log("🚀 ~ file: cogni.routes.js:48 ~ cogni ~ cogni:", cogni)
        res.status(200).json(cogni);
    } catch (error) {
        console.error('Error getting Cogni:', error);
        res.status(500).json({ error: 'Failed to get Cogni' });
    }
});

module.exports = {
    cogniRouter
}

