import React, { useState, ChangeEvent } from 'react';

interface ImageUploaderProps {
    onImagesChange: (images: File[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesChange }) => {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<{ name: string; preview: string }[]>([]);

    const handleAddImage = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.multiple = true; // Allow multiple file selection
        input.addEventListener('change', handleImageChange as unknown as EventListener);
        input.click();
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files) {
            const validImages = Array.from(files).filter((file) =>
                file.type.startsWith('image/')
            );

            setSelectedImages((prevSelectedImages) => [...prevSelectedImages, ...validImages]);

            // Create previews for the selected images
            const previews: { name: string; preview: string }[] = [];
            let processedImages = 0;

            validImages.forEach((image, index) => {
                const reader = new FileReader();

                reader.onload = (e) => {
                    // Assuming you want to use the image name as the caption
                    previews[index] = { name: image.name, preview: e.target!.result as string };
                    processedImages++;

                    if (processedImages === validImages.length) {
                        setImagePreviews((prevImagePreviews) => [...prevImagePreviews, ...previews]);
                    }
                };

                reader.readAsDataURL(image);
            });

            onImagesChange([...selectedImages, ...validImages]);
        }
    };

    const handleRemoveImage = (index: number) => {
        const updatedPreviews = [...imagePreviews];
        const updatedSelectedImages = [...selectedImages];

        updatedPreviews.splice(index, 1);
        updatedSelectedImages.splice(index, 1);

        setImagePreviews(updatedPreviews);
        setSelectedImages(updatedSelectedImages);
        onImagesChange(updatedSelectedImages);
    };

    return (
        <div>
            <div className='divider'>Képfeltöltés</div>
            <button type='button' onClick={handleAddImage} className='btn text-lg btn-neutral w-full'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
                Képek hozzáadása
            </button>
            {imagePreviews.length > 0 && (
                <div className='mt-3'>
                    <ul className='grid grid-cols-1  lg:grid-cols-2 gap-4'>
                        {imagePreviews.map((preview, index) => (
                            <li key={index} className='border-solid border-2 rounded-md p-1 border-accent border-opacity-75'>
                                <img
                                    src={preview.preview}
                                    alt={`Preview ${index}`}
                                    className='rounded-md object-scale-down w-full lg:h-52'
                                />
                                <p className='text-center mt-1 truncate text-lg'>{preview.name}</p>
                                <button type='button' onClick={() => handleRemoveImage(index)} className='btn btn-xs text-base rounded-md w-full mt-1.5'>
                                    Eltávolítás a feltöltésből
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
