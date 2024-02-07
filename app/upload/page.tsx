'use client'
import { useState } from 'react'

const UploadProduct = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const [message, setMessage] = useState(['Welcome, administrator.'])
  const [image, setImage] = useState<File>()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault()
    setMessage(['Feltöltés..']);

    if (!image) {
      setMessage([...message, 'Nincs kép kiválasztva']);
      return
    }

    try {
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
        }),
      })

      const responseBody = await response.json();

      if (!response.ok) {
        setMessage([...message, responseBody]);
        return;
      }
      setMessage([...message, "Termék létrehozva"]);

      // Sajnos a javascript ilyeneket hoz ki az emberből:
      const productMessage: string = ['ID: ', responseBody.id, 'Name: ', responseBody.name].join('');

      setMessage([...message, productMessage]);

      const formData = new FormData();
      formData.append('file', image);
      formData.append('product_id', responseBody.id);

      const imageResponse = await fetch('/api/product/uploadimage', {
        method: 'POST',
        body: formData,
      });
      const imageData = await imageResponse.json();
      if (!imageResponse.ok) {
        setMessage([...message, imageData]);
        return;
      }

      setMessage([...message, "Képek feltöltve"]);
      const imageMessage: string = ['ID: ', imageData.id, 'Útvonal: ', imageData.image_path].join('');

      setMessage([...message, imageMessage]);
      setMessage([...message, imageData.created_at])
      setMessage([...message, "A termék és a kép sikeresen feltöltve"])

    } catch (error) {
      console.error('A szerver nem érhető el', error)
      setMessage([...message, 'A szerver nem érhető el']);
    }
  }

  const inputlook = 'input input-bordered w-full'

  return (
    <div className='mx-auto justify-center max-w-lg pt-5'>

      <form onSubmit={handleSubmit} className='flex flex-col gap-3 mx-auto mt-12 p-2'>
        <div>
          <label className='form-control' htmlFor="name">Name:</label>
          <input
            className={inputlook}
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className='form-control' htmlFor="description">Description:</label>
          <textarea
            className='w-full'
            rows={6}
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='flex space-x-2'>
          <div>
            <label className='form-control' htmlFor="price">Price:</label>
            <input
              className={inputlook}
              type="number"
              id="price"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div>
            <label className='form-control' htmlFor="stock">Stock:</label>
            <input
              className={inputlook}
              type="number"
              id="stock"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
            />
          </div>
        </div>

        <input
          className='file-input file-input-bordered'
          type="file"
          name='file'
          onChange={(e) => setImage(e.target.files?.[0])}
        />
        <button className='btn' type="submit">Upload</button>


        <div className="mockup-code min-h-96 mt-4" >
          {/*Ezt még javítani kéne, a key nem egyedi mindíg. Emiatt bugos*/}
          {message.map((mes, index) =>
            <pre key={index} data-prefix=">">
              <code>{mes}</code>
            </pre>
          )}
        </div>

      </form>
    </div>
  )
}

export default UploadProduct