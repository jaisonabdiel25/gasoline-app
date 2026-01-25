import { SidebarItemsProps } from "@/interface/Sidebar";
import { Car, ChartColumnIcon, LayoutDashboard } from "lucide-react";

export const SIDEBAR_OPTIONS: SidebarItemsProps[] = [
  {
    id: '1',
    label: "Dashboard",
    icon: <LayoutDashboard />,
    path: "/payment",
  },
  {
    id: '2',
    label: "Vehicles",
    icon: <Car />,
    path: "/vehicle",
  },
  {
    id: '3',
    label: "Fuel Records",
    icon: <ChartColumnIcon />,
    path: "/payment",
  },
];