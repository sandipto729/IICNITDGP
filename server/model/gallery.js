const mongoose=require('mongoose');
const galleryModel=new mongoose.Schema({
    images:{
        type:String,
        required:true
    }
},{timestamps:true});
module.exports=mongoose.model('gallery',galleryModel);
