const mongoose =require('mongoose');

const schema = new mongoose.Schema({
    Book_num:{
        type:Number,
        unique : true,
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
    Book_Copy:{
        type:Number,
        require:true
    },
    date : {
        type: Date,
        default:Date.now()
    },
})

const booklist =mongoose.model("BookList", schema);
module.exports ={ booklist }