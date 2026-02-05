"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

type Props = {
  providers: Awaited<ReturnType<typeof import("next-auth/react").getProviders>>
}

export default function SignInButtons({ providers }: Props) {
  if (!providers) return null

  return (
    <>
      {Object.values(providers).map((provider) => {
        if (provider.id === "credentials") return null

        return (
          <Button
            key={provider.id}
            variant="outline"
            className="w-full"
            onClick={() =>
              signIn(provider.id, {
                redirect: true,
                callbackUrl: "/",
              })
            }
          >
            Ingresar con {provider.name}
          </Button>
        )
      })}
    </>
  )
}
