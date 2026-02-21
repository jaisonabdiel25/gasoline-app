import { SidebarItemsProps } from "@/interface/Sidebar";
import { Car, HandCoins, House, User2 } from "lucide-react";

export const SIDEBAR_OPTIONS: SidebarItemsProps[] = [
    {
    id: '0',
    label: "Dashboard",
    icon: <House />,
    path: "/",
  },
  {
    id: '1',
    label: "Pagos",
    icon: <HandCoins />,
    path: "/payment",
  },
  {
    id: '2',
    label: "Vehiculos",
    icon: <Car />,
    path: "/vehicle",
  },
    {
    id: '3',
    label: "Perfil",
    icon: <User2 />,
    path: "/profile",
  },

];