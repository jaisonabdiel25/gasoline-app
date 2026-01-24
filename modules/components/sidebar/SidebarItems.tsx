import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { SidebarItemsProps } from "@/interface/Sidebar";
import Link from "next/link";

export const SidebarItems = (props: SidebarItemsProps) => {
  const { label, icon, path } = props;
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link
          href={path}
          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 rounded-lg cursor-pointer"
        >
          {icon}
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
