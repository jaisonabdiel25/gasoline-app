import { z } from "zod";

export const registerUserSchema = z
  .object({
    name: z
      .string()
      .min(2, "El nombre debe tener al menos 3 caracteres"),

    email: z
      .string()
      .email("Correo inválido"),

    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(/[A-Z]/, "Debe tener al menos una mayúscula")
      .regex(/[a-z]/, "Debe tener al menos una minúscula")
      .regex(/[0-9]/, "Debe tener al menos un número"),

    passwordConfirm: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(/[A-Z]/, "Debe tener al menos una mayúscula")
      .regex(/[a-z]/, "Debe tener al menos una minúscula")
      .regex(/[0-9]/, "Debe tener al menos un número"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Las contraseñas no coinciden",
    path: ["passwordConfirm"],
  });
