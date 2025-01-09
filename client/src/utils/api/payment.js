import { axiosInstance } from "./axiosUtils";

const createPaymentIntent = async (paymentInfo) => {
  try {
    const response = await axiosInstance.post("payment-intent", paymentInfo);
    return response.data;
  } catch (err) {
    console.error("Error while creating payment intent", err);
    throw err;
  }
};

export { createPaymentIntent };
