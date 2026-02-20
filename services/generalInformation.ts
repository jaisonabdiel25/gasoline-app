"use server";

import { CustomResponse } from "@/interface/global";
import { PaymentWithRelations } from "@/interface/payment";
import { VehicleWithRelations } from "@/interface/vehicle";
import { prisma } from "@/lib/prisma";

export const getGeneralInformation = async (
  userId: string,
): Promise<CustomResponse<VehicleWithRelations[]>> => {
  const vehicles = await prisma.vehicle.findMany({
    where: {
      userId,
    },
    include: {
      payments: true,
    },
  });

  return {
    data: vehicles,
    isSuccess: true,
  };
};

export async function getMonthlyVehicleTotals(userId: string): Promise<PaymentWithRelations[]> {
  const payments = await prisma.payment.findMany({
    where: {
      userId,
    },
    include: {
      vehicle: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  })

  return payments
}
