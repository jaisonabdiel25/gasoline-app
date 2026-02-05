import { LoginUser } from "@/interface/user";
import { loginUserSchema } from "@/validator/zod/user";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

export const useLoginUser = () => {
  const form = useForm<LoginUser>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return {
    form,
  };
};
