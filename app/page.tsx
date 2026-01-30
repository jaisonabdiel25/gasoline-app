import { redirect } from "next/navigation";

export default function Home() {
  redirect("/payment");

  return (
    <>
      <span className="text-2xl">Hola mundo</span>
    </>
  );
}
