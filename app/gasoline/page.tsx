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
    <div>
      <span className="text-3xl">Lista de pagos de gasolina</span>
      {JSON.stringify(payents)}
    </div>
  );
};

export default GasolinePage;
