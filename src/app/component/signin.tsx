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

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
 
  const handleSignIn = async (user: any) => {
    console.log("user",user)
    const idToken = user?.authorization?.id_token;
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
        onClick={() => signIn("facebook")}
      >
        <p className="ml-1 text-xs text-[#575757]">Sign in with Facebook</p>
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
      <p className="text-white">Counter: 11 </p>

      <AppleSignin
        authOptions={{
          clientId: "com.firsttrip.pre-b2c",
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
            
            {...props}
          >
            Ami Gumabo 😴
          </button>
        )}
      />

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
