import { ShippingAddress } from '@prisma/client';
import React, { useState } from 'react';

const ShippingAddressForm = ({ shippingAddress, onCancel }: { shippingAddress: ShippingAddress, onCancel?: () => void }) => {
    const [recipientName, setRecipientName] = useState<string>(shippingAddress.recipient_name || '');
    const [streetAddress, setStreetAddress] = useState<string>(shippingAddress.street_address || '');
    const [country, setCountry] = useState<string>('Magyarország');
    const [city, setCity] = useState<string>(shippingAddress.city || '');
    const [state, setState] = useState<string>(shippingAddress.state || '');
    const [postalCode, setPostalCode] = useState<string>(shippingAddress.postal_code || '');

    const inputlook = 'input input-bordered w-full';

    return (
        <>
            <form className='flex flex-col gap-3 mx-auto p-2'>
                <div>
                    <label className='form-control' htmlFor='recipientName'>
                        Átvevő Neve:
                    </label>
                    <input
                        className={inputlook}
                        type='text'
                        id='recipientName'
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                    />
                </div>
                <div className='flex space-x-2 justify-between'>
                    <div className='flex-grow'>
                        <label className='form-control' htmlFor='postalCode'>
                            Irányítószám
                        </label>
                        <input
                            className={inputlook}
                            type='text'
                            id='postalCode'
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                    </div>
                    <div className='flex-grow'>
                        <label className='form-control' htmlFor='city'>
                            Város:
                        </label>
                        <input
                            className={inputlook}
                            type='text'
                            id='city'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>

                </div>
                <div>
                    <label className='form-control' htmlFor='streetAddress'>
                        Szállítási cím (utca, házszám, emelet, ajtó):
                    </label>
                    <input
                        className={inputlook}
                        type='text'
                        id='streetAddress'
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                    />
                </div>
                <div className='hidden'>
                    <label className='form-control' htmlFor='country'>
                        Ország:
                    </label>
                    <input
                        className={inputlook}
                        type='text'
                        id='country'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>

                <div className='hidden'>
                    <label className='form-control' htmlFor='state'>
                        Megye:
                    </label>
                    <input
                        className={inputlook}
                        type='text'
                        id='state'
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </div>


                <button className='btn btn-primary' type='submit'>
                    Feltöltés
                </button>
                {onCancel && (
                    <button className='btn btn-neutral' type='button' onClick={onCancel}>
                        Mégsem
                    </button>
                )}

            </form>
        </>
    );
};

ShippingAddressForm.defaultProps = {
    shippingAddress: {
        recipient_name: '',
        street_address: '',
        country: 'Magyarország',
        city: '',
        state: '',
        postal_code: '',
    },
};

export default ShippingAddressForm;
