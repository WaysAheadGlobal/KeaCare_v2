const { Router } = require("express");
const { Login, LoginOTP } = require("./login");
const { body } = require("express-validator");
const { Register } = require("./registration");
const getCaregiverInfo = require("./account");
const { SignupOTP, Signup } = require("./signup");

const CaregiverRouter = Router();

CaregiverRouter.post("/signup/otp", body("email").trim().isEmail(), SignupOTP);
CaregiverRouter.post("/signup", body("email").trim().isEmail(), Signup);
CaregiverRouter.post("/login/otp", body("email").trim().isEmail(), LoginOTP);
CaregiverRouter.post("/login", body("email").trim().isEmail(), Login);
CaregiverRouter.post("/registration", body("email").trim().isEmail(), Register);
CaregiverRouter.get("/getCaregiverInfo", getCaregiverInfo);

module.exports = CaregiverRouter;