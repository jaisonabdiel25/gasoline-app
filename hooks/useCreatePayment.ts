import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchema, PaymentValues } from "@/validator/zod/payment";
import { useRouter } from "next/navigation";
import { createPayment } from "@/services";

export const useCreatePayment = () => {
  const router = useRouter();

  const form = useForm<PaymentValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount: undefined,
    },
  });

  const onSubmit = async (values: PaymentValues) => {
    const request = {
      ...values,
      //TODO: ajustar al usuario en curso y el auto
      userId: "b2f1409d-6103-4a39-973f-3acb034ce06f",
      vehicleId: "eb8aa9a9-4207-46dd-921d-4078b4435de8",
    };
    const response = await createPayment([request]);
    if (response.isSuccess) {
      router.refresh();
    }
  };

  return {
    form,
    onSubmit,
  };
};
