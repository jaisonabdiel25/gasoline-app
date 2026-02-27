import { z } from "zod";

export const formSchemaVehicle = z.object({
  name: z.string().min(2, "Nombre muy corto"),
  model: z.string().optional(),
  year: z.number().min(1900, "Año inválido").max(new Date().getFullYear(), "Año inválido"),
  userId: z.string(),
});
