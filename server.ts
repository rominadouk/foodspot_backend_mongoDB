import express from "express";
import mongoose from "mongoose";
import cors from "cors";

require('dotenv').config();

const URI: any = process.env.MONGO_URI
const app = express()
//middleware
app.use(express.json());
app.use(cors());


//models
const FoodSpot = require('../models/FoodSpotSchema.js')


// GET ALL FOODSPOTS
app.get('/', async (req, res) => {
    try {
        const allSpots = await FoodSpot.find({});
        res.json(allSpots)
    } catch (err) {
        console.log(err);
    }
});

// GET ONE FOODSPOT
app.get('/foodspots/:id', async (req, res) => {
    try {
        const oneSpot = await FoodSpot.findById(req.params.id);
        res.json(oneSpot)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: 'Internal server error'});
    }
});

// CREATE FOODSPOTS
app.post('/foodspots', async (req, res) => {
    try {
        const createdSpot = await FoodSpot.create(req.body)
        res.json(createdSpot)
    } catch (err) {
        console.log(err)
    }
});

//DELETE FOODSPOT
app.delete('/foodspots/:id', async (req, res) => {
    try {
        const deletedSpot = await FoodSpot.findByIdAndRemove(req.params.id);
        res.json(deletedSpot)
    } catch (err) {
        console.log(err)
    }
});

// UPDATE FOODSPOT
app.put('/foodspots/:id', async (req, res)=> {
    try {
        const updatedFoodSpot = await FoodSpot.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.json(updatedFoodSpot)
    } catch (err) {
        console.log(err)
    }
})


mongoose.connect(URI)
mongoose.connection.once('open', () => {
    console.log('Connection to MongoDB established.')
});

const port = process.env.PORT || 4000;

// Connect to local host 4000
app.listen(port, ()=> (
    console.log(`App is listening on port ${port}`)
));

