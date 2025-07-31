const express = require("express");
const router = express.Router();

const EnquiryController=require('../Controller/Enquiry')
const IdeaController=require('../Controller/Innovation')
const WebinarController=require('../Controller/Webinar')
const Website_countController=require('../Controller/Website_count')
const EventRegistrationController=require('../Controller/EventRegistration')
const authRoutes = require('./auth')

// Authentication routes
router.use('/auth', authRoutes);

router.post("/enquirysubmission",EnquiryController.sendEnquiry);
router.post("/ideasubmission",IdeaController.IdeaSubmission);
router.get("/webinardetails",WebinarController.WebinarFetch);
router.get("/website_count",Website_countController.Website_count);
router.get("/update_count",Website_countController.update_count);
router.post("/eventregistration",EventRegistrationController.EventRegistration);

module.exports=router