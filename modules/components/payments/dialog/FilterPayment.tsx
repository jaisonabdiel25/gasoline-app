"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { FunnelIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { DateButton } from "../../dateButton/DateButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { useState } from "react";

interface FilterPaymentProps {
  from: Date;
  to: Date;
}

export function FilterPayment() {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { control, handleSubmit, resetField } = useForm<FilterPaymentProps>({
    defaultValues: {
      from: undefined,
      to: undefined,
    },
  });

  const handleFilter = (values: FilterPaymentProps) => {
    const { from, to } = values;

    const params = new URLSearchParams(searchParams.toString());

    if (from) {
      params.set("from", format(from, "yyyy-MM-dd"));
    } else {
      params.delete("from");
    }

    if (to) {
      params.set("to", format(to, "yyyy-MM-dd"));
    } else {
      params.delete("to");
    }

    router.replace(`${pathname}?${params.toString()}`);
    router.refresh();
    setOpen(false);
  };

  const handleDeleteFelters = () => {
    resetField("from");
    resetField("to");
    router.replace(pathname);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form id="FilterPayment" onSubmit={handleSubmit(handleFilter)}>
        <DialogTrigger asChild>
          <FunnelIcon width={18} height={18} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Filtrar pagos</DialogTitle>
            <DialogDescription>Filtra tus pagos realizados.</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Controller
              name="from"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title input-required">
                    Fecha desde
                  </FieldLabel>
                  <DateButton onChange={field.onChange} value={field.value} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="to"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title input-required">
                    Fecha hasta
                  </FieldLabel>
                  <DateButton onChange={field.onChange} value={field.value} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={() => handleDeleteFelters()} variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" form="FilterPayment">
              Filtrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
