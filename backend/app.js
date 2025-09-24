import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import shopRouter from "./routes/shop.route.js";
import itemRouter from "./routes/item.routes.js";
import orderRouter from "./routes/order.route.js";
dotenv.config();


const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials : true
}
));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/shop", shopRouter);
app.use("/api/item", itemRouter);
app.use("/api/order", orderRouter);


const PORT = 8000 || 5000;

 app.listen(PORT, ()=>{
    connectDB()
    console.log(`Server connect successfully ${PORT}`);
    
})