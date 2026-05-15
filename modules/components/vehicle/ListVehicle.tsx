"use client";

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { deleteVehicles } from "@/services";
import { Vehicle } from "@/interface/vehicle";
import { PencilIcon, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  vehicle?: Vehicle[];
}

export const ListVehicle = (props: Props) => {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const response = await deleteVehicles([{ id }]);

    if (response.isSuccess) {
      toast.success("Vehículo eliminado correctamente", {
        description: "El vehículo ha sido eliminado exitosamente.",
        action: {
          label: "Entendido",
          onClick: () => {
            toast.dismiss();
          },
        },
      });
      router.refresh();
    } else {
      toast.error("Error al eliminar el vehículo", {
        description:
          response?.errors ||
          "Ocurrió un error al eliminar el vehículo. Por favor, intenta nuevamente.",
        action: {
          label: "Entendido",
          onClick: () => {
            toast.dismiss();
          },
        },
      });
    }
  };

  const { vehicle = [] } = props;
  return (
    <div className="w-full flex flex-wrap gap-4 h-12 ">
      {vehicle.map(({ id, name, model, year, isMain }) => (
        <div key={id} className="w-full sm:max-w-md">
          <Item
            variant="outline"
            className=" flex w-96 border-neutral-400 h-26"
          >
            <ItemContent>
              <ItemTitle className="capitalize">{name}</ItemTitle>
              <ItemDescription className="capitalize">{`${model}  (${year})`}</ItemDescription>
              {isMain && (
                <ItemDescription className="text-green-500 font-light text-xs">
                  Vehículo principal
                </ItemDescription>
              )}
            </ItemContent>
            <ItemActions className="flex gap-3">
              <PencilIcon
                className="cursor-pointer"
                onClick={() => router.push(`vehicle/${id}/edit`)}
                color="#cccccc"
              />
            </ItemActions>
            <ItemActions className="flex gap-3">
              <Trash2
                className="cursor-pointer"
                onClick={() => handleDelete(id)}
                color="#b22a2a"
              />
            </ItemActions>
          </Item>
        </div>
      ))}
    </div>
  );
};
