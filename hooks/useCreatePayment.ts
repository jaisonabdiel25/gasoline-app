import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchema, PaymentValues } from "@/validator/zod/payment";
import { useRouter } from "next/navigation";
import { createPayment } from "@/services";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Vehicle } from "@/interface/vehicle";

interface Props {
  vehicles: Vehicle[];
}

export const useCreatePayment = ({ vehicles }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm<PaymentValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount: undefined,
      vehicleId: vehicles.find((vehicle) => vehicle.isMain)?.id || undefined,
    },
  });

  const handleDiscarted = () => {
    form.reset();
    router.push("/payment");
  };

  const onSubmit = async (values: PaymentValues) => {
    const request = {
      ...values,
      vehicleId: values.vehicleId,
      userId: session!.user.id!,
    };
    const response = await createPayment([request]);
    if (response.isSuccess) {
      toast.success("Pago creado correctamente", {
        description: "El pago ha sido creado exitosamente.",
        action: {
          label: "Entendido",
          onClick: () => {
            toast.dismiss();
          },
        },
      });
      router.push("/payment");
    } else {
      toast.error("Error al crear el pago", {
        description:
          "Ocurrió un error al crear el pago. Por favor, intenta nuevamente.",
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
    onSubmit,
    handleDiscarted,
  };
};
