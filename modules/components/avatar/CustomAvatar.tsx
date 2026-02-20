"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  avatarUrl: string;
  className?: string;
  userFallback?: string;
}

export const CustomAvatar = (props: Props) => {
  const { avatarUrl, className, userFallback } = props;
  return (
    <Avatar className={className}>
      <AvatarImage src={avatarUrl} alt="@shadcn" />
      <AvatarFallback>{userFallback}</AvatarFallback>
    </Avatar>
  );
};
