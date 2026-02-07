import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CusomEmpty } from "@/components/CusomEmpty";
import { prisma } from "@/lib/prisma";
import { FormPayment } from "@/modules";
import { getServerSession } from "next-auth";

export default async function CreatePage() {
  const session = await getServerSession(authOptions);
  const vehicles = await prisma.vehicle.findMany({
    orderBy: { createdAt: "desc" },
    where: { userId: session?.user?.id },
  });

  if (vehicles.length === 0) {
    return (
      <div className="w-full flex items-center justify-center px-10">
        <CusomEmpty
          title="No tienes vehículos registrados"
          description="para registrar pagos debes tener almenos 1 vehiculo"
          labelButton="Registrar Vehículo"
          route="/vehicle/new"
        />
      </div>
    );
  }

  return <FormPayment vehicles={vehicles} />;
}
