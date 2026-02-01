"use client";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export const PaymentHeader = () => {
  const router = useRouter();
  return (
    <div className="w-full flex justify-around flex-wrap gap-2">
      <Item variant="outline" className="w-96 border-neutral-500">
        <ItemContent>
          <ItemTitle>Registrar pago</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button
            size="icon-sm"
            variant="outline"
            className="rounded-full"
            aria-label="Invite"
            onClick={() => router.push("/payment/new")}
          >
            <Plus />
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline" className="w-96 border-neutral-400">
        <ItemContent>
          <ItemTitle>Registrar nuevo Vehículo</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button
            size="icon-sm"
            variant="outline"
            className="rounded-full"
            aria-label="Invite"
            onClick={() => router.push("/vehicle/new")}
          >
            <Plus />
          </Button>
        </ItemActions>
      </Item>
    </div>
  );
};
