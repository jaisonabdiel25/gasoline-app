import { z } from "zod";

export const registerUserSchema = (isEdit: boolean) =>
  z
    .object({
      name: z.string().min(2, "El nombre debe tener al menos 3 caracteres"),

      email: isEdit
        ? z.any().optional() // 👈 no valida nada
        : z.string().email("Correo inválido"),

      password: isEdit
        ? z.any().optional() // 👈 no valida nada
        : z
            .string()
            .min(8, "La contraseña debe tener al menos 8 caracteres")
            .regex(/[A-Z]/, "Debe tener al menos una mayúscula")
            .regex(/[a-z]/, "Debe tener al menos una minúscula")
            .regex(/[0-9]/, "Debe tener al menos un número"),

      passwordConfirm: isEdit
        ? z.any().optional() // 👈 no valida nada
        : z
            .string()
            .min(8, "La contraseña debe tener al menos 8 caracteres")
            .regex(/[A-Z]/, "Debe tener al menos una mayúscula")
            .regex(/[a-z]/, "Debe tener al menos una minúscula")
            .regex(/[0-9]/, "Debe tener al menos un número"),
    })
    .refine(
      (data) => {
        if (isEdit) return true; // 👈 no valida nada en edit
        return data.password === data.passwordConfirm;
      },
      {
        message: "Las contraseñas no coinciden",
        path: ["passwordConfirm"],
      },
    );

export const loginUserSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string(),
});
