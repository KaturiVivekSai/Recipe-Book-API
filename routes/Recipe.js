const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/RecipeControllers");

router.get("/", recipeController.getController);

router.get("/:id", recipeController.getControllerById);

router.post("/", recipeController.postController);

router.put("/:id", recipeController.putController);

router.delete("/:id", recipeController.deleteController);

module.exports = router;