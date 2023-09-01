require('dotenv').config();
const express = require('express');
const cors = require('cors');
const CaregiverRouter = require('./routes/caregiver');
const CareseekerRouter = require('./routes/careseeker');
const connection = require('./db/connection');

const Expiry = require('./routes/careseeker/expiry');

const app = express();
app.use(cors());

app.use("/keacare/api/careseeker", CareseekerRouter);
app.use("/keacare/api/caregiver", CaregiverRouter);

app.listen(3004, () => {
    if (connection.state === "disconnected") {
        connection.connect((err) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            console.log('connected as id ' + connection.threadId);
        });
        setInterval(Expiry, 2000);
    }
    console.log("Server Started on Port 3004");
})