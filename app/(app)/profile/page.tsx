import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { UserInfo } from "@/modules/components/pagination/profile/UserInfo";
import { getServerSession } from "next-auth";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id ?? undefined,
    },
  });

  return <UserInfo user={user} />;
};

export default ProfilePage;
