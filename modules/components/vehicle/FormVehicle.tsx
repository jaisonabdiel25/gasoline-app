"use client";
import { Button } from "@/components/ui/button";
import { useCreateVehicle } from "@/hooks/useCreateVehicle";
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
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { VehicleValues } from "@/interface/vehicle";
import { createVehicle } from "@/services";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const FormVehicle = () => {
  const router = useRouter();

  const { data: user } = useSession();
  const { form } = useCreateVehicle();

  const onSubmit = async (values: VehicleValues) => {
    const request = {
      ...values,
      userId: user?.user?.id,
    };
    await createVehicle([request]);

    router.push("/vehicle");
  };

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
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Nombre
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Ingrese el nombre del vehículo"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="model"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Modelo
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Ingrese el modelo del vehículo"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="year"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">Año</FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Ingrese el año del vehículo"
                      autoComplete="off"
                      name="year"
                      type="number"
                      value={field.value ?? 0}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (!isNaN(value)) {
                          field.onChange(value);
                        }
                      }}
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
        <CardFooter className="w-full flex flex-wrap gap-4">
          <Button className="flex flex-1" type="submit" form="form-rhf-demo">
            Crear
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className="flex flex-1"
          >
            Descartar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
