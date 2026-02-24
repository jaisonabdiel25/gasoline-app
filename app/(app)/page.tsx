import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Dashboard } from "@/modules/components/dashboard/Dashboard";
import {
  getGeneralInformation,
  getMonthlyVehicleTotals,
} from "@/services/generalInformation";
import { PaymentHeader } from "@/modules/components/payments/PaymentHeader";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const payments = await getMonthlyVehicleTotals(session?.user.id || "");

  const generalInformation = await getGeneralInformation(session!.user.id);

  return (
    <div className="w-full p-8 flex flex-col gap-8 items-center">
      <PaymentHeader generalInformation={generalInformation?.data} />
      <Dashboard Payments={payments} />
    </div>
  );
}
