const WebinarModel = require("../model/Webinar");

const WebinarFetch=async(req,res)=>{
    try {
        const webinar=await WebinarModel.find();
        res.status(200).json(webinar);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

module.exports={WebinarFetch}