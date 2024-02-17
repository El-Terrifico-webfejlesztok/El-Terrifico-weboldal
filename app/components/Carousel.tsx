import React, { useState, useEffect } from 'react';

interface Props {
    title: string;
    images: string[];
}

const Carousel: React.FC<Props> = ({ title, images }) => {
    const [currentItem, setCurrentItem] = useState(0);

    const nextItem = () => {
        setCurrentItem((prevItem) => (prevItem + 1) % images.length);
    };

    const prevItem = () => {
        setCurrentItem((prevItem) => (prevItem - 1 + images.length) % images.length);
    };

    /**Automatikus képváltogatáshoz, jelenleg nem kell */
    /*useEffect(() => {
        const interval = setInterval(() => {
            setCurrentItem((prevItem) => (prevItem + 1) % images.length);
        }, 15000); // Automatikus váltogatás intervallum
        return () => clearInterval(interval);
    }, [images.length]);*/

    if (images.length > 0) {
        return (
            <div className="relative h-full">
                <div className="carousel flex">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className={`carousel-item w-full h-full absolute transition-opacity duration-700 ${index === currentItem ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <img
                                src={img}
                                className="w-full h-full object-cover rounded-xl"
                                alt={`${title} ${index + 1}. Kép`}
                            />
                        </div>
                    ))}
                </div>
                {images.length > 1 && (
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <button className="btn btn-circle left-2" onClick={prevItem}>
                            ❮
                        </button>
                        <button className="btn btn-circle right-2" onClick={nextItem}>
                            ❯
                        </button>
                    </div>
                )}
            </div>
        );
    } else {
        return null;
    }
};

export default Carousel;
