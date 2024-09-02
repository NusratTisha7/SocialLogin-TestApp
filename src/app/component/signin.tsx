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

  const handleGoogleSignIn = async () => {
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    // Use NextAuth's signIn function with redirect: false to get the URL
    const response = await signIn('google', { redirect: false });

    if (response?.url) {
      // Open the Google sign-in page in a new popup window
      const popup = window.open(
        response.url,
        'GoogleSignIn',
        `width=${width},height=${height},top=${top},left=${left}`
      );

      if (!popup) {
        alert('Popup blocked! Please allow popups for this website.');
        return;
      }

      // Listen for when the popup closes
      const popupInterval = setInterval(() => {
        if (popup.closed) {
          clearInterval(popupInterval);
          // Optionally, refresh the page or do something else after the popup is closed
          window.location.reload(); // This will reload the page to check if the user is logged in
        }
      }, 500);
    } else {
      console.error('Error fetching Google sign-in URL');
    }
  };


  return (
    <div className="mt-3 grid grid-cols-2 gap-2">
      <div
        className="flex cursor-pointer items-center justify-center rounded-lg bg-[#F6F6F6] p-3"
        onClick={handleGoogleSignIn}
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
      <p className="text-white">Counter: 19 </p>

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
