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
import { Vehicle } from "@/interface/vehicle";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  vehicle?: Vehicle;
  isEdit?: boolean;
}

export const FormVehicle = (props: Props) => {
  const { vehicle, isEdit = false } = props;
  const { form, handleReset, onSubmit } = useCreateVehicle({ vehicle, isEdit });

  return (
    <div className=" w-full flex justify-center items-center">
      <Card
        className="w-full sm:max-w-md"
        style={{ background: "var(--card-background)" }}
      >
        <CardHeader>
          <CardTitle>{isEdit ? "Editar Vehículo" : "Agregar un Vehículo a tu perfil"}</CardTitle>
          <CardDescription>
            {isEdit
              ? "Modifica los detalles de tu vehículo"
              : "Completa el formulario para agregar un nuevo vehículo a tu perfil"}
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
              <Controller
                name="isMain"
                control={form.control}
                render={({ field }) => (
                  <Field orientation="horizontal">
                    <Checkbox
                      id="terms-checkbox-basic"
                      name="terms-checkbox-basic"
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
                    />
                    <FieldLabel htmlFor="terms-checkbox-basic">
                      Establecer como vehículo principal
                    </FieldLabel>
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="w-full flex flex-wrap gap-4">
          <Button className="flex flex-1" type="submit" form="form-rhf-demo">
            {isEdit ? "Actualizar" : "Crear"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleReset()}
            className="flex flex-1"
          >
            Descartar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
