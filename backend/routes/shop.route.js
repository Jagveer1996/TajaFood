import express from "express";
import { createShop } from "../controllers/shop.controller";
import isAuth from "../middlewares/isAuth";



const shopRouter = express.Router();
// console.log("first")

shopRouter.post("/create",isAuth,createShop);

export default shopRouter;