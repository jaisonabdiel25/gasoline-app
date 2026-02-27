import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchemaVehicle } from "@/validator/zod/vehicle";
import { VehicleValues } from "@/interface/vehicle";
import { useRouter } from "next/navigation";

export const useCreateVehicle = () => {

  const router = useRouter();
  
  const form = useForm<VehicleValues>({
    resolver: zodResolver(formSchemaVehicle),
    defaultValues: {
      name: "",
      model: "",
      year: undefined,
      userId: "",
    },
  });

  const handleReset = () => {
    form.reset();
    router.push("/vehicle");
  }

  return {
    form,
    handleReset
  };
};
