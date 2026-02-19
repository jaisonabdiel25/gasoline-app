import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CusomEmpty } from "@/components/CusomEmpty";
import { PaymentWithRelations } from "@/interface/payment";
import { prisma } from "@/lib/prisma";
import { TablePayment } from "@/modules";
import { PaymentHeader } from "@/modules/components/payments/PaymentHeader";
import { parseLocalDate } from "@/utils/dateUtil";
import { addDays, startOfDay } from "date-fns";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Lista de pagos de gasolina",
  description: "Página para ver los pagos de gasolina",
};

type Props = {
  searchParams: Promise<{
    from?: string;
    to?: string;
  }>;
};

interface DateFilter {
  createdAt?: {
    gte?: Date;
    lt?: Date;
  };
}

const PaymentPage = async ({ searchParams }: Props) => {
  const { from, to } = await searchParams;

  const dateFilter: DateFilter = {};

  if (from) {
    const start = startOfDay(parseLocalDate(from));

    dateFilter.createdAt = {
      ...dateFilter.createdAt,
      gte: start,
    };
  }

  if (to) {
    const end = addDays(startOfDay(parseLocalDate(to)), 1);

    dateFilter.createdAt = {
      ...dateFilter.createdAt,
      lt: end,
    };
  }

  const session = await getServerSession(authOptions);

  const payments: PaymentWithRelations[] = await prisma.payment.findMany({
    where: {
      userId: session?.user?.id,
      ...dateFilter,
    },
    orderBy: { createdAt: "desc" },
    include: { vehicle: true },
  });

  if ((from || to) && payments.length === 0) {
    return (
      <div className="w-full flex items-center justify-center px-10">
        <CusomEmpty
          title="No hay pagos registrados para los filtros aplicados"
          description="Vuelve a aplicar los filtros o restablecelos para ver todos los pagos."
          labelButton="Limpiar filtros"
          resetparams={true}
        />
      </div>
    );
  }

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
    <div className="w-full flex flex-col  items-center p-8 gap-8 mt-10">
      <PaymentHeader />
      <TablePayment payments={payments} />
    </div>
  );
};

export default PaymentPage;
