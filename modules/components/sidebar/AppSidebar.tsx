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

export function AppSidebar() {
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
            <SidebarGroupLabel>Application</SidebarGroupLabel>
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
