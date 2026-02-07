import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CusomEmpty } from "@/components/CusomEmpty";
import { PaymentWithRelations } from "@/interface/payment";
import { prisma } from "@/lib/prisma";
import { TablePayment } from "@/modules";
import { PaymentHeader } from "@/modules/components/payments/PaymentHeader";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Lista de pagos de gasolina",
  description: "Página para ver los pagos de gasolina",
};

const PaymentPage = async () => {
  const session = await getServerSession(authOptions);

  const payments: PaymentWithRelations[] = await prisma.payment.findMany({
    where: { userId: session?.user?.id },
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
    <div className="w-full flex flex-col  items-center p-8 gap-8 mt-20">
      <PaymentHeader />
      <TablePayment payments={payments} />
    </div>
  );
};

export default PaymentPage;
