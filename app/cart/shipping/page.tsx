import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import ShippingPage from './ShippingPage';

export default async function RegisterPage() {
    // Ha a user be van jelentkezve átirányítódik a főoldalra
    const session = await getServerSession();
    if (!session) {
        redirect("/login")
    }
    else {
        return <ShippingPage />
    }
}


