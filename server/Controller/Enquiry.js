const Enquiry = require("../model/Enquiry");

const sendEnquiry = async (req, res) => {
    const { name, email, mobile, message } = req.body;
    const enquiry = new Enquiry({ name, email, mobile, message });
    try {
        await enquiry.save();
        res.status(201).send(enquiry);
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = { sendEnquiry };