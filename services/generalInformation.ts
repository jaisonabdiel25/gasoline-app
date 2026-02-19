"use server";

import { CustomResponse } from "@/interface/global";
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
