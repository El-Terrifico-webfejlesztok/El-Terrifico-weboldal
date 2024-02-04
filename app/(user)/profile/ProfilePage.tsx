'use client'
import { useSession } from 'next-auth/react';
import React from 'react'



const ProfilePage = () => {
    const { data: session, status: sessionStatus } = useSession();
    // should go unused
    if (sessionStatus === 'loading') {
        return <div>Loading...</div>;
    }
    // There is always a session, it's just not checked here. Hence the '!'
    const user = session!.user!;
    return (
        <div className='mx-auto max-w-4xl mt-4'>
            <div className='flex space-x-4'>
                <img src="" alt="" />
                <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
            </div>
            <div className="space-y-4">
                <div>
                    <strong>Jogosultság:</strong> {user.role}
                </div>
                <div>
                    <strong>Email:</strong> {user.email}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage