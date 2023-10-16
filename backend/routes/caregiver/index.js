const { Router, json } = require("express");
const { Login, LoginOTP, googleLoginCaregiver } = require("./login");
const { body, query } = require("express-validator");
const { Register } = require("./registration");
const getCaregiverInfo = require("./account");
const { SignupOTP, Signup } = require("./signup");
const { UpdateAccount } = require("./updateAccount");
const jobs = require("./jobs");
const applyJob = require("./applyJob");
const searchJobs = require("./searchJobs");
const wallet = require("./wallet");
const verifyCaregivers = require("../../middleware/verifyCaregiver");


const CaregiverRouter = Router();

CaregiverRouter.use(json({ limit: "5MB" }));

CaregiverRouter.post("/signup/otp", body("email").trim().isEmail(), SignupOTP);
CaregiverRouter.post("/signup", body("email").trim().isEmail(), Signup);
CaregiverRouter.post("/login/otp", body("email").trim().isEmail(), LoginOTP);
CaregiverRouter.post("/login", body("email").trim().isEmail(), Login);
CaregiverRouter.post("/google-login", googleLoginCaregiver);

CaregiverRouter.use(verifyCaregivers);
CaregiverRouter.post("/registration", body("email").trim().isEmail(), Register);
CaregiverRouter.get("/getCaregiverInfo", getCaregiverInfo);
CaregiverRouter.put("/updateAccount", body("email").trim().isEmail(), UpdateAccount);
CaregiverRouter.get("/jobs", query("email").trim().isEmail(), jobs);
CaregiverRouter.post("/applyJob", body("email").trim().isEmail(), applyJob);
CaregiverRouter.get("/wallet", query("email").trim().isEmail(), wallet);
CaregiverRouter.post("/searchJobs", searchJobs);

module.exports = CaregiverRouter;