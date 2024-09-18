const { connect } = require("../config/database");
const { uploadMediaToCloudinary } = require("../utils/mediaUploader");
const mailSender  = require("../utils/mailSender");  
const {ProfilePicUpdate} = require("../Mail/Template/ProfilePicUpdate");


// +++++++++++++++Profle update ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


exports.updateProfile = async (req, res) => {
    try {
        // Get data from request body
        const { s_dob = "", s_contact = "", s_city = "", s_state = "", gender = "", about = "" } = req.body;

        // Get user id from request (assuming req.user contains authenticated user's info)
        const id = req.user.id;

        // Connect to the database
        const connection = await connect();

        // Find user details using SQL
        const [userRows] = await connection.execute('SELECT * FROM student_details WHERE s_id = ?', [id]);
        if (userRows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Update user details
        const updateUserQuery = `
            UPDATE student_details
            SET s_dob = ?, s_contact = ?, s_city = ? ,s_state=?, gender=?, about=?
            WHERE s_id = ?`;
        const [updateRow] = await connection.execute(updateUserQuery, [s_dob, s_contact, s_city, s_state, gender, about, id]);

        // Return response
        if (updateRow.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Profile not found"
            });
        }
        // Return response
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            User:id,
            additionalDetails: req.body
        });

    } catch (error) {
        console.error("Error updating profile: ", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ++++++++++++++Delete Account++++++++++++++++++++++++++++++++++++

exports.deleteAccount = async (req, res) => {
    let connection;
    try {
        connection=await connect();
        // get id
        const id = req.body.id || req.user.id
        // find user
        const [userRows] = await connection.execute('SELECT * FROM student_details WHERE s_id = ?', [id]);
        if (userRows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        // delete the profile
       const [response]= await connection.execute('DELETE FROM student_details WHERE s_id = ?', [id]);   
        if(response.affectedRows===0){
            res.status(404).json({
                success:false,
                message:"Profile not found",
            })
        }
        
        //  // return response
        return res.status(200).json({
            success: true,
            message: "Account delete successfully"
        })
    } catch (error) {
        console.error("Error delete Account: ", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getAllUserDetails = async (req, res) => {
    let connection
    try {
        const id = req.user.id;
        connection=await connect();
        const [userRows] = await connection.execute('SELECT * FROM student_details WHERE s_id = ?', [id]);
        if (userRows.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "User Details fetch Successfully",
            data:userRows
        })
    } catch (error) {
        console.error("Error getAllUserdatail: ", error);
        return res.status(500).json({
            success: false,
            message: "User not found"
        });
    }
}

exports.updateDisplayPicture = async (req, res) => {
    let connection;
    try {
        // Fetch account and image URL from request
        const imageUrl = req.files.displayPicture; // Assuming imageUrl is sent in the body
        const id = req.user.id;

        // Validate inputs
        if (!imageUrl || !id) {
            return res.status(400).json({
                success: false,
                message: "Please upload the image or all fields are required."
            });
        }

        // Fetch user details
        connection=await connect();
        const [userRows] = await connection.execute('SELECT * FROM student_details WHERE s_id = ?', [id]);
        if (userRows.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Upload image to Cloudinary (assuming uploadImageToCloudinary is an async function)
        const finalImageUrl = await uploadMediaToCloudinary(imageUrl, process.env.FOLDER_NAME,
            1000,
            1000);
 
        const updateUserQuery = `
            UPDATE student_details
            SET s_photo_url = ?
            WHERE s_id = ?`;
        const [updateRow] = await connection.execute(updateUserQuery, [finalImageUrl.secure_url, id]);
        if(updateRow.affectedRows===0){ 
            res.status(404).json({
                success:false,
                message:"Can not update right now"
            })
        }
        await mailSender(req.user.email, "Update Successfully", ProfilePicUpdate())
        res.send({
            success: true,
            message: `Image Updated successfully`,
            imageUrl: finalImageUrl.secure_url  
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Can't upload image right now, try again later.",
            error: error.message
        });
    }
};
