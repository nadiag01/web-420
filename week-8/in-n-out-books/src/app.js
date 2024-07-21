/*
Name:Nadia Gainer
Date:06/16/24
Filename: apps.js
Description: apps.js File
*/

const express=require("express")
const bcrypt = require("bcrypt")
const path=require("path")
const app=express()
const books=require("../database/books")
const users = require("../database/users")
const Ajv = require("ajv")
const ajv = new Ajv()
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
 app.put("/api/books/:id",async (req,res)=>{
    try{
        const id=parseInt(req.params.id)
        if(isNaN(id))
            throw new Error("not a number")
        if (!req.body.title)
            throw new Error("invalid title")
        const book=await books.updateOne(id,req.body)
        console.log (book)
        res.status(204).json({message: "success"})
    }
    catch(error){
        res.status(400).json({message: error.message})
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

 app.post("/api/login", async(req,res)=>{
    try{
        if (!req.body.email || !req.body.password){
            return res.status(400).json({message: "a user name and password is required"})   
        }
    
const user= await users.findOne({email: req.body.email})
console.log (user)
const checkpassword = bcrypt.compareSync(req.body.password,user.password)
if (!checkpassword)
    return res.status(401).json({message: "Unauthorized"})
res.status(200).json({message: "Authentication successful"})
    }
    catch(error){
        res.status(400).json({message: error})
    }
 })

 app.post("/api/users/:email/verify-security-question", async(req,res)=>{
    try{
        const validatequestion = ajv.compile({
            type: "object", 
            properties: {
                securitydata: {
                    type: "array",
                    items: {
                        type: "object", 
                        properties: {
                            question: {type:"string"},
                            answer: {type:"string"}
                        },
                        minItems: 1
                    } 
                }
            },
            required: ["securitydata"]
        })
        const isvalid=validatequestion(req.body)
        if(!isvalid)
            return res.status(400).json({message: "bad request"})
        const {email} = req.params
        const {securitydata} = req.body
        const user= await users.findOne({email})
        const verify= securitydata.every(answer => user.securityQuestions.some(question => question.question ===answer.question && question.answer === answer.answer))
        if (!verify)
           return res.status(401).json({message: "Unauthorized"})
        res.status(200).json ({message:"security questions successfully answered"})

    }
    catch (error){res.status(400).json({message: "error"})}
 })
app.listen(3000,()=>{
    console.log("server is running")
})

module.exports= app