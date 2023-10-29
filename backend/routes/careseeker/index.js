const { Router, raw, json } = require("express");
const { body, query } = require("express-validator");
const { LoginOTP, Login, googleLogin } = require("./login");
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
const getSubscription = require("./getSubscription");
const getJobById = require("./getJobById");
const getApplicantsById = require("./getApplicants");
const { postReview, getReviews, updateReview } = require("./review");
const { appointmentFees, getAppointments, checkDuplicateAppointments } = require("./appointments");
const UpdateJob = require("./updateJob");
const { addFavourites, getFavourites, removeFromFavourites, getFavouriteByCareseekerAndCaregiverId } = require("./favourites");
const getCaregiversByName = require("./getCaregiversByName");
const PaymentHistory = require("./paymentHistory");
const portal = require("./billingportal");
const verifyCareseekers = require("../../middleware/verifyCareseeker");
const { getAllChatsBySenderIdAndReceiverId, getLastChatBySenderIdAndReceiverId, addChat } = require("../chats/chats");
const { getContacts, addContact } = require("../chats/contacts");
const Multer = require("multer");
const { uploadImage } = require("./upload");


const multerImage = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 2 * 1024 * 1024, // No larger than 2mb
    },
});

const CareseekerRouter = Router();

CareseekerRouter.post("/uploadImage", multerImage.single("image"), uploadImage);

CareseekerRouter.post("/webhook", raw({ type: 'application/json' }), webHook);

CareseekerRouter.use(json({ limit: "5MB" }));

CareseekerRouter.post("/signup/otp", body("email").trim().isEmail(), SignupOTP);
CareseekerRouter.post("/signup", body("email").trim().isEmail(), Signup);
CareseekerRouter.post("/google-login", googleLogin);
CareseekerRouter.post("/login/otp", body("email").trim().isEmail(), LoginOTP);
CareseekerRouter.post("/login", body("email").trim().isEmail(), Login);
CareseekerRouter.get("/getproducts", getProducts);


CareseekerRouter.use(verifyCareseekers);
CareseekerRouter.post("/registration", body("email").trim().isEmail(), Register);
CareseekerRouter.get("/getCaregivers", getCaregivers);
CareseekerRouter.get("/filters", filters);
CareseekerRouter.get("/filterByName", getCaregiversByName);
CareseekerRouter.post("/postjob", body("email").trim().isEmail(), PostJob);
CareseekerRouter.put("/updatejob", body("email").trim().isEmail(), UpdateJob);
CareseekerRouter.get("/posts", query("email").trim().isEmail(), postings);
CareseekerRouter.get("/account", query("email").trim().isEmail(), getCareseekerInfo);
CareseekerRouter.put("/updateAccount", body("email").trim().isEmail(), UpdateAccount);
CareseekerRouter.post("/payment", payment);
CareseekerRouter.get("/getSubcription", query("email").trim().isEmail(), getSubscription);
CareseekerRouter.get("/getjob", getJobById);
CareseekerRouter.get("/getapplicants", getApplicantsById);
CareseekerRouter.post("/review", body("email").trim().isEmail(), postReview);
CareseekerRouter.put("/review", body("email").trim().isEmail(), updateReview);
CareseekerRouter.get("/review", getReviews);
CareseekerRouter.post("/appointments", appointmentFees);
CareseekerRouter.get("/appointments", getAppointments);
CareseekerRouter.post("/appointments/checkAppointments", checkDuplicateAppointments);
CareseekerRouter.post("/favourites", body("careseekerEmail").trim().isEmail(), addFavourites);
CareseekerRouter.get("/favourites", query("careseekerEmail").trim().isEmail(), getFavourites);
CareseekerRouter.get("/getfavourite", query("careseekerEmail").trim().isEmail(), getFavouriteByCareseekerAndCaregiverId);
CareseekerRouter.delete("/favourites", body("careseekerEmail").trim().isEmail(), removeFromFavourites);
CareseekerRouter.get("/paymentHistory", query("email").trim().isEmail(), PaymentHistory);
CareseekerRouter.get("/portal", portal);
CareseekerRouter.get("/chats/all/:receiverId", getAllChatsBySenderIdAndReceiverId);
CareseekerRouter.get("/chats/last/:receiverId", getLastChatBySenderIdAndReceiverId);
CareseekerRouter.post("/chats", body("message").trim().isString(), addChat);
CareseekerRouter.get("/contacts", getContacts);
CareseekerRouter.post("/contacts", addContact);

module.exports = CareseekerRouter;