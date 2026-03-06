"use client";

import { Badge } from "./ui/badge";
import { CircleXIcon } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface Props {
  label: string;
  param: string;
}

export const CustomDeleteBadge = ({ label, param }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    console.log({ params });
    params.delete(param);

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className="relative inline-block">
      <Badge variant="secondary" className="pr-4">
        {label}
      </Badge>

      <CircleXIcon
        onClick={handleClick}
        className="absolute -top-1 -right-2 h-4 w-4 cursor-pointer bg-background rounded-full shadow"
      />
    </div>
  );
};
