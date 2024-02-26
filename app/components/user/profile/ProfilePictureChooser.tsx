import React, { useState, ChangeEvent } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

interface ProfilePictureChooserProps {
    onCancel: () => void;
}

const ProfilePictureChooser: React.FC<ProfilePictureChooserProps> = ({ onCancel }) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const { data: session, update } = useSession();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [buttonText, setButtonText] = useState<string>('Válassz egy képet');

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setSelectedImage(file);
            setButtonText('Kép feltöltése')
        }
    };

    const handleImageClick = () => {
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        fileInput.click();
    };

    const handleUpload = async () => {
        setLoading(true);
        try {
            setError(null);

            const formData = new FormData();
            formData.append('file', selectedImage as Blob);

            const response = await fetch('/api/user/uploadimage', {
                method: 'POST',
                headers: {
                },
                body: formData,
            });

            if (response.ok) {
                setButtonText('Sikeres feltöltés')
                // Updateljük a sessiont az új profilképpel
                update({ image: response })
                console.log(session!.user!.image)
                setSelectedImage(null)
            } else {
                // Handle error responses
                const errorMessage = await response.text();
                setError(`Hiba a kép feltöltése közben: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Hiba a kép feltöltése közben:', error);
            setError('Hiba a kép feltöltése közben');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='max-w-lg mx-auto'>
            <div className='mx-auto aspect-square'>
                <input
                    type="file"
                    accept="image/*"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                />
                <label htmlFor="fileInput">
                    <img
                        src={selectedImage ? URL.createObjectURL(selectedImage) : session?.user?.image || ''}
                        alt="Selected"
                        onClick={handleImageClick}
                        className='p-2 h-full aspect-square mx-auto my-4 object-cover bg-base-200 rounded-full cursor-pointer hover:brightness-110 transition-all '
                    />
                </label>
            </div>
            <div className="w-full items-center flex mt-4">
                <button className="btn btn-neutral mr-auto w-40" type="button" onClick={onCancel}>
                    Mégsem
                </button>

                <button
                    className={`btn ${buttonText === 'Sikeres feltöltés' ? 'btn-success' : 'btn-primary'} ml-auto w-40`}
                    type="button"
                    onClick={handleUpload}
                    disabled={!selectedImage}
                >
                    <p className={loading ? 'loading loading-dots' : ''}>{buttonText}</p>
                </button>
            </div>
            {error && <div className="text-error mt-2">{error}</div>}

        </div>
    );
};

export default ProfilePictureChooser;
