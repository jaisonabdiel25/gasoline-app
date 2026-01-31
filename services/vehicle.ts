import { CustomResponse, Ids } from "@/interface/global";
import { VehicleValues } from "@/interface/vehicle";
import { Vehicle } from "@prisma/client";

export const createVehicle = async (
  values: VehicleValues[],
): Promise<CustomResponse<Vehicle>> => {
  const vehicle = await fetch("/api/vehicle", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then((res) => res.json())
    .catch((errors) => {
      return {
        isSuccess: false,
        errors 
      };
    });

  return {
    isSuccess: true,
    data: vehicle,
  };
};

export const deleteVehicles = async (
  value: Ids[],
): Promise<CustomResponse<void>> => {
  const payment = await fetch("/api/vehicle", {
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
