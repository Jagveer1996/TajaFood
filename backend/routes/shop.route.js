import express from "express";
import { createShop, getShop, getShopByCity} from "../controllers/shop.controller.js";
import isAuth from "../middlewares/isAuth.js";




const shopRouter = express.Router();
// console.log("first")

shopRouter.post("/createShop",isAuth, createShop);
shopRouter.get("/get_shop",isAuth,getShop);
shopRouter.get("/get_shopBy_city/:city",isAuth,getShopByCity);

export default shopRouter;

