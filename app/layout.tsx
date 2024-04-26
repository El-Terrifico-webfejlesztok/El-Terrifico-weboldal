import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./components/navbar/NavBar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.css'
import ThemeProvider from "./components/ThemeProvider";
// sessionok
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "El Terrifico",
  description: "A legjobb mexikói eledelek a világhálón",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const theme = "retro";
  // tailwind.config.ts contains these (daisyUI theme)
  const session = await getServerSession();

  return (
    <html lang="en" >
      <body className={inter.className}>
        <SessionProvider session={session}>
          <NavBar />
          <main>{children}</main>
        </SessionProvider>
        {/** Toast container a toasthoz */}
        <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <ThemeProvider/>
      </body>
    </html>
  );
}
