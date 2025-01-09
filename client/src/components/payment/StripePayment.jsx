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

const StripePayment = ({ amount, description, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || isProcessing) return;

    setIsProcessing(true);
    setMessage("");

    try {
      const { clientSecret } = await createPaymentIntent({
        amount,
        currency: "usd",
        description,
      });

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setMessage(`Payment failed: ${result.error.message}`);
      } else if (result.paymentIntent.status === "succeeded") {
        setMessage("Payment successful!");
        await onSuccess();
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setMessage("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
    </div>
  );
};

const StripePaymentWrapper = (props) => (
  <Elements stripe={stripePromise}>
    <StripePayment {...props} />
  </Elements>
);

export default StripePaymentWrapper;
