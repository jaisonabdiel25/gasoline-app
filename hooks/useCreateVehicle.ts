import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchemaVehicle } from "@/validator/zod/vehicle";
import { VehicleValues } from "@/interface/vehicle";

export const useCreateVehicle = () => {
  const form = useForm<VehicleValues>({
    resolver: zodResolver(formSchemaVehicle),
    defaultValues: {
      name: "",
      model: "",
      year: undefined,
    },
  });
  

  return {
    form,
  };
};
