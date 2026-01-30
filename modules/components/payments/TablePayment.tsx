import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { PaymentWithRelations } from "@/interface/payment";

interface Props {
  payments?: PaymentWithRelations[];
}

export const TablePayment = (props: Props) => {
  const { payments = [] } = props;
  return (
    <Table className="shadow-card rounded-lg w-full border-gray-600 dark:border-neutral-500">
      <TableHeader>
        <TableRow className="gap-8 border-gray-400 dark:border-neutral-600">
          <TableHead className="text-center">Fecha</TableHead>
          <TableHead className="text-center">Monto</TableHead>
          <TableHead className="text-center">Vehiculo</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map(({ id, amount, createdAt, vehicle }) => (
          <TableRow
            key={id}
            className="border-b border-gray-400 dark:border-neutral-600"
          >
            <TableCell className="w-3xl text-center">
              {createdAt.toLocaleDateString()}
            </TableCell>
            <TableCell className="w-3xl text-center">{amount}</TableCell>
            <TableCell className="w-3xl text-center">{`${vehicle?.name} (${vehicle?.model})`}</TableCell>
            <TableCell className="text-center px-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <EllipsisVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
