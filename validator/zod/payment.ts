import { z } from "zod";

export const paymentSchema = z.object({
  amount: z
    .number()
    .gt(0, "El monto debe ser mayor a 0"),
});



export type PaymentValues = z.infer<typeof paymentSchema>;
