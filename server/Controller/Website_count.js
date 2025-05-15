const Website_count_model=require("../model/Website_count");

const Website_count=async(req,res)=>{
    const count=await Website_count_model.findOne({});
    res.status(200).json(count);
}
const update_count=async(req,res)=>{
    const count=await Website_count_model.findOneAndUpdate({},{$inc:{count:1}});
    res.status(200).json(count);
}

module.exports={Website_count,update_count};