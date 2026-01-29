import { Vehicle } from "@prisma/client";
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

interface Props {
  vehicle?: Vehicle[];
}

export const TableVehicle = (props: Props) => {
  const { vehicle = [] } = props;
  return (
    <Table className="w-full border-gray-600 dark:border-neutral-500">
      <TableHeader>
        <TableRow className="gap-8 border-gray-400 dark:border-neutral-600">
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">Model</TableHead>
          <TableHead className="text-center">Year</TableHead>
          <TableHead className="text-center">Fecha de creación</TableHead>
          <TableHead className="text-center"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vehicle.map(({ id, name, year, model, createdAt }) => (
          <TableRow key={id} className="border-gray-400 dark:border-neutral-600" >
            <TableCell className="w-3xl text-center">{name}</TableCell>
            <TableCell className="w-3xl text-center">{model}</TableCell>
            <TableCell className="w-3xl text-center">{year}</TableCell>
            <TableCell className="w-3xl text-center">
              {createdAt.toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <EllipsisVertical />
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
    </Table>
  );
};
