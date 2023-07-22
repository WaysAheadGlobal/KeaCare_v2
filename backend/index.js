require('dotenv').config();
const express = require('express');
const cors = require('cors');
const CaregiverRouter = require('./routes/caregiver');
const CareseekerRouter = require('./routes/careseeker');

const app = express();
app.use(express.json({ limit: "5MB" }));
app.use(cors());

app.use("/api/careseeker", CareseekerRouter);
app.use("/api/caregiver", CaregiverRouter);

app.listen(3004, () => {
    console.log("Server Started on Port 3004");
})