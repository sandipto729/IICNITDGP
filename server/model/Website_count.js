const mongoose=require('mongoose');

const Website_countSchema=new mongoose.Schema({
    count:{
        type:Number,
        required:true
    }
},{timestamps:true});

module.exports=mongoose.model('Website_count',Website_countSchema);