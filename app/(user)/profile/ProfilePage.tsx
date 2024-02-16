'use client'
import { fetchData } from 'next-auth/client/_utils';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { Order, Payment, Review, ShippingAddress, User_role } from '@prisma/client';
import Loading from '@/app/components/Loading';
import ShippingAddressView from '@/app/components/user/shipping/ShippingAddressView';

interface userData {
    id: number;
    username: string;
    email: string;
    image: string | null;
    role: User_role;
    created_at: Date;
    Order: [Order];
    Payment: [Payment];
    Review: [Review];
    ShippingAddress: [ShippingAddress]
}

const ProfilePage = () => {
    const [userData, setUserData] = useState<userData | null>(null);
    const [loading, setLoading] = useState(true);

    async function fetchData() {
        setLoading(true)
        try {
            // Make a GET request to the API
            const response = await fetch('/api/user/settings', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Include any necessary headers, like authorization headers if needed
                },
            });

            // Check if the response is successful (status code 200-299)
            if (response.ok) {
                // Parse the JSON data from the response
                const data = await response.json();
                console.log('API Response:', data);
                setUserData(data)
            } else {
                // Handle error responses
                console.error('Error:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('An error occurred during the fetch:', error);
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const { data: session, status: sessionStatus } = useSession();
    // should go unused
    /*if (sessionStatus === 'loading') {
        return <div>Loading...</div>;
    }*/
    // There is always a session, it's just not checked here. Hence the '!'
    const user = session!.user!;
    return (
        <div className='mx-auto max-w-4xl mt-4'>
            <div className='flex space-x-4'>
                <h1 className="text-2xl  mb-4">Üdvözlünk <strong>{user.name}</strong>!</h1>
            </div>
            <div className="space-y-4">
                <div>
                    ID: <strong>{user.id}</strong>
                </div>
                <div>
                    Jogosultság: <strong>{user.role}</strong>
                </div>
                <div>
                    Email: <strong>{user.email}</strong>
                </div>
                <div className="divider">Szállítási címek</div>


                <div>
                    {userData && userData.ShippingAddress.length > 0 ? (
                        userData.ShippingAddress.map((address) => (
                            <ShippingAddressView key={address.id} address={address} />
                        ))
                    ) : (
                        <p className='text-center truncate'>Még nincsenek szállítási címeid</p>
                    )}                
                </div>
                <button className='btn  w-full no-animation mt-0' onClick={fetchData}><p className={loading ? "loading" : ""}>Szállítási cím hozzáadása</p></button>


                <div className="divider">Rendelések</div>
                <button className='btn btn-outline w-full no-animation' onClick={fetchData}><p className={loading ? "loading" : ""}>Adatok lekérése</p></button>



            </div>
        </div >
    );
}

export default ProfilePage