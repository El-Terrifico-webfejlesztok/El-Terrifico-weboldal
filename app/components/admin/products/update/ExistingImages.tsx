import updateToast from '@/lib/helper functions/updateToast';
import { ProductImage } from '@prisma/client';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';


interface ExistingImagesProps {
  images: ProductImage[];
  reload?: Function
}

// Ez a komponens egymagában kezeli a létező képek kijelzését és törlését a kapott képek alapján

const ExistingImages: React.FC<ExistingImagesProps> = ({ images, reload }) => {
  const [loadingimage, setLoadingImage] = useState<number | undefined>()

  const onDeleteImage = async (imageId: number) => {
    const isConfirmed = window.confirm(`Biztosan törölni szertnéd ezt a képet? (ID: ${imageId})`);
    if (!isConfirmed) {
      return;
    }
    setLoadingImage(imageId)
    const toastId = toast.loading('Kép törlése...')
    console.log(imageId)
    try {
      const response = await fetch(`/api/product/image?id=${imageId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const responseBody = await response.json();
        updateToast(toastId, 'error', `Hiba a kép törlése közben: ${response.statusText}`)
        throw new Error("Sikertelen képtörlés");
      }
      if (reload) await reload()
      updateToast(toastId, 'success', `Sikeres képtörlés: (ID: ${imageId})`)


    } catch (error) {
      console.error("A szerver nem érhető el", error);
    }
    finally {
      setLoadingImage(undefined)
    }
  };

  return (
    <div>
      {images.length > 0 && (
        <div className='mt-3'>
          <ul className='grid grid-cols-1 lg:grid-cols-2 gap-4'>

            {images.map((preview) => (
              <div key={preview.id} className={loadingimage === preview.id ? 'skeleton' : ''}>

                <li className='border-solid border-2 rounded-md p-1 border-accent border-opacity-75'>
                  <Image
                  height={256}
                  width={256}
                    src={`https://terrifico.zapto.org/${preview.image_path}`}
                    alt={`Preview ${preview.id}`}
                    className='rounded-md object-scale-down w-full lg:h-52'
                  />
                  <p className='text-center mt-1 truncate text-lg'><b className='text-lg'>Meglévő kép</b>, ID: {preview.id}</p>
                  <button
                    type='button'
                    onClick={() => onDeleteImage(preview.id)} // Pass the image ID to onDeleteImage
                    className='btn btn-warning hover:btn-error btn-xs text-base rounded-md w-full mt-1.5'
                  >
                    Eltávolítás a szerverről
                  </button>
                </li>
              </div>

            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExistingImages;
