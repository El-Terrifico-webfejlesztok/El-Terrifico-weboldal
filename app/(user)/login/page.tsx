import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Form from './form';

export default async function LoginPage() {
    // Ha a user be van jelentkezve átirányítódik a főoldalra
    const session = await getServerSession();
    if (session) {
        redirect("/")
    }
    return <Form />
}


