"use client";
import { signIn } from "next-auth/react";

const Signin = () => {
  return (
    <div className="mt-3 grid grid-cols-2 gap-2">
      <div
        className="flex cursor-pointer items-center justify-center rounded-lg bg-[#F6F6F6] p-3"
        onClick={() => signIn("google")}
      >
        <p className="ml-1 text-xs text-[#575757]">Sign in with Google</p>
      </div>
      <div
        className="flex cursor-pointer items-center justify-center rounded-lg bg-[#F6F6F6]"
        onClick={() => signIn("apple", { callbackUrl: 'https://firsttrip.vercel.app/api/auth/callback/apple' },
          { redirect_uri: "https://firsttrip.vercel.app/api/auth/callback/apple" })}
      >
        <p className="ml-1 text-xs text-[#575757]">Sign in with Apple</p>
      </div>
      <p className="text-white">Counter: 6</p>
    </div>
  );
};

export default Signin;
