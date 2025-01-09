import express from "express";
import paymentController from "../controller/payment_controller.js";

const router = express.Router();

router.post("/payment-intent", paymentController.createPaymentIntent);

export default router;
