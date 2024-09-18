const express = require("express")
const router = express.Router()

const { auth,isCompany,isStudent,isTPR } = require("../middlewares/auth")

const {
    deleteAccount,
    updateProfile,
    getAllUserDetails,
    updateDisplayPicture,
    // getEnrolledCourses,
    // instructorDashboard,
  } = require("../controllers/Profile")



router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)

module.exports = router