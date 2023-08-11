const { Router, raw, json } = require("express");
const { body, query } = require("express-validator");
const { LoginOTP, Login } = require("./login");
const { SignupOTP, Signup } = require("./signup");
const Register = require("./registration");
const getCaregivers = require("./getCaregivers");
const filters = require("./getCaregiversByFilters");
const PostJob = require("./postJob");
const postings = require("./posting");
const getCareseekerInfo = require("./account");
const UpdateAccount = require("./updateAccount");
const getProducts = require("./pricing");
const payment = require("./payment");
const webHook = require("./events");
const setSubscription = require("./setSubscription");
const getJobById = require("./getJobById");
const getApplicantsById = require("./getApplicants");
const { postReview, getReviews, updateReview } = require("./review");
const { appointmentFees, getAppointments } = require("./appointments");

const CareseekerRouter = Router();

CareseekerRouter.use((req, res, next) => {
    if (req.originalUrl === '/webhook') {
        next(); // Do nothing with the body because I need it in a raw state.
    } else {
        json({ limit: "5MB" })(req, res, next);  // ONLY do express.json() if the received request is NOT a WebHook from Stripe.
    }
});

/* CareseekerRouter.post("/webhook", raw({ type: 'application/json' }), webHook); */

CareseekerRouter.post("/webhook", webHook);

/* CareseekerRouter.use(json({ limit: "5MB" })); */

CareseekerRouter.post("/signup/otp", body("email").trim().isEmail(), SignupOTP);
CareseekerRouter.post("/signup", body("email").trim().isEmail(), Signup);
CareseekerRouter.post("/login/otp", body("email").trim().isEmail(), LoginOTP);
CareseekerRouter.post("/login", body("email").trim().isEmail(), Login);
CareseekerRouter.post("/registration", body("email").trim().isEmail(), Register);
CareseekerRouter.get("/getCaregivers", getCaregivers);
CareseekerRouter.get("/filters", filters);
CareseekerRouter.post("/postjob", body("email").trim().isEmail(), PostJob);
CareseekerRouter.get("/posts", query("email").trim().isEmail(), postings);
CareseekerRouter.get("/account", query("email").trim().isEmail(), getCareseekerInfo);
CareseekerRouter.put("/updateAccount", body("email").trim().isEmail(), UpdateAccount);
CareseekerRouter.get("/getproducts", getProducts);
CareseekerRouter.post("/payment", payment);
CareseekerRouter.post("/setSubcription", setSubscription);
CareseekerRouter.get("/getjob", getJobById);
CareseekerRouter.get("/getapplicants", getApplicantsById);
CareseekerRouter.post("/review", body("email").trim().isEmail(), postReview);
CareseekerRouter.put("/review", body("email").trim().isEmail(), updateReview);
CareseekerRouter.get("/review", getReviews);
CareseekerRouter.post("/appointments", appointmentFees);
CareseekerRouter.get("/appointments", getAppointments);

module.exports = CareseekerRouter;