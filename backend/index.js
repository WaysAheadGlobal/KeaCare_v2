require('dotenv').config();
const express = require('express');
const cors = require('cors');
const CaregiverRouter = require('./routes/caregiver');
const CareseekerRouter = require('./routes/careseeker');
const connection = require('./db/connection');
const Expiry = require('./routes/careseeker/expiry');
const age = require('./routes/caregiver/age');
const adminRouter = require('./routes/admin');

const app = express();
app.use(cors());

app.use("/keacare/api/careseeker", CareseekerRouter);
app.use("/keacare/api/caregiver", CaregiverRouter);
app.use("/keacare/api/admin", adminRouter);

app.listen(3004, () => {
    if (connection.state === "disconnected") {
        connection.connect((err) => {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            console.log('connected as id ' + connection.threadId);
        });
        setInterval(Expiry, 3600000);
        setInterval(age, 3600000);
    }
    console.log("Server Started on Port 3004");
})