'use client'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { Order, Payment, Review, ShippingAddress, User_role } from '@prisma/client';
import ShippingAddressView from '@/app/components/user/shipping/ShippingAddressView';
import ShippingAddressForm from '@/app/components/user/shipping/ShippingAddressForm';
import UserProfileSettings from '@/app/components/user/profile/UserProfileSettings';
import { UserView } from '@/app/components/user/profile/UserProfileSettings';
import ProfileStats from '@/app/components/user/profile/ProfileStats';


export interface userData {
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
    const [isEditing, setIsEditing] = useState(false);
    const [userView, setUserView] = useState<UserView>();

    const handleAddressEditClick = () => {
        setIsEditing(true);
    };

    const handleAddressCancelClick = () => {
        setIsEditing(false);
    };

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
                {/**Construct the user data from the response */ }
                setUserView({
                    id: data.id,
                    username: data.username,
                    email: data.email,
                    image: data.image,
                    role: data.role,
                    created_at: data.created_at,
                })
                console.log(userView)
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
        <div className='px-2 max-w-4xl mx-auto  mt-4'>

            <div className='text-center mt-12'>
                <h1 className="text-2xl  mb-4">Üdvözlünk <strong>{user.name}</strong>!</h1>
                Email: <strong>{user.email}</strong>
            </div>

            <div className='text-center mt-4'>
                <ProfileStats userdata={userData} />
            </div>



            <div id='address' className="divider py-4">Szállítási címek</div>

            {/** This is for displaying all of the shipping addresses the user has */}
            <div>
                {userData && userData.ShippingAddress.length > 0 ? (
                    userData.ShippingAddress.map((address) => (
                        <ShippingAddressView key={address.id} address={address} reload={fetchData} />
                    ))
                ) : (
                    loading ? <div className='mx-auto loading loading-dots'></div> :
                        <p className='text-center truncate mb-4 font-bold'>Még nincsenek szállítási címeid</p>
                )}
            </div>

            {/** Show the editing page if the user requests to add an address */}
            {isEditing ? (
                // Edit Mode
                <ShippingAddressForm onCancel={handleAddressCancelClick} reload={fetchData} />
            ) : (
                <button className='btn btn-primary  w-full no-animation mt-0' onClick={handleAddressEditClick}><p className={loading ? "loading" : ""}>Szállítási cím hozzáadása</p></button>

            )}


            <div id='order' className="divider py-4">Rendelések</div>
            <button className='btn btn-outline w-full no-animation' onClick={fetchData}><p className={loading ? "loading" : ""}>Adatok lekérése</p></button>
            <div id='settings' className="divider py-4">Fiókbeállítások</div>

            {userView ?
                <UserProfileSettings key={user.id} reload={fetchData} user={userView} />
                :
                <></>}


        </div>
    );
}

export default ProfilePage