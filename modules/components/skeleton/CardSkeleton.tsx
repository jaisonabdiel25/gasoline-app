
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface Props {
  className: string;
}

export const CardSkeleton = ({ className }: Props) => {
  return (
    <div className={className}>
      <Skeleton className="aspect-video w-full h-full" />
    </div>
  );
};
