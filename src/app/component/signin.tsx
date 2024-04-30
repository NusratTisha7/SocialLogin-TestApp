"use client";
import { signIn } from "next-auth/react";
// @ts-ignore
import jwt from "jsonwebtoken";
// @ts-ignore
import AppleSignin from "react-apple-signin-auth";
import { useEffect, useState } from "react";

interface UserInfo {
  userId: string;
  email: string;
  name: string;
  emailVerified: string;
  otherClaims: string;
}

const SignIn = () => {
  const [os, setOs]: any = useState(null);
  const [data, setData] = useState("");

  useEffect(() => {
    if (navigator && navigator.userAgent) {
      const userAgent = navigator.userAgent;
      setData(userAgent);
      const mobileOsRegex = /Android|iOS|iPadOS|Windows Phone/i;
      const osMatch = mobileOsRegex.exec(userAgent);

      if (osMatch) {
        setOs(osMatch[0]);
      } else {
        setOs("Non-Mobile OS");
      }
    } else {
      console.warn(
        "navigator.userAgent is not available. Mobile OS detection might not work."
      );
    }
  }, []);

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const appleClientSecret = {
    teamId: "YURBA43A7C",
    privateKey:
      "eyJhbGciOiJFUzI1NiIsImtpZCI6IkoyNjlOVk1CNTMifQ.eyJleHAiOjE3MDMwMTM0NjIsImlhdCI6MTcwMDQyMTQzMiwiaXNzIjoiWVVSQkE0M0E3QyIsImF1ZCI6Imh0dHBzOi8vYXBwbGVpZC5hcHBsZS5jb20iLCJzdWIiOiJhcHAudmVyY2VsLmZpcnN0dHJpcC50ZXN0In0.GQz02s5iST6vcC8fl0z0XUF6hbs0gjIVbRA8yrCvFGZHC0ZmVSsPBOWq4MWgnhWhIotF8tzW5Bxlw_YY6lCJ0Q",
    keyId: "J269NVMB53",
  };

  const handleSignIn = async (user: any) => {
    const idToken = user?.authorization?.id_token;

    console.log("Apple user:", idToken);
    const decodedToken = jwt.decode(idToken, { complete: true });
    if (decodedToken) {
      const {
        sub: userId,
        email,
        email_verified: emailVerified,
        name,
        ...otherClaims
      } = decodedToken.payload;

      setUserInfo({ userId, email, name, emailVerified, otherClaims });
      console.log("User ID:", userId);
      console.log("Full Name:", name);
      console.log("Email:", email);
      console.log("Email Verified:", emailVerified);
      console.log("Other Claims:", otherClaims);
    } else {
      console.error("Failed to decode id_token");
    }
  };
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
        onClick={() =>
          signIn(
            "apple",
            {
              callbackUrl:
                "https://firsttrip.vercel.app/api/auth/callback/apple",
            },
            {
              redirect_uri:
                "https://firsttrip.vercel.app/api/auth/callback/apple",
            }
          )
        }
      >
        <p className="ml-1 text-xs text-[#575757]">Sign in with Apple</p>
      </div>
      <p className="text-white">Counter: 9 </p>

      <AppleSignin
        authOptions={{
          clientId: "app.vercel.firsttrip.test",
          scope: "email name",
          redirectURI: "https://firsttrip.vercel.app/api/auth/callback/apple",
          state: "state",
          nonce: "nonce",
          usePopup: true,
        }}
        uiType="dark"
        className="apple-auth-btn"
        noDefaultStyle={false}
        buttonExtraChildren="Continue with Apple"
        onSuccess={handleSignIn}
        onError={(error: any) => console.error(error)}
        iconProp={{ style: { marginTop: "10px" } }}
        render={(props: any) => (
          <button
            className=" cursor-pointer text-sm text-black bg-white px-5 py-2 rounded-lg"
            onClick={() =>
              signIn("apple", {
                callbackUrl:
                  "https://firsttrip.vercel.app/api/auth/callback/apple",
                clientSecret: appleClientSecret,
              })
            }
            {...props}
          >
            Ami Gumabo 😴
          </button>
        )}
      />

      <div>
        {os && <p>You are on a {os} device.</p>}
        Data: {data}
      </div>

      {userInfo && (
        <>
          <p className="text-white">User ID: {userInfo.userId}</p>
          <p className="text-white">Email: {userInfo.email}</p>
        </>
      )}
    </div>
  );
};

export default SignIn;
