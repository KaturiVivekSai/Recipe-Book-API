const express = require("express"); // import express
const dotenv = require("dotenv"); // import .env
dotenv.config(); // configure .env

const connectDB = require("./config/db");   
const recipeRoute = require("./routes/Recipe");
const errHandler = require("./middleware/errhandler");
const PORT = process.env.PORT || 4000;
const app = express(); // running express
app.use(express.json()); // format the text into JSON

app.use((req,res,next) => {
    console.log(req.method);
    console.log(req.url);
    next();
})

app.get("/", (req, res) => {
    res.status(200).json({ message: "working" });
});

app.use("/recipes", recipeRoute);

app.use((req,res) => {
    res.status(404).json({
        message : "Page Not Found"
    })
})


app.use(errHandler);
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running Successfully on http://localhost:${PORT}`);
})