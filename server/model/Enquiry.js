const mongoose=require('mongoose');

const EnquirySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{   
        type:String,
        required:true
    }
},{timestamps:true});

module.exports=mongoose.model('Enquiry',EnquirySchema);