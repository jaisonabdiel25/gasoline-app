import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/modules";
import type { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Gasoline App",
  description: "Una aplicación para gestionar los pagos de gasolina de tus vehículos",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div suppressHydrationWarning>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        {children}
        <Toaster />
      </SidebarProvider>
    </div>
  );
}
