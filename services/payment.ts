import { Payment } from "@prisma/client";

export const createPayment = async (
  amount: number,
  vehicleId: string,
  userId: string,
): Promise<Payment> => {
  const body = {
    amount,
    vehicleId,
    userId,
  };

  const payment = await fetch("/api/payments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());

  return payment;
};
