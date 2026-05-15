import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Dashboard } from "@/modules/components/dashboard/Dashboard";
import {
  getGeneralInformation,
  getMonthlyVehicleTotals,
} from "@/services/generalInformation";
import { PaymentHeader } from "@/modules/components/payments/PaymentHeader";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if(!session) {
    redirect("/signin");
  }

  const payments = await getMonthlyVehicleTotals(session.user.id);

  if (!payments || payments?.length === 0) {
    redirect("/payment")
  }

  const generalInformation = await getGeneralInformation(session.user.id);

  return (
    <div className="w-full p-8 flex flex-col gap-8 items-center">
      <PaymentHeader generalInformation={generalInformation?.data} />
      <Dashboard Payments={payments} />
    </div>
  );
}
