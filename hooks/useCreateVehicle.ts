import { VehicleValues } from "@/interface/vehicle";
import { createVehicle, updateVehicle } from "@/services";
import { formSchemaVehicle } from "@/validator/zod/vehicle";
import { zodResolver } from "@hookform/resolvers/zod";
import { Vehicle } from "@/interface/vehicle";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  vehicle?: Vehicle;
  isEdit: boolean;
}
export const useCreateVehicle = (props: Props) => {
  const router = useRouter();
  const { data: user } = useSession();

  const { vehicle, isEdit } = props;

  const initialValues: VehicleValues = {
    name: isEdit ? vehicle?.name || "" : "",
    model: isEdit ? vehicle?.model || "" : "",
    year: isEdit ? vehicle?.year || 0 : undefined,
    userId: isEdit ? user?.user?.id : undefined,
    isMain: isEdit ? vehicle?.isMain || false : false,
  };

  const form = useForm<VehicleValues>({
    resolver: zodResolver(formSchemaVehicle),
    defaultValues: initialValues,
  });

  const handleReset = () => {
    form.reset();
    router.push("/vehicle");
  };

  const onSubmit = async (values: VehicleValues) => {
    if (isEdit) {
      await onSubmitEdit(values);
    } else {
      await onSubmitCreate(values);
    }
  };

  const onSubmitEdit = async (values: VehicleValues) => {
    // Implementar lógica para editar el vehículo
    const request = {
      ...values,
      userId: user!.user!.id,
    };
    const response = await updateVehicle(vehicle!.id, request);

    if (response.isSuccess) {
      toast.success("Vehículo actualizado correctamente", {
        description: "El vehículo ha sido actualizado exitosamente.",
        action: {
          label: "Entendido",
          onClick: () => {
            toast.dismiss();
          },
        },
      });
      router.push("/vehicle");
    } else {
      toast.error("Error al actualizar el vehículo", {
        description:
          "Ocurrió un error al actualizar el vehículo. Por favor, intenta nuevamente.",
        action: {
          label: "Entendido",
          onClick: () => {
            toast.dismiss();
          },
        },
      });
    }
  };

  const onSubmitCreate = async (values: VehicleValues) => {
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
