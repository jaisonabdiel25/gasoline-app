import { VehicleValues } from "@/interface/vehicle";
import { createVehicle } from "@/services";
import { formSchemaVehicle } from "@/validator/zod/vehicle";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useCreateVehicle = () => {
  const router = useRouter();
  const { data: user } = useSession();

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
  };

  const onSubmit = async (values: VehicleValues) => {
    const request = {
      ...values,
      userId: user!.user!.id,
    };
    const response = await createVehicle(request);

    if (response.isSuccess) {
      toast.success("Vehículo creado correctamente", {
        description: "El vehículo ha sido creado exitosamente.",
        action: {
          label: "Entendido",
          onClick: () => {
            toast.dismiss();
          },
        },
      });
      router.push("/vehicle");
    } else {
      toast.error("Error al crear el vehículo", {
        description:
          "Ocurrió un error al crear el vehículo. Por favor, intenta nuevamente.",
        action: {
          label: "Entendido",
          onClick: () => {
            toast.dismiss();
          },
        },
      });
    }
  };

  return {
    form,
    handleReset,
    onSubmit,
  };
};
