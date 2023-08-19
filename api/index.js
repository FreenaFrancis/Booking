const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
dotenv.config();

const authRoute = require('./routes/auth');
const hotelsRoute = require('./routes/hotels');
const roomsRoute = require('./routes/rooms');
const usersRoute = require('./routes/users');
const cookieParser = require('cookie-parser');
const cors = require('cors');

mongoose.connect('mongodb://127.0.0.1:27017/Book', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log(`MongoDB connected`);
})
.catch((err) => {
    console.log(`Error while connecting to MongoDB: ${err}`);
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/users", usersRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessages = err.message || "Something went wrong";
    res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessages,
        stack: err.stack
    });
    next();
});

app.get("/", (req, res) => {
    res.json("Hello");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



// app.listen(8000,()=>{

//     console.log("server is running")
// })