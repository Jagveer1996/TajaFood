import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {
        type: String
    },
    image: {
        type: String
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "shop"
    },
    category: {
        type: String,
        enum: ["Snacks", "Main Course", "Desserts", "Pizza", "Burgers", "Sandwiches", "South Indian", "North Indian", "Chinese", "Fast Food", "Others"]
    },
    price: {
        type: Number,
        min: 0
    },
    foodtype: {
        type: String,
        enum: ["Veg", "Non-Veg"]
    }
}, { timestamps: true })

const Item = mongoose.model("Item", itemSchema)
export default Item