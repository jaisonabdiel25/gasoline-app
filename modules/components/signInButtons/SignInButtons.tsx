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
          <Button variant="outline" className="w-full"
            key={provider.id}
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Ingresar con {provider.name}
          </Button>
        )
      })}
    </>
  )
}
