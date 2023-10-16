const { Router, json } = require("express");
const getCaregivers = require("./getCaregivers");
const verifyCaregivers = require("./verifyCaregivers");
const payment = require("./payment");
const dashboard = require("./dashboard");
const getCaregiverById = require("./getCaregiverById");
const verifyAdmin = require("../../middleware/verifyAdmin");
const { signup, login, verifyToken } = require("./auth");

const adminRouter = Router();
adminRouter.use(json());
adminRouter.post("/signup", signup);
adminRouter.post("/login", login);

adminRouter.use(verifyAdmin);
adminRouter.post("/verify-token", verifyToken);
adminRouter.get("/caregivers", getCaregivers);
adminRouter.put("/caregivers/verify", verifyCaregivers);
adminRouter.get("/caregivers/payment", payment);
adminRouter.get("/dashboard", dashboard);
adminRouter.get("/getcaregiver", getCaregiverById);
module.exports = adminRouter;