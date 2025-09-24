import Order from "../models/ordermodel.js";
import Shop from "../models/shop.model.js";

export const placeOrder = async (req, res) => {
    try {
        const { cartItems, paymentMethod, deliveryAddress, totalAmount } = req.body;

        if (!cartItems || cartItems.length == 0) {
            return res.status(400).json({ message: "CartItems are empty " })
        }

        if (!deliveryAddress.text || !deliveryAddress.latitude || !deliveryAddress.longitude) {
            return res.status(400).json({ message: "kindly sent complete Delivery Address" })

        }

        const groupItemsByShop = {}

        cartItems.forEach(item => {
            const shopId = item.shop
            if (!groupItemsByShop[shopId]) {
                groupItemsByShop[shopId] = []
            }
            groupItemsByShop[shopId].push(item)
        });

        const shopOrders = await Promise.all(Object.keys(groupItemsByShop).map(async (shopId) => {
            const shop = await Shop.findById(shopId).populate("owner");
            if (!shop) {
                return res.status(400).json({ message: "Shop not found" })
            }

            const items = groupItemsByShop[shopId];

            const subtotal = items.reduce((accum, curElm) => { sum + Number(curElm.price) * Number(curElm.quantity) }, 0)

            return {
                shop: shop._id,
                owner: shop.owner._id,
                subTotal: subtotal,
                shopOrderItems: items.map((item) => ({
                    item: item._id,
                    price: item.price,
                    quantity: item.quantity,
                    name: item.name
                }))
            }
        }));


        const newOrder = await Order.create({
            user: req.userId,
            paymentMethod,
            deliveryAddress,
            totalAmount,
            shopOrder: shopOrders
        })

        return res.status(201).json({ message: "new Order created successfully", newOrder })


    } catch (error) {
        return res.status(500).json({ message: "place order error", error })
    }
}