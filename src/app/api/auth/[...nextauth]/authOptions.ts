import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

export const getNextAuthOptions = () => {
  let rememberMe = () => {
    try {
      const cookieStore = cookies();
      return cookieStore.get("remember")?.value === "true" ? true : false;
    } catch (error: any) {}
  };

  const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async signIn({ user, account, profile }: any) {
        console.log("Apple", user, account, profile);
        return true;
      },
      async jwt({ token, user, account, profile }) {
        if (typeof user !== typeof undefined) {
          token.user = user;
          let { expiration }: any = user;
        }
        return token;
      },
      async session(props: any) {
        let { session, token, user } = props;
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
      AppleProvider({
        clientId: <string>process.env.APPLE_CLIENT_ID,
        clientSecret: <any>process.env.APPLE_PRIVATE_KEY,
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
