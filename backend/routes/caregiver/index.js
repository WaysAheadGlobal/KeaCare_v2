const { Router, json } = require("express");
const { Login, LoginOTP, googleLoginCaregiver } = require("./login");
const { body, query } = require("express-validator");
const { Register, UploadDocuments } = require("./registration");
const getCaregiverInfo = require("./account");
const { SignupOTP, Signup } = require("./signup");
const { UpdateAccount } = require("./updateAccount");
const jobs = require("./jobs");
const applyJob = require("./applyJob");
const searchJobs = require("./searchJobs");
const wallet = require("./wallet");
const verifyCaregivers = require("../../middleware/verifyCaregiver");
const { getAllChatsBySenderIdAndReceiverId, getLastChatBySenderIdAndReceiverId, addChat } = require("../chats/chats");
const { getContacts, addContact } = require("../chats/contacts");
const { createStripeAccount, deleteStripeAccount, createPayout } = require("./payouts");
const { uploadImage, uploadVideo } = require("./upload");
const Multer = require("multer");
const getAllAppointments = require("./getAllAppointments");
const getAppointmentDetails = require("./getAppointmentDetails");
const getCareseekerNameById = require("./getCareseekerName");


const multerImage = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 2 * 1024 * 1024, // No larger than 2mb
    },
});

const multerVideo = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 50 * 1024 * 1024, // No larger than 50mb
    },
});

const storage = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "assets/")
    },
    filename: function (req, file, cb) {
        if (file.mimetype.includes('application/pdf')) {
            cb(null, "doc_" + crypto.randomUUID() + file.mimetype.replace('application/', '.'));
        } else {
            cb(null, "img_" + crypto.randomUUID() + file.mimetype.replace('image/', '.').split("+")[0]);
        }
    }
});

const upload = Multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 50 // 50MB
    },
});

const CaregiverRouter = Router();

CaregiverRouter.post("/uploadImage", multerImage.single("image"), uploadImage);
CaregiverRouter.post("/uploadVideo", multerVideo.single("video"), uploadVideo);

CaregiverRouter.use(json({ limit: "5MB" }));

CaregiverRouter.post("/signup/otp", body("email").trim().isEmail(), SignupOTP);
CaregiverRouter.post("/signup", body("email").trim().isEmail(), Signup);
CaregiverRouter.post("/login/otp", body("email").trim().isEmail(), LoginOTP);
CaregiverRouter.post("/login", body("email").trim().isEmail(), Login);
CaregiverRouter.post("/google-login", googleLoginCaregiver);

CaregiverRouter.use(verifyCaregivers);
CaregiverRouter.post("/registration", body("email").trim().isEmail(), Register);
CaregiverRouter.post(
    "/uploadDocuments",
    upload.fields([
        { name: "governmentId", maxCount: 1 },
        { name: "certificate", maxCount: 1 },
        { name: "review", maxCount: 1 }
    ]),
    UploadDocuments
);
CaregiverRouter.get("/getCaregiverInfo", getCaregiverInfo);
CaregiverRouter.put("/updateAccount", body("email").trim().isEmail(), UpdateAccount);
CaregiverRouter.get("/jobs", query("email").trim().isEmail(), jobs);
CaregiverRouter.post("/applyJob", body("email").trim().isEmail(), applyJob);
CaregiverRouter.get("/wallet", query("email").trim().isEmail(), wallet);
CaregiverRouter.post("/searchJobs", searchJobs);

CaregiverRouter.get("/chats/all/:receiverId", getAllChatsBySenderIdAndReceiverId);
CaregiverRouter.get("/chats/last/:receiverId", getLastChatBySenderIdAndReceiverId);
CaregiverRouter.post("/chats", body("message").trim().isString(), addChat);
CaregiverRouter.get("/contacts", getContacts);
CaregiverRouter.post("/contacts", addContact);
CaregiverRouter.get("/getCareseekerInfo/:id", getCareseekerNameById);

CaregiverRouter.post("/createStripeAccount", createStripeAccount);
CaregiverRouter.delete("/createStripeAccount/:account", deleteStripeAccount);
CaregiverRouter.post("/payout", body("amount").trim().isNumeric(), body("accountId").trim().isString(), createPayout);
CaregiverRouter.get("/getappointments", getAllAppointments);
CaregiverRouter.post("/getappointment", getAppointmentDetails);

module.exports = CaregiverRouter;