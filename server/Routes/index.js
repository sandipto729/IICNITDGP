const express = require("express");
const router = express.Router();

const EnquiryController=require('../Controller/Enquiry')
const IdeaController=require('../Controller/Innovation')
const WebinarController=require('../Controller/Webinar')

router.post("/enquirysubmission",EnquiryController.sendEnquiry);
router.post("/ideasubmission",IdeaController.IdeaSubmission);
router.get("/webinardetails",WebinarController.WebinarFetch);

module.exports=router