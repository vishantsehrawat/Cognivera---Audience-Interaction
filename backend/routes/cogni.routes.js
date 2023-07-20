const express = require("express");
const { v4: uuidv4 } = require('uuid');
const { CogniModel } = require("../models/congni.model");

const cogniRouter = express.Router();
cogniRouter.use(express.json())

// save congni
cogniRouter.post('/add', async (req, res) => {
    try {
        // Extract data from the request body
        let { start_date, end_date, name, unique_id } = req.body;
        unique_id = uuidv4();

        // Create a new Cogni document
        const newCogni = new CogniModel({
            start_date,
            end_date,
            name,
            unique_id,
        });

        // Save the Cogni document to the database
        await newCogni.save();

        res.status(201).json(newCogni);
    } catch (error) {
        console.error('Error saving Cogni:', error);
        res.status(500).json({ error: 'Failed to save Cogni' });
    }
});

//get congni
cogniRouter.get('/get', async (req, res) => {
    try {
        const allCogni = await CogniModel.find();

        res.status(200).json(allCogni);
    } catch (error) {
        console.error('Error getting Cogni:', error);
        res.status(500).json({ error: 'Failed to get Cogni' });
    }
});


module.exports = {
    cogniRouter
}

