"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/zustand/store/useUserStore";

interface Props {
  avatarUrl: string;
  className?: string;
  userFallback?: string;
}

export const CustomAvatar = (props: Props) => {
  const { avatarUrl, className, userFallback } = props;

  const { userUrl } = useUserStore();
  return (
    <Avatar className={className}>
      <AvatarImage src={userUrl ?? avatarUrl} alt="@shadcn" className="object-cover" />
      <AvatarFallback>{userFallback}</AvatarFallback>
    </Avatar>
  );
};
