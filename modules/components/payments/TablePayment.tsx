import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { PaymentWithRelations } from "@/interface/payment";
import { TablePaymentRow } from "./TablePaymentRow";
import { FilterPayment } from "./dialog/FilterPayment";

interface Props {
  payments?: PaymentWithRelations[];
}

export const TablePayment = (props: Props) => {
  const { payments = [] } = props;
  return (
    <>
      <div className="w-full flex justify-end px-4 mt-4">
        <FilterPayment />
      </div>
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
          <TablePaymentRow payments={payments} />
        </TableBody>
      </Table>
    </>
  );
};
