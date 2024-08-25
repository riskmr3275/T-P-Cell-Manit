const mysql = require('mysql2/promise'); // Use mysql2/promise for async/await support
require('dotenv').config();

const connect = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE
        });
        console.log("SQL connected successfully");
        return connection;  // Return the connection object
    } catch (error) {
        console.error("SQL connection failure");
        console.error(error);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = { connect };
