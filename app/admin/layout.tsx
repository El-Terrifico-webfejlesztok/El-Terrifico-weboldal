import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation';
import AdminLinks from "../components/admin/AdminLinks";
import { authOptions } from "../api/auth/[...nextauth]/auth";

export default async function ProfileLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    // Ha nem admin az user akkor nem kapja meg az admin oldalakat. Simple as.

    // Hasonló az API-hoz mert ez is szerver komponens
    const session = await getServerSession(authOptions);
    // Ellenőrzés
    if (!session || session?.user?.role !== 'admin') {
        // Redirect ha nem admin
        redirect("/")
    }
    else {
        // Admin oldal
        return (
            <>
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col items-center justify-center">
                        {children}

                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                            <p className="text-lg truncate pb-7">Üdvözöljük, adminisztrátor</p>
                            <AdminLinks />
                        </ul>

                    </div>
                </div>
            </>
        );
    }
}