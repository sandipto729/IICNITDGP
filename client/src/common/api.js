const BACKENDURI=import.meta.env.VITE_BACKEND_URI

const BASE_URL = `${BACKENDURI}/api`;
console.log("BACKENDURI:", BACKENDURI);
console.log("BASE_URL:", BASE_URL);

const Api={
    IdeaSubmission:{
        url:`${BASE_URL}/ideasubmission`,
        method:"POST"
    },
    EnquirySubmission:{
        url:`${BASE_URL}/enquirysubmission`,
        method:"POST"
    },
    WebinarFetch:{
        url:`${BASE_URL}/webinardetails`,
        method:"GET"
    },
    WebsiteVisit:{
        url:`${BASE_URL}/website_count`,
        method:"GET"
    },
    Update_count:{
        url:`${BASE_URL}/update_count`,
        method:"GET"
    }
}

export default Api