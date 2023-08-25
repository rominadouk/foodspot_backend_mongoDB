const mongoose = require('mongoose')

const foodSpotSchema = new mongoose.Schema(
    {
        restaurantName: {type: String, required: true},
        city: {type: String, required: true},
        state: {type: String, required: true},
        cuisine: {type: String, required: true},
        price: {type: String, required: true},
        serviceRating: Number,
        ambianceRating: Number, 
        experience: {type: String, required: true},
        tips: [String],
        foodImages: [String]

    }, {timestamps:true}
)
const FoodSpot = mongoose.model('FoodSpot', foodSpotSchema);
module.exports = FoodSpot