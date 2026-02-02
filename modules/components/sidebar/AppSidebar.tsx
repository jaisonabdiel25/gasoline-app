import { ThemeToggle } from "@/components/ThemeToogle";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { SIDEBAR_OPTIONS } from "@/constant";
import { SidebarItems } from "./SidebarItems";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CustomAvatar } from "../avatar/CustomAvatar";

export async function AppSidebar() {
  const session = await getServerSession(authOptions);

  const userName = session?.user?.name ?? "";

  const avatarUrl = session?.user?.image
    ? session?.user?.image
    : "https://www.gravatar.com/avatar/?d=mp&s=200";

  return (
    <Sidebar collapsible="icon">
      <div
        style={{
          height: "100%",
          width: "100%",
          background: "var(--sidebar-background)",
        }}
      >
        <SidebarContent>
          <SidebarGroup>
            <div className="flex items-center justify-between px-3">
              <div className="flex flex-col w-full justify-start gap-4">
              <CustomAvatar avatarUrl={avatarUrl} />
              <SidebarGroupLabel>{userName}</SidebarGroupLabel>

              </div>
              <ThemeToggle />
            </div>
            <SidebarGroupContent className="mt-4">
              <SidebarMenu>
                {SIDEBAR_OPTIONS.map((item) => (
                  <SidebarItems key={item.id} {...item} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
