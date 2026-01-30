import { CustomResponse, Ids } from "@/interface/global";
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

export const deletePayments = async (
  value: Ids[],
): Promise<CustomResponse<void>> => {
  const payment = await fetch("/api/payments", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
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
