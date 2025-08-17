const BACKENDURI=import.meta.env.VITE_BACKEND_URI

const BASE_URL = `${BACKENDURI}/api`;
console.log("BACKENDURI:", BACKENDURI);
console.log("BASE_URL:", BASE_URL);

const Api={
    AuditionSubmit: {
        url: `${BASE_URL}/audition`,
        method: "POST"
    },
    AuditionFetch: {
        url: `${BASE_URL}/audition`,
        method: "GET"
    },
    IdeaSubmission:{
        url:`${BASE_URL}/ideasubmission`,
        method:"POST"
    },
    EnquirySubmission:{
        url:`${BASE_URL}/enquirysubmission`,
        method:"POST"
    },
    WebinarFetch:{
        url:`${BASE_URL}/webinars`,
        method:"GET"
    },
    WebsiteVisit:{
        url:`${BASE_URL}/website_count`,
        method:"GET"
    },
    Update_count:{
        url:`${BASE_URL}/update_count`,
        method:"GET"
    },
    EventRegistration:{
        url:`${BASE_URL}/eventregistration`,
        method:"POST"
    },
    // New webinar/event management endpoints
    WebinarUpdate:{
        url:`${BASE_URL}/webinars/:id`,
        method:"PUT"
    },
    WebinarDelete:{
        url:`${BASE_URL}/webinars/:id`,
        method:"DELETE"
    },
    CarouselImageFetch:{
        url:`${BASE_URL}/carousel-images`,
        method:"GET"
    },
    CarouselImageSubmit:{
        url:`${BASE_URL}/carousel-images`,
        method:"POST"
    },
    GalleryFetch:{
        url:`${BASE_URL}/gallery`,
        method:"GET"
    },
    GallerySubmit:{
        url:`${BASE_URL}/gallery`,
        method:"POST"
    }
}

export default Api