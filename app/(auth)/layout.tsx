import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gasoline App - Autenticación",
  description: "Una aplicación para gestionar los pagos de gasolina de tus vehículos",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={` h-screen w-screen flex justify-center items-center bg-ba`}
      suppressHydrationWarning
    >
      {children}
    </div>
  );
}
