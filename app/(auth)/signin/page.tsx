import { LoginUser } from "@/modules/components/register/LoginUser";
import { getProviders } from "next-auth/react";

export default async function SignInPage() {
  const providers = await getProviders();

  return <LoginUser providers={providers} />;
}
