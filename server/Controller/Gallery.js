const GalleryModel=require('../model/gallery');
const getGallery=async(req,res)=>{
    try{
        const images=await GalleryModel.find();
        res.status(200).json(images);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}
const submitGallery=async(req,res)=>{
    try{
        const images=await GalleryModel.create(req.body);
        res.status(200).json(images);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}
module.exports={
    getGallery,
    submitGallery
}