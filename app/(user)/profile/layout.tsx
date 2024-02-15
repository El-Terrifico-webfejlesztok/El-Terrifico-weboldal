export default async function RootLayout({
    children,
  }: Readonly<{ children: React.ReactNode }>) {
    const theme = "retro";
    // light, dark, retro (tailwind.config.ts contains these (daisyUI theme))
    const session = await getServerSession();
  
    return (
    <body>




            <main className="">{children}</main>



            
    </body>
    );
  }