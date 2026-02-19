"use client";
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";
import { useGeneralInformation } from "@/hooks/useGeneralInformation";
import { CardSkeleton } from "../skeleton/CardSkeleton";

export const PaymentHeader = () => {
  const {
    totalVehicles,
    totalAmountPayments,
    totalAmountCurrentMonth,
    loading,
  } = useGeneralInformation();

  return (
    <div className="w-full flex justify-around flex-wrap gap-4">
      {loading ? (
        <>
          <CardSkeleton className="w-48 h-32" />
          <CardSkeleton className="w-48 h-32" />
          <CardSkeleton className="w-48 h-32" />
        </>
      ) : (
        <>
          <Item variant="outline" className="w-48 h-32 border-neutral-500">
            <ItemContent className="flex flex-col items-center justify-center gap-2">
              <ItemTitle className="text-5xl">${totalAmountPayments}</ItemTitle>
              <ItemTitle className="text-xs text-muted-foreground text-center">
                Monto de pagos total
              </ItemTitle>
            </ItemContent>
          </Item>
          <Item variant="outline" className="w-48 h-32 border-neutral-500">
            <ItemContent className="flex flex-col items-center justify-center gap-2">
              <ItemTitle className="text-5xl">
                ${totalAmountCurrentMonth}
              </ItemTitle>
              <ItemTitle className="text-xs text-muted-foreground text-center">
                Monto de pagos del mes actual
              </ItemTitle>
            </ItemContent>
          </Item>
          <Item variant="outline" className="w-48 h-32 border-neutral-500">
            <ItemContent className="flex flex-col items-center justify-center gap-2">
              <ItemTitle className="text-5xl">{totalVehicles}</ItemTitle>
              <ItemTitle className="text-xs text-muted-foreground text-center">
                Total de vehículos
              </ItemTitle>
            </ItemContent>
          </Item>
        </>
      )}
    </div>
  );
};
