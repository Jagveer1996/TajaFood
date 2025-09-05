import express from "express";
import { resetPassword, sendOTP, signIn, signOut, signUp, verifyOTP } from "../controllers/auth.controller.js";


const authRouter = express.Router();
console.log("first")
authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.get("/signout", signOut);
authRouter.post("/sendotp", sendOTP)
authRouter.post("/verifyotp", verifyOTP)
authRouter.post("/resetpassword", resetPassword)

export default authRouter;