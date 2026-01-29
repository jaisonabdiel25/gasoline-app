import { CustomResponse } from "@/interface/global";
import { CreatePaymentInterface } from "@/interface/payment";
import { Payment } from "@prisma/client";

export const createPayment = async (
  body: CreatePaymentInterface[],
): Promise<CustomResponse<Payment>> => {
  const payment = await fetch("/api/payments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((errors) => ({
      isSuccess: false,
      errors,
    }));

  return {
    data: payment,
    isSuccess: true,
  };
};
