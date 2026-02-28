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
      errors: ["Error al crear el vehiculo"],
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

  const existingVehicles = await prisma.vehicle.findMany({
    where: {
      id: {
        in: value.map((item) => item.id),
      },
    },
    include: {
      payments: true,
    }
  });

  if (existingVehicles.length === 0) {
    return {
      isSuccess: false,
      errors: ["No se encontraron vehículos para eliminar"],
    };
  }

  if (existingVehicles.some(vehicle => vehicle.payments.length > 0)) {
    return {
      isSuccess: false,
      errors: ["No se pueden eliminar vehículos que tienen pagos asociados"],
    };
  }

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
      errors: ["Error al eliminar el vehiculo"],
    };
  }

  return {
    isSuccess: true,
  };
};
