import { Payment } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  payments?: Payment[];
}

export const TablePayment = (props: Props) => {
  const { payments = [] } = props;
  return (
    <Table className="border-2 shadow-card rounded-lg w-full max-w-2xl">
      <TableHeader>
        <TableRow className="gap-8">
          <TableHead className="text-center">Fecha</TableHead>
          <TableHead className="text-center">Monto</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map(({ id, amount, createdAt }) => (
          <TableRow key={id}>
            <TableCell className="w-3xl text-center">{createdAt.toLocaleDateString()}</TableCell>
            <TableCell className="w-3xl text-center">{amount}</TableCell>
            <TableCell className="w-3xl text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">Acciones</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
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
      <TableFooter>
        <TableRow  >
          <TableCell className="text-center"  colSpan={2}>Total</TableCell>
          <TableCell colSpan={0} className="text-left">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
