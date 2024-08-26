// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {
  login,
  signup,
  sendOtp,
  changePassword,
} = require("../controllers/Auth")
// const {
//   resetPasswordToken,
//   resetPassword,
// } = require("../controllers/ResetPassword")

// const { auth } = require("../middlewares/auth")

// const {
//   getUserDetails,
//   getUserSubscriptionDetails
// } = require("../controllers/User")

// Route for get the user details
// router.post("/getUserDetails", auth, getUserDetails)

// // Route for get the Subscription details
// router.post("/getUserSubscriptionDetails", auth, getUserSubscriptionDetails)

// // Route for user login
// router.post("/login", login)

// // Route for user signup
router.post("/signup", signup)

// // Route for sending OTP to the user's email
router.post("/sendotp", sendOtp)

// // Route for Changing the password
// router.post("/changepassword", auth, changePassword)

// // Route for generating a reset password token
// router.post("/reset-password-token", resetPasswordToken)

// // Route for resetting user's password after verification
// router.post("/reset-password", resetPassword)

// Export the router for use in the main application
module.exports = router