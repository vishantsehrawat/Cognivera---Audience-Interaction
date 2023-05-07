const mongoose =  require("mongoose")

const  RatingSchema =  new mongoose.Schema({

    rating : {type:Number, requied :true}

})


const ratingModel = mongoose.model("rating", RatingSchema)

module.exports =  {ratingModel}