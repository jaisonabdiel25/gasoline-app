"use client";
import { ThemeToggle } from "@/components/ThemeToogle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLoginUser } from "@/hooks/useLoginUser";
import SignInButtons from "../signInButtons/SignInButtons";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { LoginUser as LoginUserType } from "@/interface/user";
import { signIn } from "next-auth/react";
import { Controller } from "react-hook-form";
import Link from "next/link";

type Props = {
  providers: Awaited<ReturnType<typeof import("next-auth/react").getProviders>>;
};
export const LoginUser = (props: Props) => {
  const { providers } = props;
  const { form } = useLoginUser();

  const onSubmit = async (values: LoginUserType) => {
    const { email, password } = values;
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Ingresa a tu cuenta</CardTitle>
        <CardDescription>
          Ingresa tu correo y contraseña para ingresar a tu cuenta
        </CardDescription>
        <CardAction>
          <ThemeToggle />
        </CardAction>
      </CardHeader>
      <CardContent>
        <form id="form-login-user" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Correo
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Ingrese un correo electrónico"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Contraseña
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Ingrese una contraseña"
                      autoComplete="off"
                      name="password"
                      type="password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-2 w-full">
        <CardDescription>
          Puedes crear una nueva cuenta haciendo click{" "}
          <Link href={`/register`} className="underline italic">
            aqui
          </Link>
        </CardDescription>
        <Button type="submit" form="form-login-user" className="w-full">
          Iniciar Sessión
        </Button>
        <SignInButtons providers={providers} />
      </CardFooter>
    </Card>
  );
};
