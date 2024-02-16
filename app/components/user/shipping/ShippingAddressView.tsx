import React, { useState } from 'react';
import ShippingAddressForm from './ShippingAddressForm'; // Import your ShippingAddressForm component
import { ShippingAddress } from '@prisma/client';

const ShippingAddressView = ({ address }: { address: ShippingAddress }) => {

    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };


    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const handleDeleteClick = () => {

    };

    const handelDefaultClick = () => {

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
                    <ShippingAddressForm shippingAddress={address} onCancel={handleCancelClick} />
                </div>
            ) : (
                // View Mode
                <div className='collapse-content'>
                    <p>
                        <strong>Átvevő Neve:</strong> {address.recipient_name}
                    </p>
                    <p>
                        <strong>Postal Code:</strong> {address.postal_code}
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
                        {!address.is_default_address ? <button className='btn btn-sm btn-success' onClick={handelDefaultClick}>Alapértelmezés</button> : <></>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShippingAddressView;
