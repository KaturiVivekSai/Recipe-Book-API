const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    dish : {
        type: String,
        required : true,
        trime : true
    },
    cookTime : {
        type : Number,
        required : true,
        min : 1,
        max : 300,
    },
    type : {
        type : String,
        enum: ['veg', 'nonveg', 'dessert', 'snack'],
        default: 'veg'
    },
    favourite : {
        type : Boolean,
        default : false
    },
    addedOn: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("recipes", recipeSchema);