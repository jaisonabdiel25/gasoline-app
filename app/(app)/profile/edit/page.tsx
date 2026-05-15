import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ResgisterUser } from "@/modules/components/register/ResgisterUser";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id ?? undefined,
    },
  });

  if (!user) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span className="text-2xl font-mono">Usuario no encontrado</span>
      </div>
    );
  }


  return (
    <div className="w-full h-screen flex items-center justify-center">
      <ResgisterUser isEdit={true} user={user} />
    </div>
  );
};

export default page;
