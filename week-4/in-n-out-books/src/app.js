/*
Name:Nadia Gainer
Date:06/16/24
Filename: apps.js
Description: apps.js File
*/

const express=require("express")
const path=require("path")
const app=express()
const books=require("../database/books")
app.use(express.static(path.join(__dirname)))
app.use(express.json())
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"../index.html"))
})
// app.use((req,res,next)=>{
//     res.status(404).send("404 not found")
// })
// app.use((err,req,res,next)=>{
//     console.error(err.stack)
//     res.status(500).json({message:"server error",
//         error: err.message
//     })
//  })

app.get("/api/books", async (req, res, next) => {
    try {
    const allBooks = await books.find();
    console.log("All books: ", allBooks); // Logs all recipes
    res.json(allBooks); // Sends response with all books
    } catch (err) {
   44
    console.error("Error: ", err.message); // Logs error message
    next(err); // Passes error to the next middleware
    }
});

app.get("/api/books/:id", async (req, res, next) => {
try {
    const id=parseInt(req.params.id)
    if (isNaN(id)){
        throw new Error("id is not a number")
    }
const book = await books.findOne({id: id})
console.log("book: ", book); // Logs a single book with a matching id//
res.send(book); // Sends response with a single book//
} catch (err) {

res.status(400).json({message: "invalid id"})
console.error("Error: ", err.message); // Logs error message

}
});
 app.post("/api/books",async (req,res,next)=>{
    try{
        if (!req.body.title)
            return res.status(400).json({message: "a title is required"})
        console.log(req.body)
        const newbook = await books.insertOne(req.body)
        res.status(201).json(newbook.ops[0])
    }
    catch(error){
        console.log(error)
        res.status(400).json(error)
    }

 })
 app.delete("/api/books/:id",async (req,res,next)=>{
    try{
        const deletedbook =await books.deleteOne(req.params.id)
        res.status(204).json(deletedbook)
    }
    catch(error){
        res.status(400).json(error)     
    }
 })

app.listen(3000,()=>{
    console.log("server is running")
})

module.exports= app