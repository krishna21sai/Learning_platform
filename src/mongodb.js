const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/Cred")
.then(()=>{
    console.log("mongodb connected")
})
.catch(()=>{
    console.log("mongodb not connected")
})

const Schema  = new mongoose.Schema({
    name:{
        type : String,
        required: true
    },
    password:{
        type : String,
        required : true
    }
})

const collection = new mongoose.model("collection1",Schema)

module.exports = collection