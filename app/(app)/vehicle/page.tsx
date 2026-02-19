import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CustomEmpty } from "@/components/CustomEmpty";
import { prisma } from "@/lib/prisma";

import { ListVehicle } from "@/modules/components/vehicle/ListVehicle";
import { getServerSession } from "next-auth";

const VehiclePage = async () => {
  const session = await getServerSession(authOptions);
  const vehicles = await prisma.vehicle.findMany({
    orderBy: { createdAt: "desc" },
    where: { userId: session?.user?.id },
  });

  if (vehicles.length === 0) {
    return (
      <div className="w-full flex items-center justify-center px-10">
        <CustomEmpty
          title="No hay vehículos registrados"
          description="Registra un nuevo vehículo para comenzar."
          labelButton="Registrar Vehículo"
          route="/vehicle/new"
        />
      </div>
    );
  }

  return (
    <div className="w-full flex  p-10">
      <ListVehicle vehicle={vehicles} />
    </div>
  );
};

export default VehiclePage;
