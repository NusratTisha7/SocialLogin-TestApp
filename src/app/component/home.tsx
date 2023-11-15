"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();
  let [name, setName] = useState("");

  useEffect(() => {
    if (session?.user) {
      const { name }: any = session?.user;
      setName(name);
    }
  }, [session]);

  return (
    <div className="mt-3 grid grid-cols-2 gap-2">
      <p>Hello, {name}</p>
      <button
        className="ml-5 bg-white text-black rounded-md"
        onClick={() => {
          signOut();
        }}
      >
        signout
      </button>
    </div>
  );
};

export default Home;
