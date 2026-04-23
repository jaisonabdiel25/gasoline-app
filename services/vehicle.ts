"use server";
import { CustomResponse, Ids } from "@/interface/global";
import { VehicleValues } from "@/interface/vehicle";
import { prisma } from "@/lib/prisma";
import { Vehicle } from "@prisma/client";

export const createVehicle = async (
  values: VehicleValues,
): Promise<CustomResponse<Vehicle>> => {
  const existingVehicle = await prisma.vehicle.findMany({
    where: {
      userId: values.userId,
    },
  });

  const isMain = existingVehicle.length === 0;

  const vehicle = await prisma.vehicle.create({
    data: { ...values, isMain, userId: values.userId! },
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
    },
  });

  if (existingVehicles.length === 0) {
    return {
      isSuccess: false,
      errors: ["No se encontraron vehículos para eliminar"],
    };
  }

  if (existingVehicles.some((vehicle) => vehicle.payments.length > 0)) {
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

export const getVehicleById = async (
  id: string,
): Promise<CustomResponse<Vehicle>> => {
  const vehicle = await prisma.vehicle.findUnique({
    where: {
      id,
    },
  });

  if (!vehicle) {
    return {
      isSuccess: false,
      errors: ["Vehículo no encontrado"],
    };
  }

  return {
    isSuccess: true,
    data: vehicle,
  };
};

export const updateVehicle = async (
  id: string,
  values: VehicleValues,
): Promise<CustomResponse<Vehicle>> => {
  //solo puede haber un vehículo principal por usuario, si el vehículo que se va a actualizar es el principal y se quiere cambiar a opcional, se debe validar que no exista otro vehículo principal para ese usuario
  if (values.isMain) {
    const existingMainVehicle = await prisma.vehicle.findFirst({
      where: {
        userId: values.userId,
        isMain: true,
      },
    });

    // actualizar a false el vehículo principal actual del usuario
    if (existingMainVehicle && existingMainVehicle.id !== id) {
      await prisma.vehicle.update({
        where: {
          id: existingMainVehicle.id,
        },
        data: {
          isMain: false,
        },
      });
    }
  }

  const vehicle = await prisma.vehicle.update({
    where: {
      id,
    },
    data: values,
  });

  if (!vehicle) {
    return {
      isSuccess: false,
      errors: ["Vehículo no encontrado"],
    };
  }

  return {
    isSuccess: true,
    data: vehicle,
  };
};
