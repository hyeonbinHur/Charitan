import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Use your Stripe secret key

const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency, description } = req.body;

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in smallest currency unit (e.g., cents for USD)
      currency,
      description,
      metadata: { integration_check: "accept_a_payment" },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: error.message });
  }
};

export default { createPaymentIntent };
