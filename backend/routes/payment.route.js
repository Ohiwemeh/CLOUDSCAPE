import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { checkoutSuccess, createCheckoutSession } from "../controllers/payment.controller.js";

const router = express.Router();

// Route to create a checkout session (initialize Paystack payment)
router.post("/create-checkout-session", protectRoute, createCheckoutSession);

// Route to verify payment after redirect (Paystack sends back a reference)
router.get("/checkout-success", protectRoute, checkoutSuccess);

export default router;
