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