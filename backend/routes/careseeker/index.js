const { Router } = require("express");
const { body, query } = require("express-validator");
const { LoginOTP, Login } = require("./login");
const { SignupOTP, Signup } = require("./signup");
const Register = require("./registration");
const getCaregivers = require("./getCaregivers");
const filters = require("./getCaregiversByFilters");
const PostJob = require("./postJob");
const postings = require("./posting");

const CareseekerRouter = Router();

CareseekerRouter.post("/signup/otp", body("email").trim().isEmail(), SignupOTP);
CareseekerRouter.post("/signup", body("email").trim().isEmail(), Signup);
CareseekerRouter.post("/login/otp", body("email").trim().isEmail(), LoginOTP);
CareseekerRouter.post("/login", body("email").trim().isEmail(), Login);
CareseekerRouter.post("/registration", body("email").trim().isEmail(), Register);
CareseekerRouter.get("/getCaregivers", getCaregivers);
CareseekerRouter.get("/filters", filters);
CareseekerRouter.post("/postjob", body("email").trim().isEmail(), PostJob);
CareseekerRouter.get("/posts", query("email").trim().isEmail(), postings);

module.exports = CareseekerRouter;