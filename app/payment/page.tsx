import { TablePayment } from "@/modules";
import { prisma } from "../../lib/prisma";
import { CusomEmpty } from "@/components/CusomEmpty";

export const metadata = {
  title: "Lista de pagos de gasolina",
  description: "Página para ver los pagos de gasolina",
};

const GasolinePage = async () => {
  const payments = await prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
  });

  if (!payments || payments.length === 0) {
    return (
      <div className="w-full flex items-center justify-center px-10">
        <CusomEmpty
          title="No hay pagos registrados"
          description="Registra un pago para comenzar."
          labelButton="Registrar Pago"
          route="/payment/new"
        />
      </div>
    );
  }

  return (
    <div className=" w-full flex justify-center items-center p-6">
      <TablePayment payments={payments} />
    </div>
  );
};

export default GasolinePage;
