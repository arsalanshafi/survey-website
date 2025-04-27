const express = require("express");
const { writeFileSync } = require("fs")
const mongoose = require("mongoose");
const path = require("path");
const survey = require("./models/survey.model");
const { connection_string } = require("../config")
const _ = require("lodash");


const app = express();


app.use(express.static("./public"));
app.use(express.urlencoded({extended:false}))

const filePath = path.join(__dirname,"/data.txt");
const resFilePath = path.join(__dirname,"/response.html")

app.post("/survey",async (req,res)=>{
    // console.log(req.body);
    // const {name,address,age} = req.body
    // writeFileSync(filePath,`\n name : ${name} , address:${address} , age:${age}`,{flag:"a"})
    try{

        await survey.create(req.body);
        res.sendFile(resFilePath);
    }
    catch(e){
        res.send(e);
    }
})

app.get("/surveys",async (req,res)=>{

    try{
        if(!req.query.name){
            const surveys = await survey.find({});
            return res.status(200).json(surveys);
        }
        const surveys = await survey.find({name:req.query.name});
        if(_.isEmpty(surveys)){
            return res.status(400).send("no match found")
        }
        res.status(200).json(surveys);
    }
    catch(e){
        res.status(400).send(e);
    }
})


app.put("/survey/updata/:name", async (req,res)=>{
    // survey.updateOne({name:req.params.name},{$set:req.query})
    // let temp = await survey.findOne({name:"yair"})
    await survey.updateOne({ name:req.params.name },{ $set:req.query  });
    let temp = await survey.findOne({name:req.params.name})

    res.status(200).json(temp);
})


mongoose.connect(connection_string).then(()=>{
    console.log("db is connected");
    app.listen(5000,()=>console.log("app is listening on 5000"));
});

