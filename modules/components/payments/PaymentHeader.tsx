"use client";
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";
import { useGeneralInformation } from "@/hooks/useGeneralInformation";
import { CardSkeleton } from "../skeleton/CardSkeleton";
import { formatNumber } from "@/utils/number";

export const PaymentHeader = () => {
  const {
    totalAmountPayments,
    totalAmountCurrentMonth,
    averagePayments,
    paymentCount,
    loading,
  } = useGeneralInformation();

  return (
    <div className="w-full flex justify-center flex-wrap gap-10">
      {loading ? (
        <>
          <CardSkeleton className="w-48 h-32" />
          <CardSkeleton className="w-48 h-32" />
          <CardSkeleton className="w-48 h-32" />
          <CardSkeleton className="w-48 h-32" />
        </>
      ) : (
        <>
          <Item variant="outline" className="w-52 h-32 px-4 border-neutral-500">
            <ItemContent className="flex flex-col items-center justify-center gap-2">
              <ItemTitle className="text-5xl">${formatNumber(totalAmountPayments)}</ItemTitle>
              <ItemTitle className="text-xs text-muted-foreground text-center">
                Monto de pagos total
              </ItemTitle>
            </ItemContent>
          </Item>
          <Item variant="outline" className="w-52 h-32 px-4 border-neutral-500">
            <ItemContent className="flex flex-col items-center justify-center gap-2">
              <ItemTitle className="text-5xl">
                ${formatNumber(totalAmountCurrentMonth)}
              </ItemTitle>
              <ItemTitle className="text-xs text-muted-foreground text-center">
                Monto de pagos del mes actual
              </ItemTitle>
            </ItemContent>
          </Item>
          <Item variant="outline" className="w-52 h-32 px-4 border-neutral-500">
            <ItemContent className="flex flex-col items-center justify-center gap-2">
              <ItemTitle className="text-5xl">{paymentCount}</ItemTitle>
              <ItemTitle className="text-xs text-muted-foreground text-center">
                Total de pagos realizados
              </ItemTitle>
            </ItemContent>
          </Item>
          <Item variant="outline" className="w-52 h-32 px-4 border-neutral-500">
            <ItemContent className="flex flex-col items-center justify-center gap-2">
              <ItemTitle className="text-5xl">${formatNumber(averagePayments)}</ItemTitle>
              <ItemTitle className="text-xs text-muted-foreground text-center">
                Promedio por carga
              </ItemTitle>
            </ItemContent>
          </Item>
        </>
      )}
    </div>
  );
};
