const Enquiry = require("../model/Enquiry");
const sendEmail=require('../utils/mail');

const sendEnquiry = async (req, res) => {
    const { name, email, mobile, message } = req.body;
    const enquiry = new Enquiry({ name, email, mobile, message });

    try {
        await sendEmail(
            "iifnitdgp@gmail.com",
            "New Enquiry",
            `You have a new enquiry from ${name} Phone: ${mobile}, Email: ${email}. Message : ${message}`
        );
        await enquiry.save();
        res.status(201).send(enquiry);
    } catch (error) {
        console.error("Error sending enquiry:", error);
        res.status(400).send(error);
    }
};

module.exports = { sendEnquiry };