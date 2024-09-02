import { NextAuthOptions } from "next-auth";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { cookies } from "next/headers";

export const getNextAuthOptions = () => {
  let rememberMe = () => {
    try {
      const cookieStore = cookies();
      return cookieStore.get("remember")?.value === "true" ? true : false;
    } catch (error: any) { }
  };

  const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async signIn({ user, account, profile }: any) {
        console.log("user", user);
        console.log("account", account);
        console.log("profile", profile);
        return true;
      },
      async redirect({ url, baseUrl }) {
        return baseUrl;
      },
      async jwt({ token, user, account, profile }) {
        console.log(
          " token, user, account, profile",
          token,
          user,
          account,
          profile
        );
        if (typeof user !== typeof undefined) {
          token.user = user;
          let { expiration }: any = user;
        }
        return token;
      },
      async session(props: any) {
        let { session, token, user } = props;
        console.log("session, token, user", session, token, user);
        if (session !== null) {
          session.user = token.user;
          session.accessToken = token.user.token;
        } else if (typeof token !== typeof undefined) {
          session.user = token;
        }
        return session;
      },
    },
    //site: process.env.NEXTAUTH_URL,
    providers: [
      GoogleProvider({
        clientId: <string>process.env.GOOGLE_CLIENT_ID,
        clientSecret: <string>process.env.GOOGLE_CLIENT_SECRET,
      }),
      FacebookProvider({
        clientId: <string>process.env.FACEBOOK_CLIENT_ID,
        clientSecret: <string>process.env.FACEBOOK_CLIENT_SECRET,
      }),
      // AppleProvider({
      //   clientId: "com.firsttrip.pre-b2c",
      //   clientSecret: "eyJhbGciOiJFUzI1NiIsImtpZCI6IkhZOTdONjNMTVIifQ.eyJleHAiOjE3MjQ5MTYzODcsImlhdCI6MTcyNDkxMjc1NywiaXNzIjoiWVVSQkE0M0E3QyIsImF1ZCI6Imh0dHBzOi8vYXBwbGVpZC5hcHBsZS5jb20iLCJzdWIiOiJjb20uZmlyc3R0cmlwLnByZS1iMmMifQ.usU1NMjGzuuMw6BfhQDNaW8CWgin0rCs8QTp82A8f36-hxnHluSgUXODT6IXjNSPyy1bL48kUDWRSyKK4Hczbg",

      // }),
      AppleProvider({
        clientId: "com.firsttrip.pre-b2c",
        clientSecret: <any>{
          teamId: "YURBA43A7C",
          privateKey:
            "eyJhbGciOiJFUzI1NiIsImtpZCI6IkhZOTdONjNMTVIifQ.eyJleHAiOjE3MjQ5MTYzODcsImlhdCI6MTcyNDkxMjc1NywiaXNzIjoiWVVSQkE0M0E3QyIsImF1ZCI6Imh0dHBzOi8vYXBwbGVpZC5hcHBsZS5jb20iLCJzdWIiOiJjb20uZmlyc3R0cmlwLnByZS1iMmMifQ.usU1NMjGzuuMw6BfhQDNaW8CWgin0rCs8QTp82A8f36-hxnHluSgUXODT6IXjNSPyy1bL48kUDWRSyKK4Hczbg",
          keyId: "HY97N63LMR",
        },
      }),
      CredentialsProvider({
        name: "Sign in",
        credentials: {
          username: {
            label: "Username",
            type: "username",
            placeholder: "example@example.com",
          },
          password: { label: "Password", type: "password" },
        },

        async authorize(credentials: any) {
          return credentials;
        },
      }),
    ],

    cookies: {
      callbackUrl: {
        name: "https://firsttrip.vercel.app",
        options: {
          httpOnly: false,
          sameSite: "none",
          path: "/",
          secure: true,
        },
      },
      pkceCodeVerifier: {
        name: "next-auth.pkce.code_verifier",
        options: {
          httpOnly: true,
          sameSite: "none",
          path: "/",
          secure: true,
        },
      },
    },

    session: {
      maxAge: rememberMe() ? (30 * 24 * 60 * 60) / 4 : (24 * 60 * 60) / 4,
    },
    jwt: {
      secret: process.env.NEXTAUTH_SECRET,
      maxAge: rememberMe() ? (30 * 24 * 60 * 60) / 4 : (24 * 60 * 60) / 4,
    },
  };

  return authOptions;
};
