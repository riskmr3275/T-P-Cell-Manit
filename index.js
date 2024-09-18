const express = require('express');
const cookieParser = require('cookie-parser');
const database = require("./config/database");
require('dotenv').config();
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const companyRoutes = require("./routes/company");
const cors = require("cors");


const app = express();

database.connect();
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp"
}));
cloudinaryConnect();
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', userRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/profile', profileRoutes);

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running.............."
    });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
