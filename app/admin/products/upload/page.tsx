'use client'
import { useState, useEffect } from 'react';
import ImageUploader from '../../../components/admin/products/upload/imageuploader';
import CategorySelector from '../../../components/admin/products/upload/CategorySelector';
import { Id, toast } from 'react-toastify';
import updateToast from '@/lib/helper functions/updateToast';
import Link from 'next/link';


const UploadProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [message, setMessage] = useState<string[]>(['Welcome home, such as it is.']);
  const [formImages, setFormImages] = useState<File[]>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>();
  const [resetKey, setResetKey] = useState(0);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const toastId = toast.loading("Termék frissítése...")
    setMessage(['Frissítés..']);

    if (!formImages) {
      setMessage([...message, 'Nincs kép kiválasztva']);
      updateToast(toastId, 'warning', 'Nincs kép kiválasztva')
      return;
    }

    if (!selectedCategories) {
      setMessage([...message, 'Nincs kategória kiválasztva']);
      updateToast(toastId, 'warning', 'Nincs kategória kiválasztva')
      return;
    }

    try {
      console.log(selectedCategories)
      // Send product data to create a new product
      const response = await fetch('/api/product/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          price,
          stock,
          categories: selectedCategories,
        }),
      });

      const responseBody = await response.json();

      if (!response.ok) {
        setMessage([...message, JSON.stringify(responseBody)]);
        updateToast(toastId, responseBody,)
        return;
      }

      setMessage([...message, 'Termék létrehozva']);

      // Iterate through each image and send a separate request
      const imageloop = toast.loading(`Képek feltöltése`)

      for (const image of formImages) {
        toast.update(imageloop, {
          render: `Képek feltöltése, jelenleg: ${image.name}`
        })
        const formData = new FormData();
        formData.append('file', image);
        formData.append('product_id', responseBody.id);
        const imageResponse = await fetch('/api/product/image', {
          method: 'POST',
          body: formData,
        });

        const imageData = await imageResponse.json();

        if (!imageResponse.ok) {
          setMessage([...message, JSON.stringify(imageData)]);
          toast.update(imageloop, {
            render: `Hiba a képek feltöltése közben: ${imageData}`
          })
          return;
        }

        setMessage([...message, 'Kép sikeresen feltöltve']);
        setMessage([...message, `ID: ${imageData.id}, Útvonal: ${imageData.image_path}`]);
        setMessage([...message, imageData.created_a]);
      }
      updateToast(imageloop, 'success', 'Képek sikeresen feltöltve')
      updateToast(toastId, 'success', 'Termék feltöltve')
      setMessage([...message, 'A termék és a képek sikeresen feltöltve']);
      toast.info(
        <Link className="btn btn-sm font-bold whitespace-nowrap w-full btn-info" href={`/admin/products/update/${responseBody.id}`}>Termék módosítása</Link>,
        {
          autoClose: 10000
        })
      resetall()
    } catch (error) {
      console.error('A szerver nem érhető el', error);
      setMessage([...message, 'A szerver nem érhető el']);
    }
  };

  const inputlook = 'input input-bordered w-full';

  const resetall = async () => {
    setResetKey((prevKey) => prevKey + 1);
    setFormImages([])
    setName('');
    setDescription('');
    setPrice(0);
    setStock(0);
    setFormImages([]);
    setSelectedCategories([]);
  }

  const handleImageChange = async (Images: File[]) => {
    setFormImages(Images);
    console.log('Form Images:', formImages);
  };

  const handleCategoriesChange = (categories: string[]) => {
    setSelectedCategories(categories);
    console.log(selectedCategories)
  };

  return (
    <div className='mx-auto justify-center max-w-lg pt-5'>
      <p className='text-center text-3xl font-bold mt-6 mb-3'>Termékfeltöltés</p>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3 mx-auto p-2'>
        <div>
          <label className='form-control' htmlFor='name'>
            Termék neve:
          </label>
          <input
            className={inputlook}
            type='text'
            id='name'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className='form-control' htmlFor='description'>
            Termék leírása:
          </label>
          <textarea
            className='w-full textarea textarea-bordered'
            rows={4}
            id='description'
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='flex space-x-2 justify-between'>
          <div>
            <label className='form-control' htmlFor='price'>
              Ár:
            </label>
            <input
              className={inputlook}
              type='number'
              id='price'
              step='1'
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              min="0"
            />
          </div>
          <div>
            <label className='form-control' htmlFor='stock'>
              <div className='flex items-center'>
                <div className="mx-0 tooltip" data-tip="Jelenleg nincs használtaba véve">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                Mennyiség:
              </div>
            </label>
            <input
              className={inputlook}
              type='number'
              id='stock'
              min="0"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
            />
          </div>
        </div>
        <CategorySelector onCategoriesChange={handleCategoriesChange} />
        <ImageUploader onImagesChange={handleImageChange} key={resetKey} />

        <button className='btn btn-primary' type='submit'>
          Termék feltöltése
        </button>
        <div className='mockup-code min-h-96 mt-4'>
          {message.map((mes, index) => (
            <pre key={index} data-prefix='&gt;'>
              <code>{mes}</code>
            </pre>
          ))}
        </div>
      </form>
    </div>
  );
};

export default UploadProduct;
