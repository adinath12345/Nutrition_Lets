const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// express type object
const app = express()

// moddleware
app.use(express.json())
app.use(cors())

// connection between mongodb and nodejs
mongoose.connect("mongodb://127.0.0.1:27017/Nutrition", {
    // promices
    useNewUrlParser: true,
    useUnifiedTopology : true
}).then(() => console.log('connected...') );


// make a some structure/schema
const foodSchema = new mongoose.Schema({
    name : String,
    calories : Number,
    proteins : Number,
    carbs : Number,
    fats : Number,
    fibres: Number,
    weight : Number,
})

// connection of schema and model
const foodModel = new mongoose.model("foods",foodSchema);

app.post("/food/create" , (req,res) => {
    
    // get all the data in one variable
    const food = req.body;

    // model object
    let foodObj = new foodModel(food);

    // save the data
    foodObj.save().then( () => {
        res.send({status:"Food Stored Succesfully.."})
    })
})

app.get("/foods",async (req,res) => {
    let foods = await foodModel.find();
    res.send({foods:foods});
})

app.listen(8000);

