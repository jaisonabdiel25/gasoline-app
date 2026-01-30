import { Prisma } from "@prisma/client";
export interface CreatePaymentInterface {
  amount: number;
  vehicleId: string;
  userId: string;
}


export type PaymentWithRelations = Prisma.PaymentGetPayload<{
  include: {
    vehicle: true;
  };
}>;

