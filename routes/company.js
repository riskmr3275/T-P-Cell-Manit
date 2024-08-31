const express = require("express");
const router = express.Router();

const {
    signupForCompany
} = require("../controllers/Auth");

// Signup for the company
router.post("/signupForCompany", signupForCompany);

module.exports = router;
