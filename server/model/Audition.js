const mongoose=require('mongoose');

const auditionSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    rollno:{
        type:String,
        required:true
    },
    domain:{
        type:Array,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    cv:{
        type:String,
        // required:true
    },
    description:{
        type:String,
        required:true
    },
    reason:{
        type:String,
        required:true
    },
    otherClub:{
        type:Array,
        required:true
    },
    status:{
        type:String,
        enum:['pending','approved','rejected'],
        default:'pending'
    }
},{
    timestamps:true
});

module.exports=mongoose.model('Audition',auditionSchema);