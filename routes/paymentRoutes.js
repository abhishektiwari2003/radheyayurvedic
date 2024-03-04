// paymentRoutes.js
import express from "express";
import Razorpay from "razorpay";
import orderModel from "../models/orderModel.js";

const router = express.Router();

// Initialize Razorpay with your Key ID and Key Secret
const razorpay = new Razorpay({
  key_id: "rzp_test_R5alK5cgTgkRz0",
  key_secret: "RURimAsIDZpV3dTNBySpyQ9S",
});

// Create a Razorpay order and return the order details
router.post("/create-razorpay-order", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    // Additional validation, if needed

    const razorpayOrder = await razorpay.orders.create({
      amount: amount, // Order amount in smallest currency unit
      currency: currency,
      receipt: "order_receipt",
    });

    // Create a new order document
    const newOrder = new orderModel({
      user: req.user._id, // Assuming you have user information in the request
      products: [], // Add your product details here
      totalAmount: amount, // Use the correct total amount
    });

    // Save the order to the database
    await newOrder.save();

    res.json(razorpayOrder); // Return the Razorpay order details
  } catch (error) {
    res.status(500).json({ error: "Error creating Razorpay order" });
  }
});

// Server route to fetch order history
router.get("/order-history", async (req, res) => {
  try {
    // Query the database for orders associated with the user
    const userId = req.user._id; // Get the user ID from authentication
    const orders = await orderModel.find({ user: userId });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching order history" });
  }
});

export default router;
