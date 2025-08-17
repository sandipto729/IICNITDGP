const AuditionModel = require('../model/Audition');
const sendEmail = require('../utils/mail');

const createAudition = async (req, res) => {
    try {
        const audition = new AuditionModel(req.body);
        await audition.save();
        res.status(201).send(audition);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getAllAuditions = async (req, res) => {
    try {
        const auditions = await AuditionModel.find();
        res.status(200).send(auditions);
    } catch (error) {
        res.status(400).send(error);
    }
};

const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if(status=='approved') {
            const audition = await AuditionModel.findById(id);
            audition.status = status;
            await audition.save();
            const email = audition.email;
            const subject = 'Audition Status Update';
            const text = 'Congratulations! Your audition has been approved. Welcome to the team!';
            sendEmail(email, subject, text);
        }
        else if(status=='rejected') {
            const audition = await AuditionModel.findById(id);
            const email = audition.email;
            const subject = 'Audition Status Update';
            const text = 'We regret to inform you that your audition has been rejected. Thank you for your interest.';
            sendEmail(email, subject, text);
            await AuditionModel.findByIdAndDelete(id);
        }
        res.status(200).send({ message: 'Audition status updated successfully' });
    } catch (error) {
        res.status(400).send(error);
    }
};



module.exports = {
    createAudition,
    getAllAuditions,
    updateStatus
};