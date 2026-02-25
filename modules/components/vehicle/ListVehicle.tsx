"use client";

import { Vehicle } from "@prisma/client";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Trash2 } from "lucide-react";
import { deleteVehicles } from "@/services";
import { useRouter } from "next/navigation";

interface Props {
  vehicle?: Vehicle[];
}

export const ListVehicle = (props: Props) => {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const response = await deleteVehicles([{ id }]);

    if (response.isSuccess) {
      router.refresh();
    }
  };
  const { vehicle = [] } = props;
  return (
    <div className="w-full flex flex-wrap gap-4">
      {vehicle.map(({ id, name, model, year }) => (
        <div key={id}>
          <Item variant="outline" className=" flex w-96 border-neutral-400">
            <ItemContent>
              <ItemTitle>{name}</ItemTitle>
              <ItemDescription>{`${model}  (${year})`}</ItemDescription>
            </ItemContent>
            <ItemActions className="flex gap-3">
              <Trash2 onClick={() => handleDelete(id)} color="#b22a2a" />
            </ItemActions>
          </Item>
        </div>
      ))}
    </div>
  );
};
