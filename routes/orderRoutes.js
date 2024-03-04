import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  getOrderByIdController,
  getUserOrdersController,
  updateOrderStatusController,
} from "../controllers/orderController.js";
import formidable from "express-formidable";

const router = express.Router();

// Get order by ID
router.get("/order/:orderId", requireSignIn, getOrderByIdController);

// Update order status (admin only)
router.put(
  "/update-order/:orderId",
  requireSignIn,
  isAdmin,
  formidable(),
  updateOrderStatusController
);

router.get("/user-orders", requireSignIn, getUserOrdersController);

export default router;
