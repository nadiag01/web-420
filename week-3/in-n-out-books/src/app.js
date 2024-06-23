/*
Name:Nadia Gainer
Date:06/16/24
Filename: apps.js
Description: apps.js File
*/

const express=require("express")
const path=require("path")
const app=express()
app.use(express.static(path.join(__dirname)))
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"../index.html"))
})
app.use((req,res,next)=>{
    res.status(404).send("404 not found")
})
app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).json({message:"server error",
        error: err.message
    })
})
app.listen(3000,()=>{
    console.log("server is running")
})

app.get("/api/books", async (req, res, next) => {
    try {
    const allRecipes = await recipes.find();
    console.log("All Recipes: ", allRecipes); // Logs all recipes
    res.send(allRecipes); // Sends response with all books
    } catch (err) {
   44
    console.error("Error: ", err.message); // Logs error message
    next(err); // Passes error to the next middleware
    }
   });
   In this cod