import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { addItem, deleteItemById, editItem, getItemById } from "../controllers/item.controller.js";
import {upload} from "../middlewares/multer.js"


const itemRouter = express.Router();
// console.log("first")

// itemRouter.post("/add-item",isAuth,upload.single("image"), addItem);

itemRouter.post("/add-item", isAuth, upload.single("image"), (req, res, next) => {
//   console.log("Multer middleware triggered");
//   console.log("req.file:", req.file);
  next(); // Pass control to addItem
}, addItem);

itemRouter.put("/edit-item/:itemId", isAuth,upload.single("image"),editItem);
itemRouter.get("/get-item/:itemId", isAuth, getItemById);
itemRouter.delete("/delete-item/:itemId", isAuth, deleteItemById);
export default itemRouter;