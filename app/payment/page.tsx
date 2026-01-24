import { TablePayment } from "@/modules";
import { prisma } from "../lib/prisma";

export const metadata = {
  title: "Lista de pagos de gasolina",
  description: "Página para ver los pagos de gasolina",
};

const GasolinePage = async () => {
  const payents = await prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className=" w-full flex flex-col items-center">
      <div className="flex justify-center p-6">
        <TablePayment payments={payents} />
      </div>
    </div>
  );
};

export default GasolinePage;
