"use client";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Wind } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  title: string;
  description: string;
  labelButton: string;
  route?: string;
  resetparams?: boolean;
}

export function CusomEmpty({
  title,
  description,
  labelButton,
  route,
  resetparams,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    if (resetparams) {
      router.replace(pathname); // elimina todos los searchParams
      router.refresh(); // recarga la página para reflejar los cambios
      return;
    }
    if (route) {
      router.push(route);
      return;
    }
  };

  return (
    <Empty className="border border-dashed border-gray-500 dark:border-gray-600">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Wind />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm" onClick={handleClick}>
          {labelButton}
        </Button>
      </EmptyContent>
    </Empty>
  );
}
