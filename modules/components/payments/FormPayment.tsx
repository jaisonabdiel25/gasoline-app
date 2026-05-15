"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreatePayment } from "@/hooks/useCreatePayment";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { Vehicle } from "@/interface/vehicle";
import { CustomSelect } from "@/components/CustomSelect";
import { useMemo } from "react";

interface Props {
  vehicles: Vehicle[];
}

export const FormPayment = (props: Props) => {
  const { vehicles = [] } = props;
  const { form, onSubmit, handleDiscarted } = useCreatePayment({ vehicles });

  const listVehicles = useMemo(() => {
    return (
      vehicles?.map((vehicle) => ({
        id: vehicle.id,
        label: `${vehicle.name} ${vehicle.model ? `(${vehicle.model})` : ""}`,
      })) ?? []
    );
  }, [vehicles]);

  return (
    <div className=" w-full flex justify-center items-center">
      <Card
        className="w-full sm:max-w-md"
        style={{ background: "var(--card-background)" }}
      >
        <CardHeader>
          <CardTitle>Agrega un vehiculo a tu usuario</CardTitle>
          <CardDescription>
            Si ya tienes vehiculos registrados, podras agregar otros como
            opcionales.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="w-full">
              <Controller
                name="amount"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title input-required">
                      Monto
                    </FieldLabel>
                    <Input
                      {...field}
                      type="number"
                      name="amount"
                      value={field.value ?? 0}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (!isNaN(value)) {
                          field.onChange(value);
                        }
                      }}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Ingrese el monto de pago"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="vehicleId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="w-full" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title input-required">
                      Vehiculo
                    </FieldLabel>
                    <CustomSelect
                      onChange={(e: string) => {
                        field.onChange(e);
                      }}
                      data={listVehicles}
                      defaultValue={field.value}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" type="submit" form="form-rhf-demo">
            Registra Pago
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleDiscarted()}
            className="w-full"
          >
            Descartar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
