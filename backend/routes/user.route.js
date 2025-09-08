import express from "express";
import { getCurrentUser } from "../controllers/user.controller.js";
import isAuth from "../middlewares/isAuth.js";



const userRouter = express.Router();
console.log("first")

userRouter.get("/current",isAuth, getCurrentUser);

export default userRouter;