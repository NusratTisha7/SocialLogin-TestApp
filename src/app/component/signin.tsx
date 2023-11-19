"use client";
import { signIn } from "next-auth/react";
// @ts-ignore
import AppleSignin from "react-apple-signin-auth";

const Signin = () => {
  const handleSignIn = async (user: any) => {
    const clientSecret = "your-client-secret";
    const idToken = user?.authorization?.id_token;
    console.log("Apple user:", idToken);
    // Handle user information as needed
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
      <p className="text-white">Counter: 8 </p>

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
            className=" cursor-pointer bg-pink-500 px-5 py-1.5 rounded-lg"
            {...props}
          >
            Faltu Login
          </button>
        )}
      />
    </div>
  );
};

export default Signin;
