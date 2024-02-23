import React, { useState, ChangeEvent } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

interface ProfilePictureChooserProps {
    onCancel: () => void;
}

const ProfilePictureChooser: React.FC<ProfilePictureChooserProps> = ({ onCancel }) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const { data: session, update} = useSession();

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            // TODO: Perform any validation if needed
            setSelectedImage(file);
        }
    };

    const handleImageClick = () => {
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        fileInput.click();
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', selectedImage as Blob);

            const response = await fetch('/api/user/uploadimage', {
                method: 'POST',
                headers: {
                    // Include any necessary headers, like authorization headers if needed
                },
                body: formData,
            });

            if (response.ok) {
                // Handle successful upload
                update();
                console.log('Image uploaded successfully!');
            } else {
                // Handle error responses
                console.error('Error during image upload:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('An error occurred during the image upload:', error);
        }
    };

    return (
        <div className='max-w-lg mx-auto'>
            <div className='mx-auto '>
                <input
                    type="file"
                    accept="image/*"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                />
                <img
                    src={selectedImage ? URL.createObjectURL(selectedImage) : session?.user?.image || ''}
                    alt="Selected"
                    onClick={handleImageClick}
                    className='p-2 mx-auto my-4 object-cover bg-base-200 rounded-full cursor-pointer hover:brightness-110 transition-all h-96 w-96'
                />
            </div>
            <div className="w-full flex mt-4">
                <button className="btn btn-neutral mr-auto w-40" type="button" onClick={onCancel}>
                    Mégsem
                </button>
                <button
                    className="btn btn-primary ml-auto w-40"
                    type="button"
                    onClick={handleUpload}
                    disabled={!selectedImage}
                >
                    {selectedImage ? 'Kép feltöltése' : 'Válassz egy képet'}
                </button>
            </div>
        </div>
    );
};

export default ProfilePictureChooser;
