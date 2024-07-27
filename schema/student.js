const mongoose =require('mongoose');

const schema = new mongoose.Schema({
    std_name:{
        type:String,
        require: true
    },
    std_id:{
        type:String,
        require: true
    },
    password:{
        type:String,
        require:true
    },
    date : {
        type: Date,
        default:Date.now(toString)
    },
})

const collection =mongoose.model("libaray_student", schema);
module.exports ={ collection }