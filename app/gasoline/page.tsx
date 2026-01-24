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
    <div className="flex flex-col items-center mt-10">
      <span className="text-3xl">Lista de pagos de gasolina</span>

      <div className="mt-8">
        <TablePayment payments={payents} />
      </div>
    </div>
  );
};

export default GasolinePage;
