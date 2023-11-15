import { getNextAuthOptions } from "./authOptions";

import NextAuth from "next-auth";

const handler = async (req: any, res: any) => {
  return NextAuth(req, res, getNextAuthOptions());
};

export { handler as GET, handler as POST };
