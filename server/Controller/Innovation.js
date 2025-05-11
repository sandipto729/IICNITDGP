const IdeaModel = require("../model/Idea");

const IdeaSubmission=async(req,res)=>{
    const idea=new IdeaModel(req.body);
    try {
        await idea.save();
        res.status(201).send(idea);
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports={IdeaSubmission};

