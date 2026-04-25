import { UserRegisterValues } from "@/interface/user";
import { resgisterUser, updateUser } from "@/services/user";
import { registerUserSchema } from "@/validator/zod/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Props {
  isEdit?: boolean;
  user?: User;
}

export const useRegisterUser = ({ user, isEdit = false }: Props) => {
  const router = useRouter();

  const initialValues: UserRegisterValues = {
    name: user?.name ?? "",
    email: user?.email ?? "",
    password: "",
    passwordConfirm: "",
  };

  const form = useForm<UserRegisterValues>({
    resolver: zodResolver(registerUserSchema(isEdit)),
    defaultValues: initialValues,
  });

  const onSubmit = async (values: UserRegisterValues) => {
    if (isEdit) {
      await editUser(values);
    } else {
      await createUser(values);
    }
  };

  const createUser = async (values: UserRegisterValues) => {
    const { isSuccess } = await resgisterUser(values);

    if (isSuccess) {
      router.push("/signin");
    }
  };

  const editUser = async (values: UserRegisterValues) => {
    const { isSuccess } = await updateUser(user!.id, values);

    if (isSuccess) {
      router.push("/profile");
    }
  };

  return {
    form,
    onSubmit,
  };
};
