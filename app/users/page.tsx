import React from 'react'

interface User {
    id: number;
    name: string;
}

const UserPage = async () => {
    const res = await fetch(
        'https://jsonplaceholder.typicode.com/comments?postId=1',

        // Default behaviour is never, meaning it is a staic page. 

        // How often the page should be refreshed in seconds 
        // { next: { revalidate: 10 } }

        // Don't use cache at all
        {cache: 'no-store'}
         )
    const users: User[] = await res.json();

    return (
        <>
            <p> we WILL print it out</p>
            <p>{new Date().toLocaleTimeString()}</p>
            <ul>
                {users.map(user =>
                    <li key={user.id}>{user.name}</li>)}
            </ul>
            <div>UserPage</div>
        </>
    )
}

export default UserPage