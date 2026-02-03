"use client";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Balloon, LogInIcon, LogOut } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

export const SidebarFooter = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            className="flex items-center justify-center gap-2 px-4 py-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg cursor-pointer"
          >
            <div>
              <Balloon /> Espere...
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  if (status === "unauthenticated") {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            className="flex items-center justify-center gap-2 px-4 py-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg cursor-pointer"
          >
            <div onClick={() => signIn()}>
              <LogInIcon /> Iniciar Sesión
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          className="flex items-center gap-2 px-4 py-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-lg cursor-pointer"
        >
          <div onClick={() => signOut()}>
            <LogOut /> Cerrar sesión
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
