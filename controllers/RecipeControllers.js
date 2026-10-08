const express = require("express");
const recipes = require("../model/Recipe");

exports.getController = (async(req, res, next) => {
    if (req.query.sort) {
        return exports.getSortedRecipes(req, res, next);
    }
    
    return exports.getFilteredRecipesController(req, res, next);
});


exports.getFilteredRecipesController = (async (req, res, next) => {
    try {
        let filter = {};
        if (req.query.type) {
            filter.type = req.query.type;
        }

        const recipe = await recipes.find(filter);
        return res.status(200).json(recipe);
    } catch (err) {
        next(err);
    }
});


exports.getSortedRecipes = (async (req, res, next) => {
    try {
        let query = recipes.find();

        if (req.query.sort === "cookTime") {
            query = query.sort({ cookTime: 1 }); 
        }

        const recipe = await query;
        return res.status(200).json(recipe);
    } catch (err) {
        next(err);
    }
});

exports.getControllerById = (async(req,res,next) => {
    try{
        const id = req.params.id;
        const recipe = await recipes.findById(id)
        if(!recipe){
            return res.status(404).json({
                message : "Recipe not Found"
            })
        }
        res.status(200).json(recipe);
    } catch(err){
        next(err);
    }
})

exports.postController = (async(req,res,next) => {
    try{
        const {dish, cookTime, type, favourite, addedOn} = req.body;
        
        if(!dish){
            return res.status(404).json({
                message : "Dish not Found"
            })
        }
        if(!cookTime){
            return res.status(404).json({
                message : "cookTime not Found"
            })
        }
        const recipe = await recipes.create(req.body);
        return res.status(201).json(recipe);
    } catch(err){
        next(err);
    }
})

exports.putController = (async(req,res,next) => {
    try{
        const id = req.params.id;
        const recipe = await recipes.findByIdAndUpdate(id, req.body, {
            returnDocument: "after", runValidators: true
        });
        if(!recipe){
            return res.status(404).json({
                message : "Recipe not Found"
            })
        }
        return res.status(200).json(recipe);
    } catch(err){
        next(err);
    }
})

exports.deleteController = (async(req,res,next) => {
    try{
        const id = req.params.id;
        const recipe =await recipes.findByIdAndDelete(id);
        if(!recipe){
            return res.status(404).json({
                message : "Recipe not Found"
            })
        }
        return res.status(200).json(recipe);
    } catch(err){
        next(err);
    }
})