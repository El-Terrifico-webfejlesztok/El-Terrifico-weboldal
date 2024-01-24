import React from 'react'

interface User {
    id: number;
    name: string;
    email: string;
}

const UserPage = async () => {
    const res = await fetch(
        'https://jsonplaceholder.typicode.com/comments?postId=1',

        // Default behaviour is never, meaning it is a staic page. 

        // How often the page should be refreshed in seconds 
        // { next: { revalidate: 10 } }

        // Don't use cache at all
        { cache: 'no-store' }
    )
    const users: User[] = await res.json();

    return (
        <>
            <p>{new Date().toLocaleTimeString()}</p>
            <table className='table table-fixed'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user =>
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>)}
                </tbody>

            </table>
        </>
    )
}

export default UserPage