'use client'
import { useState, useEffect } from 'react';
import ImageUploader from '../components/upload/imageuploader';
import CategorySelector from '../components/upload/CategorySelector';

const UploadProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [message, setMessage] = useState<string[]>(['Welcome home, such as it is.']);
  const [formImages, setFormImages] = useState<File[]>();
  const [selectedCategories, setSelectedCategories] = useState<string[]>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(['Feltöltés..']);

    if (!formImages) {
      setMessage([...message, 'Nincs kép kiválasztva']);
      return;
    }

    if (!selectedCategories) {
      setMessage([...message, 'Nincs kategória kiválasztva']);
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
        return;
      }

      setMessage([...message, 'Termék létrehozva']);

      // Iterate through each image and send a separate request
      for (const image of formImages) {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('product_id', responseBody.id);

        const imageResponse = await fetch('/api/product/uploadimage', {
          method: 'POST',
          body: formData,
        });

        const imageData = await imageResponse.json();

        if (!imageResponse.ok) {
          setMessage([...message, JSON.stringify(imageData)]);
          return;
        }

        setMessage([...message, 'Kép sikeresen feltöltve']);
        setMessage([...message, `ID: ${imageData.id}, Útvonal: ${imageData.image_path}`]);
        setMessage([...message, imageData.created_a]);
      }
      setMessage([...message, 'A termék és a képek sikeresen feltöltve']);
    } catch (error) {
      console.error('A szerver nem érhető el', error);
      setMessage([...message, 'A szerver nem érhető el']);
    }
  };

  const inputlook = 'input input-bordered w-full';

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
      <form onSubmit={handleSubmit} className='flex flex-col gap-3 mx-auto mt-12 p-2'>
        <div>
          <label className='form-control' htmlFor='name'>
            Name:
          </label>
          <input
            className={inputlook}
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className='form-control' htmlFor='description'>
            Description:
          </label>
          <textarea
            className='w-full textarea textarea-bordered'
            rows={6}
            id='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='flex space-x-2 justify-between'>
          <div>
            <label className='form-control' htmlFor='price'>
              Price:
            </label>
            <input
              className={inputlook}
              type='number'
              id='price'
              step='0.01'
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div>
            <label className='form-control' htmlFor='stock'>
              Stock:
            </label>
            <input
              className={inputlook}
              type='number'
              id='stock'
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
            />
          </div>
        </div>
        <CategorySelector onCategoriesChange={handleCategoriesChange} />
        <ImageUploader onImagesChange={handleImageChange} />

        <button className='btn btn-primary' type='submit'>
          Upload
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
