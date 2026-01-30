import { TablePayment } from "@/modules";
import { prisma } from "../../lib/prisma";
import { CusomEmpty } from "@/components/CusomEmpty";
import { PaymentWithRelations } from "@/interface/payment";

export const metadata = {
  title: "Lista de pagos de gasolina",
  description: "Página para ver los pagos de gasolina",
};

const PaymentPage = async () => {
  const payments: PaymentWithRelations[] = await prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      vehicle: true,
    },
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
    <div className=" w-full flex justify-center items-center p-6 px-4">
      <div className="p-20 border-gray-400 dark:border-neutral-600">
        <TablePayment payments={payments} />
      </div>
    </div>
  );
};

export default PaymentPage;
