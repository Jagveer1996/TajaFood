import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    image : {
        type : String
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    city:{
        type : String
    },
    state:{
        type : String
    },
    address:{
        type:String
    },
    items : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Item"
    }]
}, {timestamps : true})

const Shop = mongoose.model("Shop", shopSchema)
export default Shop