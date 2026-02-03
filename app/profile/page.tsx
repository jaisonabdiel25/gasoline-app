"use client";

import { CustomAvatar } from "@/modules/components/avatar/CustomAvatar";
import { useSession } from "next-auth/react";
const ProfilePage = () => {
  const { data: user } = useSession();

  return (
    <div className="w-full flex flex-col items-center p-20 gap-5">
      <CustomAvatar
        avatarUrl={
          user?.user?.image ?? "https://www.gravatar.com/avatar/?d=mp&s=200"
        }
        className="w-40 h-40"
      />
      <h1 className="text-3xl font-light">{user?.user?.name}</h1>
      {JSON.stringify(user)}
    </div>
  );
};

export default ProfilePage;
