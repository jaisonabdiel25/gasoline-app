import { VehicleWithRelations } from "@/interface/vehicle";
import { getGeneralInformation } from "@/services/generalInformation";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { startOfMonth, endOfMonth, isWithinInterval } from "date-fns";

export const useGeneralInformation = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [generalInformation, setGeneralInformation] = useState<
    VehicleWithRelations[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        setLoading(true);
        const generalInformation = await getGeneralInformation(session.user.id);
        setGeneralInformation(
          generalInformation?.data ?? ([] as VehicleWithRelations[]),
        );
        setLoading(false);
      }
    };

    fetchData();
  }, [session?.user.id]);

  const { totalPayments, totalAmountPayments, averagePayments, paymentCount } =
    useMemo(() => {
      return {
        totalPayments: generalInformation.reduce(
          (acc, vehicle) => acc + vehicle.payments.length,
          0,
        ),
        totalAmountPayments: generalInformation.reduce(
          (acc, vehicle) =>
            acc +
            vehicle.payments.reduce(
              (accPayments, payment) => accPayments + payment.amount,
              0,
            ),
          0,
        ),
        averagePayments: generalInformation.reduce(
          (acc, vehicle) =>
            acc +
            vehicle.payments.reduce(
              (accPayments, payment) => accPayments + payment.amount,
              0,
            ) /
              vehicle.payments.length,
          0,
        ),
        paymentCount: generalInformation.reduce(
          (acc, vehicle) => acc + vehicle.payments.length,
          0,
        ),
      };
    }, [generalInformation]);

  const totalAmountCurrentMonth = useMemo(() => {
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);

    return generalInformation.reduce((total, vehicle) => {
      return (
        total +
        vehicle.payments.reduce((subTotal, payment) => {
          const paymentDate = new Date(payment.createdAt);

          return isWithinInterval(paymentDate, { start, end })
            ? subTotal + payment.amount
            : subTotal;
        }, 0)
      );
    }, 0);
  }, [generalInformation]);

  return {
    loading,
    totalPayments,
    paymentCount,
    totalAmountPayments,
    totalAmountCurrentMonth,
    averagePayments,
  };
};
