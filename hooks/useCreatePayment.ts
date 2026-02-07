import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchema, PaymentValues } from "@/validator/zod/payment";
import { useRouter } from "next/navigation";
import { createPayment } from "@/services";
import { useSession } from "next-auth/react";

export const useCreatePayment = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm<PaymentValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount: undefined,
      vehicleId: undefined,
    },
  });

  const onSubmit = async (values: PaymentValues) => {
    const request = {
      ...values,
      vehicleId: values.vehicleId,
      //TODO: ajustar al usuario en curso y el auto
      userId: session!.user.id!,
    };
    const response = await createPayment([request]);
    if (response.isSuccess) {
      router.push('/payment');
    }
  };

  return {
    form,
    onSubmit,
  };
};
