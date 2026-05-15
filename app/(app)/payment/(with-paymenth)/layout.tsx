import { authOptions } from "@/lib/auth";
import { PaymentHeader } from "@/modules/components/payments/PaymentHeader";
import { getGeneralInformation } from "@/services/generalInformation";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Gasoline App",
  description:
    "Una aplicación para gestionar los pagos de gasolina de tus vehículos",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const generalInformation = await getGeneralInformation(session!.user.id);
  return (
    <div suppressHydrationWarning className="w-full flex flex-col items-center p-8 gap-8">
      <PaymentHeader generalInformation={generalInformation?.data} />
      {children}
    </div>
  );
}
