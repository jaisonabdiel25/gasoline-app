"use server";
import { CustomResponse, Ids } from "@/interface/global";
import { VehicleValues } from "@/interface/vehicle";
import { prisma } from "@/lib/prisma";
import { Vehicle } from "@prisma/client";

export const createVehicle = async (
  values: VehicleValues,
): Promise<CustomResponse<Vehicle>> => {
  const vehicle = await prisma.vehicle.create({
    data: values,
  });

  if (!vehicle) {
    return {
      isSuccess: false,
      errors: "Error al crear el vehiculo",
    };
  }

  return {
    isSuccess: true,
    data: vehicle,
  };
};

export const deleteVehicles = async (
  value: Ids[],
): Promise<CustomResponse<void>> => {
  const deleted = await prisma.vehicle.deleteMany({
    where: {
      id: {
        in: value.map((item) => item.id),
      },
    },
  });

  if (!deleted) {
    return {
      isSuccess: false,
      errors: "Error al eliminar el vehiculo",
    };
  }

  return {
    isSuccess: true,
  };
};
