const mongoose =require('mongoose');

const d = new Date();

const schema = new mongoose.Schema({
    std_id:{
        type:String,
        require: true
    },
    Book_num:{
        type:Number,
        require:true
    },
    Book_Name:{
        type:String,
        require: true
    },
    Book_title:{
        type:String,
        require: true
    },
    Book_Author:{
        type:String,
        require:true
    },
    date : {
        type: String,
        default:d.toLocaleDateString()
    },
})

const lendbook =mongoose.model("LendBook", schema);
module.exports ={ lendbook }