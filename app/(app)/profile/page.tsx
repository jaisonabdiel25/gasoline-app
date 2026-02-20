"use client";

import { CustomAvatar } from "@/modules/components/avatar/CustomAvatar";
import { useSession } from "next-auth/react";
const ProfilePage = () => {
  const { data: user } = useSession();

  return (
    <div className="w-full flex flex-col items-center p-10 gap-5">
      <CustomAvatar
        avatarUrl={
          user?.user?.image ?? "https://www.gravatar.com/avatar/?d=mp&s=200"
        }
        className="w-40 h-40"
      />
      <span className="text-3xl font-mono">{user?.user?.name}</span>
      <div className="w-full max-w-2xl p-4 border rounded-md bg-white/10">
        <span className="text-xs font-mono wrap-break-word" > {JSON.stringify(user)}</span>
      </div>
    </div>
  );
};

export default ProfilePage;
