"use client"
import React, { useState, useEffect } from 'react';
import Image from "next/image";

interface GalleryProps {
  images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'right' | 'left' | 'zoom'>('zoom');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const openModal = (index: number) => {
    setSlideDirection('zoom');
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsZoomed(false);
  };

  const nextImage = () => {
    setIsTransitioning(true);
    setSlideDirection('right');
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 400); // match animation duration
  };
  
  const prevImage = () => {
    setIsTransitioning(true);
    setSlideDirection('left');
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setTimeout(() => setIsTransitioning(false), 400); // match animation duration
  };

  const toggleZoom = () => {
    setIsZoomed((prevZoom) => !prevZoom);
  };

  return (
    <>
{images && images.length > 0 && (
        <div className="md:col-span-2 lg:col-span-3 rounded-xl  w-full pt-4">
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-[300px] md:h-[150px]">
            {/* Primera imagen */}
            <div className="rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]" onClick={() => openModal(0)}>
              <Image
                width={800}
                height={800}
                src={images[0]}
                alt="Gallery image 1"
                className="w-full h-full object-cover hover:opacity-90 transition-opacity duration-300"
              />
            </div>

            {/* Segunda imagen */}
            {images[1] && (
              <div className="rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]" onClick={() => openModal(1)}>
                <Image
                  width={800}
                  height={800}
                  src={images[1]}
                  alt="Gallery image 2"
                  className="w-full h-full object-cover hover:opacity-90 transition-opacity duration-300"
                />
              </div>
            )}

            {/* Tercera imagen */}
            {images[2] && (
              <div className="rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]" onClick={() => openModal(2)}>
                <Image
                  width={800}
                  height={800}
                  src={images[2]}
                  alt="Gallery image 3"
                  className="w-full h-full object-cover hover:opacity-90 transition-opacity duration-300"
                />
              </div>
            )}

            {/* Cuarta imagen */}
            {images[3] && (
              <div className="rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]" onClick={() => openModal(3)}>
                <Image
                  width={800}
                  height={800}
                  src={images[3]}
                  alt="Gallery image 4"
                  className="w-full h-full object-cover hover:opacity-90 transition-opacity duration-300"
                />
              </div>
            )}

            {/* Botón para ver más imágenes si existen */}
            {images.length > 4 && (
              <button
                onClick={() => openModal(4)}
                className="col-span-3 bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="text-gray-600 dark:text-gray-300">Ver {images.length - 4} imágenes más</span>
              </button>
            )}
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80" onClick={closeModal}>
          <div className="absolute top-4 right-4 z-20 flex space-x-4" onClick={(e) => e.stopPropagation()}>
            <button className="text-white text-2xl" onClick={toggleZoom}>
              {isZoomed ? '-' : '+'}
            </button>
            <button className="text-white text-3xl" onClick={closeModal}>
              &times;
            </button>
          </div>

          <div onClick={(e) => e.stopPropagation()}>
            <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-opacity-50 text-white text-4xl px-6 py-4 rounded-full hover:bg-opacity-70 z-20" onClick={prevImage}>
              &#8249;
            </button>
            <button className="flex items-center justify-center text-center absolute right-4 top-1/2 transform -translate-y-1/2 bg-opacity-50 text-white text-4xl px-6 py-2 rounded-full hover:bg-opacity-70 z-20" onClick={nextImage}>
              &#8250;
            </button>
          </div>

          <div className="flex justify-center items-center w-full h-full p-4" onClick={closeModal}>
            <div className="relative w-[60vw] h-[80vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              {isTransitioning && (
                <Image
                  key={`prev-${currentImageIndex}`}
                  width={961}
                  height={4021}
                  src={images[(currentImageIndex + (slideDirection === 'right' ? -1 : 1) + images.length) % images.length]}
                  alt={`Previous modal image`}
                  className={`object-contain max-h-[80vh] max-w-[60vw] absolute invisible
                    ${slideDirection === 'right' ? 'animate-modalSlideOutLeft' : 'animate-modalSlideOutRight'}
                    ${isZoomed ? 'scale-125' : 'scale-100'}`}
                  priority
                />
              )}
              <div className="relative" onClick={(e) => e.stopPropagation()}>
              <Image
                  key={`current-${currentImageIndex}`}
                  width={961}
                  height={4021}
                  src={images[currentImageIndex]}
                  alt={`Modal image ${currentImageIndex + 1}`}
                  className={`object-contain max-h-[80vh] max-w-[60vw]
                    ${isTransitioning ? (
                      slideDirection === 'right' ? 'animate-modalSlideInRight' : 'animate-modalSlideInLeft'
                    ) : slideDirection === 'zoom' ? 'animate-zoomIn' : ''}
                    ${isZoomed ? 'scale-125' : 'scale-100'}`}
                  priority
                />
              </div>
            </div>
          </div>
        
        </div>
      )}
    </>
  );
};

export default Gallery;