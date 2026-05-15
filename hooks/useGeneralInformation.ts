import { VehicleWithRelations } from "@/interface/vehicle";
import { useMemo } from "react";
import { startOfMonth, endOfMonth, isWithinInterval } from "date-fns";

interface Props {
  generalInformation: VehicleWithRelations[];
}

export const useGeneralInformation = ({ generalInformation }: Props) => {

  const { totalPayments, totalAmountPayments, averagePayments } =
    useMemo(() => {
      return {
        totalPayments:
          generalInformation.reduce(
            (acc, vehicle) => acc + vehicle.payments.length,
            0,
          ) || 0,
        totalAmountPayments:
          generalInformation.reduce(
            (acc, vehicle) =>
              acc +
              vehicle.payments.reduce(
                (accPayments, payment) => accPayments + payment.amount,
                0,
              ),
            0,
          ) || 0,
        averagePayments:
          generalInformation.reduce((acc, vehicle) => {
            if (vehicle.payments.length === 0) {
              return acc;
            }

            const totalVehicle = vehicle.payments.reduce(
              (accPayments, payment) => accPayments + payment.amount,
              0,
            );

            return acc + totalVehicle / vehicle.payments.length;
          }, 0) || 0,
      };
    }, [generalInformation]);

  const totalAmountCurrentMonth = useMemo(() => {
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);

    return (
      generalInformation.reduce((total, vehicle) => {
        return (
          total +
          vehicle.payments.reduce((subTotal, payment) => {
            const paymentDate = new Date(payment.createdAt);

            return isWithinInterval(paymentDate, { start, end })
              ? subTotal + payment.amount
              : subTotal;
          }, 0)
        );
      }, 0) || 0
    );
  }, [generalInformation]);

  return {
    loading: false,
    totalPayments,
    totalAmountPayments,
    totalAmountCurrentMonth,
    averagePayments,
  };
};
