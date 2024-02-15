export default async function RootLayout({
    children,
  }: Readonly<{ children: React.ReactNode }>) {
    const theme = "retro";
    // light, dark, retro (tailwind.config.ts contains these (daisyUI theme))
  
    return (
    <body>




            <main className="">{children}</main>



            
    </body>
    );
  }