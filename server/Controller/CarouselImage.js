const CorouselImageodel=require('../model/carouselImage');

const getCarouselImages=async(req,res)=>{
    try{
        const images=await CorouselImageodel.find();
        res.status(200).json(images);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}
const submitCarouselImages=async(req,res)=>{
    try{
        const images=await CorouselImageodel.create(req.body);
        res.status(200).json(images);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}
module.exports={getCarouselImages,submitCarouselImages};
