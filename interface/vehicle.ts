import { Prisma } from "@prisma/client";

export interface VehicleValues {
  name: string;
  isMain: boolean;
  year?: number;
  model?: string;
  userId?: string;
}

export type VehicleWithRelations = Prisma.VehicleGetPayload<{
  include: {
    payments: true;
  };
}>;
