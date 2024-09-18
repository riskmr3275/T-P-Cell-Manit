const { connect } = require('../config/database');
const poolPromise = connect();
// GET all job listings
exports.getAllJobListings = async (req, res) => {
    let connection;
    try {
        connection = await connect();
        if (!connection) {
            throw new Error("Failed to establish a database connection.");
        }
        const [results] = await connection.execute('SELECT * FROM JobListings');
        res.status(200).json({
            success: true,
            message: "Job listings retrieved successfully",
            data: results
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error retrieving job listings",
            error: err.message
        });
    }
};

// GET a specific job listing by ID
exports.getJobListingById = async (req, res) => {
    const jobId = req.params.id;
    let connection;
    try {
        connection = await connect();  // Use the pool connection
        if (!connection) {
            throw new Error("Failed to establish a database connection.");
        }
        const [results] = await connection.execute('SELECT * FROM JobListings WHERE job_id = ?', [jobId]);
        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Job listing not found'
            });
        }
        res.status(200).json({
            success: true,
            message: "Job listing retrieved successfully",
            data: results[0]
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error retrieving job listing",
            error: err.message
        });
    }
};



// POST a new job listing
exports.postJoblistings = async (req, res) => {
    // Destructure properties from req.body
    const {
        job_id,
        c_id,
        company_name,
        job_title,
        job_description,
        location,
        salary,
        requirements,
        application_deadline,
        job_type,
        eligibility_criteria,
        posted_date = new Date(),  // Default to current date if not provided
        contact_email,
        interview_process,
        application_link,
        required_experience,
        number_of_openings,
        industry,
        benefits,
        remote_availability,
        contract_duration,
        job_status,
        application_mode
    } = req.body;

    try {
        const pool = await poolPromise;  // Use the pool connection
        const query = `
            INSERT INTO JobListings (
                job_id, c_id, company_name, job_title, job_description, location, salary,
                requirements, application_deadline, job_type, eligibility_criteria,
                posted_date, contact_email, interview_process, application_link, required_experience,
                number_of_openings, industry, benefits, remote_availability,
                contract_duration, job_status, application_mode
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)
        `;
        const values = [
            job_id, c_id, company_name, job_title, job_description, location, salary,
            requirements, application_deadline, job_type, eligibility_criteria,
            posted_date, contact_email, interview_process, application_link, required_experience,
            number_of_openings, industry, benefits, remote_availability, contract_duration,
            job_status, application_mode
        ];
        const [result] = await pool.query(query, values);
        res.status(201).json({
            success: true,
            message: "Job listing created successfully",
            data: result
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error creating job listing",
            error: err.message
        });
    }
};


exports.updateJobListingById = async (req, res) => {
    const jobId = req.params.id;
    const updatedJobListing = req.body;

    // Construct the SET part of the query dynamically
    const setClause = Object.keys(updatedJobListing)
        .map(key => `${key} = ?`)
        .join(', ');

    const values = [...Object.values(updatedJobListing), jobId]; // Append jobId at the end

    const query = `UPDATE JobListings SET ${setClause} WHERE job_id = ?`;

    try {
        const connection = await connect();  // Use the pool connection
        if (!connection) {
            throw new Error("Failed to establish a database connection.");
        }

        const [result] = await connection.execute(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Job listing not found'
            });
        }

        res.status(200).json({
            success: true,
            message: "Job listing updated successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error updating job listing",
            error: err.message
        });
    }
};


// DELETE a job listing
exports.deleteJobListingById = async (req, res) => {
    const jobId = req.params.id;
    let connection;
    try {
        connection = await connect();  // Use the pool connection
        if (!connection) {
            throw new Error("Failed to establish a database connection.");
        }
        const [result] = await connection.execute('DELETE FROM JobListings WHERE job_id = ?', [jobId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Job listing not found'
            });
        }
        res.status(200).json({
            success: true,
            message: "Job listing deleted successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Error deleting job listing",
            error: err.message
        });
    }
};

 