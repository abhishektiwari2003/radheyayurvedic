// controllers/orderController.js
import Order from "../models/orderModel.js";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: "rzp_test_R5alK5cgTgkRz0",
  key_secret: "RURimAsIDZpV3dTNBySpyQ9S",
});

// Create a new order and initiate payment
export const createOrder = async (req, res) => {
  try {
    const { products, buyer, payment } = req.body;

    // Calculate the total amount based on product prices
    const totalAmount = products.reduce(
      (total, product) => total + product.price,
      0
    );

    // Create a new order
    const order = new Order({
      products,
      payment,
      buyer,
      status: "Not Process",
    });
    const savedOrder = await order.save();

    // Create a Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount * 100, // Amount in smallest currency unit (paise)
      currency: "INR",
      receipt: savedOrder._id, // Use order ID as the receipt
    });

    // console.log("Received data:", req.body);

    res.status(201).json({ order: savedOrder, razorpayOrder });
  } catch (error) {
    res.status(500).json({ error: "Error creating the order" });
  }
};

// Retrieve order history for a buyer
export const getOrderHistory = async (req, res) => {
  try {
    const buyer = req.user._id; // Get the buyer's user ID from authentication
    const orders = await Order.find({ buyer });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching order history" });
  }
};

// // Handle the Razorpay payment callback
// export const handleRazorpayPayment = async (req, res) => {
//   try {
//     const { order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     // Fetch the order using the receipt (order ID)
//     const order = await Order.findById(order_id);

//     if (!order) {
//       return res.status(404).json({ error: "Order not found" });
//     }

//     // Verify the payment using Razorpay's utility
//     const result = razorpay.validateWebhookSignature(
//       req.rawBody,
//       razorpay_signature
//     );

//     if (result) {
//       // Payment successful, update the payment information in the order
//       order.payment = {
//         razorpay_order_id: order_id,
//         razorpay_payment_id,
//         razorpay_signature,
//         // Add other payment-related information here
//       };

//       // Mark the order as "Processing" or update its status accordingly
//       order.status = "Processing";

//       // Save the updated order
//       const updatedOrder = await order.save();

//       return res.status(200).json({ message: "Payment successful" });
//     } else {
//       // Payment failed or was canceled
//       return res.status(400).json({ error: "Payment validation failed" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Error processing payment" });
//   }
// };
