import RootLayout from "@/app/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil"
};

export default async function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
    </>
  );
}