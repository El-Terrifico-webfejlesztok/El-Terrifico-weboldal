import React, { useState } from 'react';
import ShippingAddressForm from './ShippingAddressForm'; // Import your ShippingAddressForm component
import { ShippingAddress } from '@prisma/client';

const ShippingAddressView = ({ address, reload }: { address: ShippingAddress, reload: Function }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [defaultLoading, setDefaultLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)


    const handleEditClick = () => {
        setIsEditing(true);
    };


    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleDeleteClick = async () => {
        const isConfirmed = window.confirm("Biztosan törölni szeretnéd ezt a címet?");

        if (!isConfirmed) {
            return;
        }

        setDeleteLoading(true);

        try {
            const response = await fetch('/api/user/address/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ addressId: address.id }),
            });

            const responseBody = await response.json();

            if (!response.ok) {
                console.error(`Hiba a cím törlése közben: ${responseBody.error}`);
                // Handle error appropriately, e.g., show an error message to the user
            } else {
                console.log('Cím sikeresen törölve');
                // Az oldal frissítése
                reload();
            }
        } catch (error) {
            console.error('A szerver nem elérhető:', error);
            // Handle the error appropriately, e.g., show a general error message
        } finally {
            setDeleteLoading(false);
        }
    };

    // Itt intézzük el az alapértelmezés kattintást
    const handleDefaultClick = async () => {
        setDefaultLoading(true)
        const addressId = address.id;

        try {
            const response = await fetch('/api/user/address/default', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ addressId }),
            });

            const responseBody = await response.json();

            if (!response.ok) {
                console.error(`Error setting default address: ${responseBody}`);
                // Handle error appropriately, e.g., show an error message to the user
            } else {
                console.log('Default address set successfully');
                // Az oldal frissítése
                reload()
            }
        } catch (error) {
            console.error('Failed to set default address:', error);
            // Handle the error appropriately, e.g., show a general error message
        }
        finally {
            setDefaultLoading(false)
        }
    };

    return (
        <div className='collapse transition-color bg-base-200 my-1'>
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium truncate">
                Cím:  <strong>{address.postal_code}, {address.city}, {address.street_address}</strong> {address.is_default_address ? <span className='badge badge-lg badge-primary ml-4'>Alapértelmezett</span> : <></>}
            </div>
            {isEditing ? (
                // Edit Mode
                <div className='collapse-content'>
                    <ShippingAddressForm shippingAddress={address} onCancel={handleCancelClick} reload={reload} />
                </div>
            ) : (
                // View Mode
                <div className='collapse-content'>
                    <p>
                        <strong>Átvevő Neve:</strong> {address.recipient_name}
                    </p>
                    <p>
                        <strong>Irányítószám:</strong> {address.postal_code}
                    </p>
                    <p>
                        <strong>Város:</strong> {address.city}
                    </p>
                    <p>
                        <strong>Szállítási cím:</strong> {address.street_address}
                    </p>
                    <div className='space-x-2 mt-2'>
                        <button className='btn btn-sm btn-info' onClick={handleEditClick}>Módosítás</button>
                        <button className='btn btn-sm btn-error' onClick={handleDeleteClick}>Törlés</button>
                        {!address.is_default_address
                            ?
                            <button className='btn btn-sm btn-success align-bottom w-32' onClick={handleDefaultClick}>
                                {defaultLoading ? <div className=' loading loading-dots '></div> : 'Alapértelmezés'}
                            </button>
                            :
                            <></>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShippingAddressView;
