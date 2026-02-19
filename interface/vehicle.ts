import { Prisma } from "@prisma/client";

export interface VehicleValues {
  name: string;
  model?: string;
  year: number;
  userId?: string;
}

export type VehicleWithRelations = Prisma.VehicleGetPayload<{
  include: {
    payments: true;
  };
}>;
