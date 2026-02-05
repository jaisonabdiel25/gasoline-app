import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);


  return (
    <>
      <span className="text-2xl">Hola mundo</span>
      {JSON.stringify(session?.user)}
    </>
  );
}
