import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { SIDEBAR_OPTIONS } from "@/constant";
import { SidebarItems } from "./SidebarItems";
import { getServerSession } from "next-auth";

import { CustomAvatar } from "../avatar/CustomAvatar";

import Link from "next/link";
import { SidebarFooter as CustomSidebarFooter } from "./SidebarFooter";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function AppSidebar() {
  const session = await getServerSession(authOptions);

  const userName = session?.user?.name ?? "";

  const avatarUrl = session?.user?.image
    ? session?.user?.image
    : "https://www.gravatar.com/avatar/?d=mp&s=200";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent
        style={{
          height: "100%",
          width: "100%",
          background: "var(--app-background)",
        }}
      >
        <SidebarGroup>
          <div className="flex items-center mt-4">
            <div className="flex w-full justify-start">
              <SidebarGroupLabel>
                <Link href={`/profile`}>
                  <CustomAvatar avatarUrl={avatarUrl} />
                </Link>
              </SidebarGroupLabel>
              <SidebarGroupLabel>{userName}</SidebarGroupLabel>
            </div>
            <SidebarGroupLabel>
              <ThemeToggle />
            </SidebarGroupLabel>
          </div>
          <SidebarGroupContent className="mt-4">
            <SidebarMenu>
              {SIDEBAR_OPTIONS.map((item) => (
                <SidebarItems key={item.id} {...item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarFooter className="mt-auto">
              <CustomSidebarFooter />
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
