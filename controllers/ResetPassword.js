const {ResetPasswordLink}=require("../Mail/Template/ResetPasswordLink")
const {connect} = require("../config/database")
const mailSender = require("../utils/mailSender")
const bcrypt = require("bcryptjs")
const crypto=require("crypto")

// resetPassworToken
exports.resetPasswordToken = async (req, res) => {
    let connection;
    try {
        const email = req.body.email;
        connection = await connect();   
        // check exitence of user
        const [response] = await connection.execute("SELECT * FROM student_details WHERE s_email = ?", [email]);
        if (response.length === 0) {    
            return res.status(400).json({
                success: false,
                message: "Your Account is not registered"
            })
        }
        // generate token
        const token = crypto.randomUUID();
        const [updateDetails] = await connection.execute("UPDATE student_details SET token = ?, resetPasswordExpires = ? WHERE s_email = ?", [token, Date.now() + 5 * 60 * 1000, email]); 

        // Frontnd ka url genrate kara
        const url = `http://localhost:4000/update-password/${token}`
        // ab mail send karte hai user ke email pe url ke sath
        await mailSender(email, "Reset passwrod link", ResetPasswordLink(url))

        return res.status(200).json({
            success: true,
            message: "Email Sent successfully,please check email",
            token:token,
            usl:url
        })

    } catch (error) {
        console.log("error form the reset password", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while reset the password",
            error:error.message
        })
    }
}


exports.resetPassword = async (req, res) => {
    // data fetch
    // valodation
    // get userdetail from db using token
    // if no entry envalid tiken
    // token time check
    // hash password
    // password update
    // return response
    try {
        // data fetch
        const { password, confirmPassword, token } = req.body;
        // valodation
        if (password != confirmPassword) {
            return res.json({
                success: false,
                message: "Both Password must be same"
            })
        }
        // get userdetail from db using token
        const userDetails = await User.findOne({ token: token })
        // if no entry envalid tiken
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "Token is invalid"
            })
        }
        // token time check
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.json({
                success: false,
                message: "Token is expired, please generate it again"
            })
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10)
        // password update
        const user=await User.findOne({token:token})
        await User.findOneAndUpdate({ token: token }, { password: hashedPassword }, { new: true })
        // return response
        await mailSender(user.email,"Your Password is reset",passwordSuccess(user.firstName,user.email))
        return res.status(200).json({
            success: true,
            message: "Password reset Successfully"
        })
    } catch (error) {
        console.log("Error occure from resetPassword token", error);
        return res.status(401).json({
            success: false,
            message: "Something went wrong while  reseting the password",
            error:error.message
        })
    }


}