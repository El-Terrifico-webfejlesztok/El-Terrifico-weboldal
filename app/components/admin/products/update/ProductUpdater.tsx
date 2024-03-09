// 'use client'
import { useState } from 'react';
import Tooltip from '@/app/components/Tooltip';
import { ProductImage } from '@prisma/client';
import ImageUploader from '../upload/imageuploader';
import ExistingImages from './ExistingImages';
import CategorySelector from '../upload/CategorySelector';
import { Id, toast } from 'react-toastify';
import updateToast from '@/lib/helper functions/updateToast';
import formatDate from '@/lib/helper functions/formatDate';


interface Category {
    id: number;
    name: string;
}

export interface ProductData {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    is_active: boolean;
    created_at: Date; 
    updated_at: Date; 
    ProductImage: ProductImage[];
    Categories: Category[];
}


const ProductUpdater: React.FC<{ product: ProductData, reload: Function }> = ({ product, reload }) => {
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
    const [stock, setStock] = useState(product.stock);
    const [message, setMessage] = useState<string[]>(['Welcome home, such as it is.']);
    const [formImages, setFormImages] = useState<File[]>();
    const [selectedCategories, setSelectedCategories] = useState<string[]>(product.Categories.map(category => category.name));
    const [resetKey, setResetKey] = useState(0);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const toastId = toast.loading("Termék frissítése...")
        setMessage(['Feltöltés..']);


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
                    id: product.id,
                    name,
                    description,
                    price,
                    stock,
                    categories: selectedCategories,
                }),
            });

            const responseBody = await response.json();

            if (!response.ok) {
                setMessage([...message, responseBody]);
                updateToast(toastId, responseBody,)

                return;
            }

            setMessage([...message, 'Termék frissítve']);

            // Iterate through each image and send a separate request
            // Ha vannak új képek
            if (formImages) {
                const imageloop = toast.loading(`Képek feltöltése`)

                for (const image of formImages) {
                    // Toast update
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
                        throw new Error(`Sikertelen képfeltöltés: ${image.name}`);
                    }

                    setMessage([...message, 'Kép sikeresen feltöltve']);
                    setMessage([...message, `ID: ${imageData.id}, Útvonal: ${imageData.image_path}`]);
                    setMessage([...message, imageData.created_a]);
                }
                updateToast(imageloop, 'success', 'Képek sikeresen feltöltve')
            }
            if (reload) await reload()
            resetimages()
            updateToast(toastId, 'success', 'Termék frissítve')
            setMessage([...message, 'A termék és a képek sikeresen feltöltve']);
        } catch (error) {
            console.error('Hiba a termék feltöltése közben:', error);
            setMessage([...message, 'Hiba a termék feltöltése közben:']);
        }
    };

    const resetimages = async () => {
        setResetKey((prevKey) => prevKey + 1);
        setFormImages([])
    }

    const inputlook = 'input input-bordered w-full';

    const handleImageChange = async (Images: File[]) => {
        setFormImages(Images);
    };

    const handleCategoriesChange = async (categories: string[]) => {
        setSelectedCategories(categories);
        // Ez amúgy helyesen működik, csak nem refreshel a komonens olyan gyorsan
        // console.log(selectedCategories);
    };


    return (
        <div className='mx-auto justify-center max-w-lg pt-5'>
            <p className='text-center text-3xl font-bold mt-6 mb-3'>Termékfrissítés</p>

            <form onSubmit={handleSubmit} className='flex flex-col gap-3 mx-auto p-2'>
                <div className=''>
                    <p className='text-info'><b>ID: </b>{product.id}<Tooltip message="A termékre utaló megváltoztathatatlan ID" /></p>
                    <p className='text-info'><b>Státusz: </b>{product.is_active ? 'Aktív' : 'Inaktív'}<Tooltip message="A termék láthatósága. Ha ''Inaktív'' akkor nem látható." /></p>
                    <p className='text-info'><b>Képek száma: </b>{product.ProductImage.length}</p>
                    <p className='text-info'><b>Feltöltve: </b>{formatDate(product.updated_at)}</p>
                    <p className='text-info'><b>Utolsó frissítés: </b>{formatDate(product.updated_at)}</p>
                </div>
                <div>
                    <label className='form-control' htmlFor='name'>
                        <div>
                            Termék neve:
                            <Tooltip message="Nem ajánlott teljesen megváltoztatni" />
                        </div>
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
                            <div>
                                <Tooltip message="Jelenleg nincs használatba véve" />
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

                <CategorySelector onCategoriesChange={handleCategoriesChange} currentCategories={selectedCategories} />
                <ImageUploader onImagesChange={handleImageChange} key={resetKey}/>
                <div className='divider'>Meglévő képek</div>
                <ExistingImages images={product.ProductImage} reload={reload} />

                <div className='divider'>Termék frissítése</div>

                <button className='btn btn-primary' type='submit'>
                    Termék frissítése
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

export default ProductUpdater;
