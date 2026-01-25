import { VehicleValues } from "@/interface/vehicle";
import { Vehicle } from "@prisma/client";

export const createVehicle = async (
  values: VehicleValues[],
): Promise<Vehicle> => {
  const vehicle = await fetch("/api/vehicle", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  }).then((res) => res.json());

  return vehicle;
};
