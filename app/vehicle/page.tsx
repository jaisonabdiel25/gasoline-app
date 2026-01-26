import { CusomEmpty } from "@/components/CusomEmpty";
import { prisma } from "../lib/prisma";
import { TableVehicle } from "@/modules/components/vehicle/TableVehicle";

const VehiclePage = async () => {
  const vehicles = await prisma.vehicle.findMany({
    orderBy: { createdAt: "desc" },
    //TODO: sustituir por usurio en curso
    where: { userId: "b2f1409d-6103-4a39-973f-3acb034ce06f" },
  });

  if (vehicles.length === 0) {
    return (
      <div className="w-full flex items-center justify-center px-10">
        <CusomEmpty
          title="No hay vehículos registrados"
          description="Registra un nuevo vehículo para comenzar."
          labelButton="Registrar Vehículo"
          route="/vehicle/new"
        />
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center px-10">
      <TableVehicle vehicle={vehicles} />
    </div>
  );
};

export default VehiclePage;
