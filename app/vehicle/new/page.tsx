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

const CreateVehiclePage = () => {
  const { form } = useCreateVehicle();

  const onSubmit = async (values: VehicleValues) => {
    const request = {
      ...values,
      //TODO: ajustar al usuario en curso
      userId: "b2f1409d-6103-4a39-973f-3acb034ce06f",
    };
    await createVehicle([request]);
  };

  return (
    <div className=" w-full flex justify-center items-center" >
      <Card className="w-full sm:max-w-md" style={{background: "var(--card-background)",}}>
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
                      placeholder="Login button not working on mobile"
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
                      placeholder="Login button not working on mobile"
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
                      placeholder="Login button not working on mobile"
                      autoComplete="off"
                      name="year"
                      type="number"
                      onChange={(e) =>
                        !isNaN(field.value) &&
                        field.onChange(Number(e.target.value))
                      }
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

export default CreateVehiclePage;
