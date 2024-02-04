// https://reacthustle.com/blog/extend-user-session-nextauth-typescript
// Ne kérdezd hogy működik, csak fogadd el. (Valószínűleg ehhez tudni kéne legalább egy kicsi typescriptet)
import { DefaultSession, DefaultUser } from "next-auth";
import { User_role } from "@prisma/client";

interface IUser extends DefaultUser {
  role?: User_role;
}
declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user?: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
