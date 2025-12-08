import Orders from "../models/Orders.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    console.log(orderData);

    // Basic validation
    if (
      !orderData.name ||
      !orderData.email ||
      !orderData.phone ||
      !orderData.address ||
      !orderData.cartItems ||
      orderData.cartItems.length === 0
    ) {
      return res.status(400).json({
        message:
          "Missing required fields. Please provide name, email, phone, address, and cart items.",
      });
    }

    //  ---- SAVE ORDER ---
    const newOrder = new Orders(orderData);
    await newOrder.save();

    //  ---- MINUS STOCK FOR EACH PRODUCT ---
for (const item of orderData.cartItems) {
  await Product.findByIdAndUpdate(
    item.productId,                      // correct id
    { $inc: { quantity: -item.count } }, // minus stock
    { new: true }
  );
}


    //  ---- RESPONSE ---
    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      data: newOrder,
    });
  } catch (error) {
    console.error("Order error:", error);

    res.status(500).json({
      message: "Failed to place order",
      error: error.message,
    });
  }
};
