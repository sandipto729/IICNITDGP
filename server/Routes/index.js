const express = require("express");
const router = express.Router();

const EnquiryController=require('../Controller/Enquiry')
const IdeaController=require('../Controller/Innovation')
const WebinarController=require('../Controller/Webinar')
const Website_countController=require('../Controller/Website_count')

router.post("/enquirysubmission",EnquiryController.sendEnquiry);
router.post("/ideasubmission",IdeaController.IdeaSubmission);
router.get("/webinardetails",WebinarController.WebinarFetch);
router.get("/website_count",Website_countController.Website_count);
router.get("/update_count",Website_countController.update_count);

module.exports=router