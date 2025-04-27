const mongoose = require("mongoose");


const surveySchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"name is required"]
        },
        address:{
            type:String,
            required:[true,"address is required"]
        },
        age:{
            type:Number,
            required:[true,"age is required"]
        },
    },
    {
        timestamps:true
    }
);

const survey = mongoose.model("survey",surveySchema);

module.exports = survey;