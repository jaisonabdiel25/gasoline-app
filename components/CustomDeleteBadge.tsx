import React from "react";
import { Badge } from "./ui/badge";
import { CircleXIcon } from "lucide-react";

export const CustomDeleteBadge = () => {
  return (
    <div className="relative inline-block">
      <Badge variant="secondary" className="pr-4">
        prueba
      </Badge>

      <CircleXIcon
        className="absolute -top-1 -right-2 h-4 w-4 cursor-pointer bg-background rounded-full shadow"
      />
    </div>
  );
};

