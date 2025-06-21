const WebinarModel = require("../model/Webinar");

const WebinarFetch=async(req,res)=>{
    try {
        const webinar=await WebinarModel.find();
        sortedWebinar=webinar.sort((a, b) => new Date(a.date) - new Date(b.date));
        res.status(200).json(sortedWebinar);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

module.exports={WebinarFetch}