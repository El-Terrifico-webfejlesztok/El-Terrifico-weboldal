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
            <button type='button' onClick={handleAddImage} className='btn btn-neutral w-full'>
                Képek hozzáadása
            </button>
            {imagePreviews.length > 0 && (
                <div className='mt-3'>
                    <ul className='grid grid-cols-1  lg:grid-cols-2 gap-4'>
                        {imagePreviews.map((preview, index) => (
                            <li key={index} className='border-solid border-2 rounded-md p-1 border-accent'>
                                <img
                                    src={preview.preview}
                                    alt={`Preview ${index}`}
                                    className='rounded-md object-scale-down w-full lg:h-52'
                                />
                                <p className='text-center mt-1'>{preview.name}</p>
                                <button type='button' onClick={() => handleRemoveImage(index)} className='badge hover:bg-accent rounded-md w-full mt-1.5'>
                                    Eltávolítás
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
