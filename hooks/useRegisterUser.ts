import { UserRegisterValues } from "@/interface/user";
import { registerUserSchema } from "@/validator/zod/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useRegisterUser = () => {
  const form = useForm<UserRegisterValues>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  return {
    form,
  };
};
