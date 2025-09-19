import Item from "../models/item.model.js";
import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const addItem = async (req, res) => {
    try {
        const { name, category, foodType, price } = req.body;

        // console.log("Check file image", req.file);


        let image;
        if (req.file) {
            image = await uploadOnCloudinary(req.file.path)
        }

        const shop = await Shop.findOne({ owner: req.userId })
        if (!shop) {
            return res.status(400).json({ message: "Shop not Found" })
        }
        const item = await Item.create({ name, category, foodType, price, image, shop: shop._id })

        shop.items.push(item.id);
        await shop.save()
        await shop.populate("items", "owner")

        return res.status(201).json({ message: "Item has been add", shop })

    } catch (error) {
        return res.status(500).json({ message: "Item add error", error })
    }
}

export const editItem = async (req, res) => {
    try {
        const itemId = req.params.itemId;

        // console.log("Edit Item Body", req.body);

        const { name, category, foodType, price } = req.body;

        let image;
        if (req.file) {
            image = await uploadOnCloudinary(req.file.path)
        }

        const item = await Item.findByIdAndUpdate(itemId, { name, category, foodType, price, ...(image && { image }) }, { new: true })

        if (!item) {
            return res.status(400).json({ message: "Item not found" });
        }

        const shop = await Shop.findOne({ owner: req.userId }).populate("items")

        return res.status(200).json({ message: "Item has been update", shop })

    } catch (error) {
        console.error("Edit Item error:", error); // ✅ Log full error
        return res.status(500).json({ message: "Edit Item error", error: error.message || "Unknown server error" });
    }
};


export const getItemById = async (req, res) => {
    try {
        const itemId = req.params.itemId;

        const item = await Item.findById(itemId);

        if (!item) {
            return res.status(400).json({ message: "Item By ID not found" });
        }

        return res.status(200).json({ message: "Get Item BY ID Successfully", item })

    } catch (error) {
        return res.status(500).json({ message: "Get Item by ID error", error })

    }
}

export const deleteItemById = async (req, res) => {
    try {

        // console.log("params", req.params)

        const itemId = req.params.itemId;

        const item = await Item.findByIdAndDelete(itemId);


        if (!item) {
            return res.status(400).json({ message: "Item Not Found" })
        }

        const shop = await Shop.findOne({ owner: req.userId })
        // shop.items.filter((i)>=i._id!==itemId)

        // ✅ Remove item from shop.items array
        shop.items = shop.items.filter((i) => i.toString() !== itemId); // assuming items are ObjectIds

        await shop.save()
        await shop.populate("items")

        return res.status(200).json({ message: "Item has been Delete", shop })


    } catch (error) {
        console.error("Edit Item error:", error); // ✅ Log full error
        return res.status(500).json({ message: "Edit Item error", error: error.message || "Unknown server error" });

    }
}


export const getItemByCity = async (req, res) => {
    try {
        const { city } = req.params;

        if (!city) {
            return res.status(400).json({ message: "Item by City Not Found" })

        }

        const shops = await Shop.find({
            city: { $regex: new RegExp(`^${city}$`, "i") }
        }).populate("items");

        if (shops.length === 0) {
            return res.status(404).json({ message: "No shops found in this city." });
        }

        const shopId = shops.map((shop)=>shop._id)

        const items = await Item.find({shop:{$in:shopId}})


        return res.status(200).json({message : "Items by city founf", items})

    } catch (error) {
            return res.status(404).json({ message: "No items found in this city." });
        
    }
}