import Shop from "../models/shop.model";
import uploadOnCloudinary from "../utils/cloudinary";

export const addItem = async (req, res) => {
    try {
        const { name, category, foodType, price } = req.body;

        let image;
        if (req.file) {
            image = await uploadOnCloudinary(req.file.path)
        }

        const shop = await Shop.findOne({owner:req.userId})
        if(!shop){
            return res.status(400).json({message : "Shop not Found"})
        }
        const item = await Item.create({ name, category, foodType, price, image, shop:shop._id})

        return res.status(201).json({message : "Item has been add", item})

    } catch (error) {
        return res.status(500).json({message: "Item add error", error})
    }
}

export const editItem = async (req, res)=>{
    try {
        const ItemId = req.params.ItemId;

        const { name, category, foodType, price } = req.body;

        let image;
        if (req.file) {
            image = await uploadOnCloudinary(req.file.path)
        }

        const item = await Item.findByIdAndUpdate(ItemId, {name, category, foodType, price}, {new:true})

        if(!item){
            return res.status(400).json({message : "Item not found"});
        }

        return res.status(200).json({message : "Item has been update", item})

    } catch (error) {
        return res.status(500).json({message: "Edit Item error", error})
    }
}