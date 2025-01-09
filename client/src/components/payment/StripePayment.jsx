import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
<<<<<<< HEAD
import { createPaymentIntent } from "../../utils/api/payment";

//https://docs.stripe.com/testing
//test card

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const StripePayment = ({ amount, description, onSuccess }) => {
=======

// Load Stripe using your Publishable Key
const stripePromise = loadStripe(
  "pk_test_51QeL5O4Ne6mg9jNgZzduw7QncvxsTd65kdIPB9MiWN0L6zjGtLN0GB4DKJeH2e0Wi7JfbH2wWTF3U4SSttWMjmzg00G1sOMH1Q"
);

const StripePayment = ({ amount, description }) => {
>>>>>>> main
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
<<<<<<< HEAD
    if (!stripe || !elements || isProcessing) return;

    setIsProcessing(true);
    setMessage("");

    try {
      const { clientSecret } = await createPaymentIntent({
        amount,
        currency: "usd",
        description,
      });

=======
    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      // Call backend to create PaymentIntent
      console.log(
        "Initiating payment for amount:",
        amount,
        "Description:",
        description
      ); // Log payment details
      const response = await fetch("http://localhost:3000/api/payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency: "usd", description }),
      });

      const { clientSecret } = await response.json();
      console.log("Response from server (PaymentIntent):", clientSecret);
      // Confirm Card Payment
>>>>>>> main
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
<<<<<<< HEAD
        setMessage(`Payment failed: ${result.error.message}`);
      } else if (result.paymentIntent.status === "succeeded") {
        setMessage("Payment successful!");
        await onSuccess();
=======
        console.error("Payment failed:", result.error);
        setMessage(`Payment failed: ${result.error.message}`);
      } else if (result.paymentIntent.status === "succeeded") {
        setMessage("Payment successful!");
>>>>>>> main
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setMessage("Payment failed. Please try again.");
<<<<<<< HEAD
    } finally {
      setIsProcessing(false);
    }
=======
    }

    setIsProcessing(false);
>>>>>>> main
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
<<<<<<< HEAD
        <CardElement
          className="border p-2 rounded-md"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className={`${
            isProcessing ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white px-4 py-2 rounded-md transition-colors`}
        >
          {isProcessing ? "Processing..." : `Pay $${(amount / 100).toFixed(2)}`}
        </button>
      </form>
      {message && (
        <p
          className={`mt-2 ${
            message.includes("failed") ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}
=======
        <CardElement className="border p-2 rounded-md" />
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </form>
      {message && <p>{message}</p>}
>>>>>>> main
    </div>
  );
};

<<<<<<< HEAD
const StripePaymentWrapper = (props) => (
  <Elements stripe={stripePromise}>
    <StripePayment {...props} />
=======
// Wrap the component in Elements
const StripePaymentWrapper = ({ amount, description }) => (
  <Elements stripe={stripePromise}>
    <StripePayment amount={amount} description={description} />
>>>>>>> main
  </Elements>
);

export default StripePaymentWrapper;
