import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const createShop = async(req, res)=>{
    try {
        const {name, city, state, address} = req.body;
        let image;
        if(req.file){
            image = await uploadOnCloudinary(req.file.path)
        }

        const shop = await Shop.create({name, city, state, address, image, owner:req.userId});

        await shop.populate("owner", "items");
        return res.status(201).json({message : "Shop Created Successfully", shop})
    } catch (error) {
        return res.status(500).json({message : "create Shop error", error})
    }
}


export const editShop = async (req, res) => {
  try {
    const { shopId } = req.params;
    const { name, city, state, address } = req.body;

    // Find the shop and verify ownership
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    if (shop.owner.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized to edit this shop" });
    }

    // Update fields
    if (name) shop.name = name;
    if (city) shop.city = city;
    if (state) shop.state = state;
    if (address) shop.address = address;

    // Update image if a new file is uploaded
    if (req.file) {
      const image = await uploadOnCloudinary(req.file.path);
      shop.image = image;
    }

    await shop.save();
    await shop.populate("owner");

    return res.status(200).json({ message: "Shop updated successfully", shop });
  } catch (error) {
    return res.status(500).json({ message: "Edit Shop error", error });
  }
};

export const getShop = async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.userId }).populate("owner").populate("items");

    console.log("get shop", shop);
    

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    return res.status(200).json({ message: "Shop has been received", shop });
  } catch (error) {
    console.error("Error fetching shop:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};