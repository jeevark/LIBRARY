const mongoose =require('mongoose');

const schema = new mongoose.Schema({

    username:{
        type:String,
        require: true
    },
    password:{
        type:String,
        require: true
    }
})

const collection =mongoose.model("libaray_admin", schema);
module.exports ={ collection }