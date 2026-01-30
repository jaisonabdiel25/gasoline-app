"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { PaymentWithRelations } from "@/interface/payment";
import { deletePayments } from "@/services";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  payments?: PaymentWithRelations[];
}
export const TablePaymentRow = (props: Props) => {
  const { payments = [] } = props;

  const router = useRouter();

  const handleDelete = async (id: string) => {
    const response = await deletePayments([{ id }]);

    if (response.isSuccess) {
      router.push("/payment");
    }
  };

  return (
    <>
      {payments.map(({ id, amount, createdAt, vehicle }) => (
        <TableRow
          key={id}
          className="border-b border-gray-400 dark:border-neutral-600"
        >
          <TableCell className="w-3xl text-center">
            {createdAt.toDateString()}
          </TableCell>
          <TableCell className="w-3xl text-center">{amount}</TableCell>
          <TableCell className="w-3xl text-center">{`${vehicle?.name} (${vehicle?.model})`}</TableCell>
          <TableCell className="text-center px-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <EllipsisVertical />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                <DropdownMenuItem>Editar</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleDelete(id)}
                  variant="destructive"
                >
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
