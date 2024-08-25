const bcrypt = require('bcryptjs');
const otpGenerate = require("otp-generator")
const jwt = require("jsonwebtoken")
const mailSender = require("../utils/mailSender")
const {otpMail} = require("../Mail/Template/Otpmail")
const { connect } = require('../config/database');

// +++++++++++++++++++++++++++++++++++Send Otp FUnction+++++++++++++++++++++++++++++++
exports.sendOtp = async (req, res) => {
    const { email } = req.body;
    console.log("Received email:", email);

    let connection;

    try {
        connection = await connect();
        if (!connection) {
            throw new Error("Failed to establish a database connection.");
        }

        // Check if the email is already registered
        const [userRows] = await connection.query('SELECT COUNT(*) AS count FROM student_details WHERE s_email = ?', [email]);
        console.log("User Rows: ", userRows);
        
        if (userRows[0].count > 0) {
            await connection.end();
            return res.status(200).json({
                success: false,
                message: "User Already Exists"
            });
        }

        // Generate and ensure OTP uniqueness
        let otp;
        let otpRows;
        do {
            otp = otpGenerate.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });
            [otpRows] = await connection.query('SELECT COUNT(*) AS count FROM otps WHERE otp = ?', [otp]);
        } while (otpRows[0].count > 0);

        // Store OTP in the database
        const otps=await connection.query('INSERT INTO otps (email, otp, created_at) VALUES (?, ?, NOW())', [email, otp]);
        console.log("Otp Request from Backend",otps);
        

        // Close the connection
        await connection.end();

        // Sending email with OTP
        try {
            const mailResponse = await mailSender(email, "Verification OTP from TP Cell Manit", otpMail(otp));
            console.log("Email sent successfully:", mailResponse);
        } catch (error) {
            console.log("Error occurred while sending the email:", error);
        }

        res.status(200).json({
            success: true,
            message: "OTP Generated Successfully",
            otp
        });
    } catch (error) {
        console.error("Error generating OTP:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while generating OTP.",
            error: error.message
        });
    } finally {
        if (connection) {
            connection.end(); // Ensure the connection is closed
        }
    }
};






// Sign Up function
exports.signup = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp,
            contactNumber
        } = req.body;

        if (!firstName || !lastName || !email || !password || !confirmPassword || !accountType || !otp || !contactNumber) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Both passwords must be the same, please try again"
            });
        }

        const connection = await connect();

        // Check if the user already exists
        const [existingUserRows] = await connection.execute('SELECT COUNT(*) AS count FROM users WHERE email = ?', [email]);
        if (existingUserRows[0].count > 0) {
            await connection.end();
            return res.status(400).json({
                success: false,
                message: "User is already registered"
            });
        }

        // Validate OTP
        const [recentOtpRows] = await connection.execute('SELECT otp FROM otps WHERE email = ? ORDER BY created_at DESC LIMIT 1', [email]);
        if (recentOtpRows.length === 0 || otp !== recentOtpRows[0].otp) {
            await connection.end();
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create profile details
        const [profileResult] = await connection.execute('INSERT INTO profiles (gender, dateOfBirth, about, contactNumber) VALUES (?, ?, ?, ?)', [null, null, null, null]);
        const profileId = profileResult.insertId;

        // Create user
        const [userResult] = await connection.execute('INSERT INTO users (firstName, lastName, email, contactNumber, password, accountType, additionalDetails, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [firstName, lastName, email, contactNumber, hashedPassword, accountType, profileId, `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`]);

        await connection.end();

        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            user: { id: userResult.insertId, firstName, lastName, email, contactNumber, accountType }
        });
    } catch (error) {
        console.error("Error signing up:", error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again later",
            error: error.message
        });
    }
};





 

// Login function
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const connection = await connect();

        // Check if the user exists
        const [userRows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (userRows.length === 0) {
            await connection.end();
            return res.status(401).json({
                success: false,
                message: "User not registered. Please sign up first."
            });
        }

        const user = userRows[0];

        // Check if the password matches
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user.id,
                accountType: user.accountType
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

            // Create cookie options
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            };

            await mailSender(user.email, "Login activity", accountLogin(user.firstName));

            await connection.end();

            return res.cookie("token1", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in successfully"
            });
        } else {
            await connection.end();
            return res.status(401).json({
                success: false,
                message: "Incorrect password"
            });
        }
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
