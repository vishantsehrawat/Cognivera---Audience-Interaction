const express = require("express");
const { ratingModel } = require("../models/rating.model");

const RatingRouter = express();
RatingRouter.use(express.json())


RatingRouter.post("/add-rating", async(req,res) => {

    try {
        const {ratingvalue}=  req.body;
        const rating = new ratingModel(ratingvalue)
         await rating.save()
         res.send({"msg": "rating added"})

    }catch(err) {
        console.log(err.message)
    }
})

RatingRouter.get("/get-rating",async(req,res) => {
    try {
        const rating = await ratingModel.findById(req.params.id);
        
        if (!rating) {
          return res.status(404).json({ message: 'rating not exits' });
        }
        res.json({msg:"rating found",rating});
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
})

module.exports = {RatingRouter}