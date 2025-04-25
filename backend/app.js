const express = require("express");
const { writeFileSync } = require("fs")
const path = require("path");

const app = express();


app.use(express.static("./public"));
app.use(express.urlencoded({extended:false}))

const filePath = path.join(__dirname,"/data.txt");
const resFilePath = path.join(__dirname,"/response.html")

app.post("/survey",(req,res)=>{
    console.log(req.body);
    const {name,address,age} = req.body
    writeFileSync(filePath,`\n name : ${name} , address:${address} , age:${age}`,{flag:"a"})
    res.sendFile(resFilePath);
})





app.listen(5000,()=>console.log("app is listening on 5000"));