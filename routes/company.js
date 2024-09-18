const express = require("express");
const router = express.Router();

const {
    signupForCompany
} = require("../controllers/Auth");
const {getAllJobListings,getJobListingById,postJoblistings,updateJobListingById, deleteJobListingById}=require("../controllers/Company"); 
// Signup for the company
router.post("/signupForCompany", signupForCompany);

// Job Listing
// Get All Job Listings
router.get("/getAllJoblistings", getAllJobListings);
// GET a specific job listing by ID
router.get("/getJobListingById/:id", getJobListingById);
// Post Job Listing
router.post("/postJoblistings", postJoblistings);
// PUT (update) an existing job listing by id

router.put("/updateJobListingById/:id", updateJobListingById);
// DELETE a job listing by id
router.delete("/deleteJobListingById/:id", deleteJobListingById);


module.exports = router;
