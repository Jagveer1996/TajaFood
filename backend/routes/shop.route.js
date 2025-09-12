import express from "express";
import { createShop} from "../controllers/shop.controller.js";
import isAuth from "../middlewares/isAuth.js";




const shopRouter = express.Router();
// console.log("first")

shopRouter.post("/create",isAuth, createShop);
// shopRouter.get("/get_shop",getShop);

export default shopRouter;

