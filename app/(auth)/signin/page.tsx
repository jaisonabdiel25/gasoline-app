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
import { Label } from "@/components/ui/label";
import SignInButtons from "@/modules/components/signInButtons/SignInButtons";
import { getProviders } from "next-auth/react";

export default async function SignInPage() {
  const providers = await getProviders();

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
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Correo</Label>
              <Input
                id="email"
                type="email"
                placeholder="ejemplo@ejemplo.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Contraseña</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  ¿Olvido la contraseña?
                </a>
              </div>
              <Input id="password" type="password" required placeholder="ingrese su contraseña" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2 w-full">
        <Button type="submit" className="w-full">
          Iniciar Sessión
        </Button>
        <SignInButtons providers={providers} />
      </CardFooter>
    </Card>
  );
}
