import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Form from './Form';

export default async function RegisterPage() {
    // Ha a user be van jelentkezve átirányítódik a főoldalra
    const session = await getServerSession();
    if (session) {
        redirect("/")
    }
    return <Form />
}


