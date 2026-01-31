"use client";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";


export const PaymentHeader = () => {
  const router = useRouter();
  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Registrar pago</ItemTitle>
          <ItemDescription>Last seen 5 months ago</ItemDescription>
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
    </div>
  );
};
