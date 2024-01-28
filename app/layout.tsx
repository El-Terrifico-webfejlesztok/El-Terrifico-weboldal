import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/navbar/NavBar";
// sessionok
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "El Terrifico",
  description: "The best food on the world wide web",
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const theme = 'light';
  // light, dark, cupcake (tailwind.config.ts contains these (daisyUI theme))
  const session = await getServerSession();

  return (
    <html lang="en" data-theme={theme}>

      <body className={inter.className}>
        <SessionProvider session={session}>
          <NavBar />
          <main>{children}</main>
        </SessionProvider>
      </body>

    </html >
  );
}
