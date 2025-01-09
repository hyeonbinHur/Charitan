import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../../utils/api/payment";

const stripePromise = loadStripe(
  "pk_test_51QeL5O4Ne6mg9jNgZzduw7QncvxsTd65kdIPB9MiWN0L6zjGtLN0GB4DKJeH2e0Wi7JfbH2wWTF3U4SSttWMjmzg00G1sOMH1Q"
);

const StripePayment = ({ amount, description }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      console.log(
        "Initiating payment for amount:",
        amount,
        "Description:",
        description
      );

      const { clientSecret } = await createPaymentIntent({
        amount,
        currency: "usd",
        description,
      });

      console.log("Response from server (PaymentIntent):", clientSecret);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        console.error("Payment failed:", result.error);
        setMessage(`Payment failed: ${result.error.message}`);
      } else if (result.paymentIntent.status === "succeeded") {
        setMessage("Payment successful!");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setMessage("Payment failed. Please try again.");
    }

    setIsProcessing(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
    </div>
  );
};

const StripePaymentWrapper = ({ amount, description }) => (
  <Elements stripe={stripePromise}>
    <StripePayment amount={amount} description={description} />
  </Elements>
);

export default StripePaymentWrapper;
