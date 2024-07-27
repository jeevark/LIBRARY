const mongoose =require('mongoose');

const schema = new mongoose.Schema({
    std_name:{
        type:String,
        require: true
    },
    std_id:{
        type:String,
        unique : true,
        require: true
    },
    password:{
        type:String,
        require:true
    },
    date : {
        type: Date,
        default:Date.now(String)
    },
})

const collection =mongoose.model("libaray_student", schema);
module.exports ={ collection }