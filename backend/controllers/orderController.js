import Orders from "../models/Orders.js";

export const createOrder = async (req, res) => {

  try {
    const orderData = req.body;

    if (!orderData.name || !orderData.email) {
      return res.status(400).json({
        message: "Name and email are required"
      });
    }

    const newOrder = new Orders(orderData);
    await newOrder.save();

 

    res.status(201).json({
      message: "Order placed successfully",
      data: newOrder,
    });
  } catch (error) {

    res.status(500).json({
      message: "Failed to place order",
      error: error.message,
    });
  }
};