import { ShippingAddress } from '@prisma/client';
import React, { useState } from 'react';

const ShippingAddressForm = ({ shippingAddress, onCancel, reload }: { shippingAddress: ShippingAddress, onCancel?: () => void, reload?: Function }) => {
    // Adatok összegyűjtése éredkében
    const [recipientName, setRecipientName] = useState<string | undefined>(shippingAddress.recipient_name || undefined);
    const [streetAddress, setStreetAddress] = useState<string | undefined>(shippingAddress.street_address || undefined);
    const [country, setCountry] = useState<string>('Magyarország');
    const [city, setCity] = useState<string | undefined>(shippingAddress.city || undefined);
    const [state, setState] = useState<string | undefined>(shippingAddress.state || undefined);
    const [postalCode, setPostalCode] = useState<string | undefined>(shippingAddress.postal_code || undefined);
    // Reszponzivitás érdekében
    const [loading, setLoading] = useState<boolean>(false)
    const [feedback, setFeedfback] = useState<string | undefined>(undefined)
    const [buttoncolor, setButtonColor] = useState<string | undefined>(undefined)

    const inputlook = 'input input-bordered w-full';

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        event.preventDefault();

        try {

            const addressToSend = {
                id: shippingAddress.id,
                recipient_name: recipientName,
                street_address: streetAddress,
                country,
                city,
                state,
                postal_code: postalCode,
            }
            // ugly but works
            if (!recipientName) { return setFeedfback('Nincs név megadva') }
            if (!postalCode) { return setFeedfback('Nincs irányítószám megadva') }
            if (!city) { return setFeedfback('Nincs város megadva') }
            if (!streetAddress) { return setFeedfback('Nincs cím megadva') }

            console.log(JSON.stringify(addressToSend))
            // Send product data to create a new product
            const response = await fetch('/api/user/address/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addressToSend),
            });

            const responseBody = await response.json();

            if (!response.ok) {
                setButtonColor('btn-error')
                setFeedfback(`Sikertelen feltöltés: ${responseBody}`)
                return;
            }
            setButtonColor('btn-success')
            setFeedfback('Sikeres feltöltés')
            if (reload !== undefined){
                reload()
            }
        } catch (error) {
            setButtonColor('btn-warning')
            console.error('A szerver nem érhető el', error);
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3 mx-auto p-2'>
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

                <button className={`btn ${buttoncolor ? buttoncolor : 'btn-primary'}`} type='submit'>
                    {loading ? <div className=' loading loading-bars '></div> : feedback ? feedback : 'Feltöltés'}
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
        id: undefined,
        recipient_name: undefined,
        street_address: undefined,
        country: 'Magyarország',
        city: undefined,
        state: undefined,
        postal_code: undefined,
    },
};

export default ShippingAddressForm;
