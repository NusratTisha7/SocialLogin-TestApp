import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import { getNextAuthOptions } from "../app/api/auth/[...nextauth]/authOptions";
import Signin from "./component/signin";
import App from "./component/home";

export default async function Home() {
  const session = await getServerSession(getNextAuthOptions());

  console.log(session);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!session && <Signin />}
      {session && <App />}
    </main>
  );
}
