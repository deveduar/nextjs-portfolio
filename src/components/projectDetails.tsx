"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from "next/image";


interface ProjectDetailsProps {
  project: {
    id: number;
    imageSrc: string;
    title: string;
    description: string;
    detailedDescription: string;
    technologies: string[];
    links: { href: string; label: string; svg: JSX.Element }[];
    gallery: string[]; 
    features?: string[]; 
  };
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false); // Estado para controlar el zoom
  const [slideDirection, setSlideDirection] = useState<'right' | 'left' | 'zoom'>('zoom');
    // Efecto para deshabilitar el scroll cuando el modal esté abierto
    useEffect(() => {
      if (isModalOpen) {
        document.body.style.overflow = 'hidden'; 
      } else {
        document.body.style.overflow = '';
      }
      // Limpiar el efecto cuando el modal se cierre
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
    setIsZoomed(false); // Desactivar el zoom al cerrar
  };

  const nextImage = () => {
    setSlideDirection('right');
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.gallery.length);
  };

  const prevImage = () => {
    setSlideDirection('left');
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + project.gallery.length) % project.gallery.length);
  };

  const toggleZoom = () => {
    setIsZoomed((prevZoom) => !prevZoom); // Alternar zoom
  };

  return (
    <div className=" text-black rounded-xl dark:text-white">
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Imagen Principal - Ocupa todo el ancho en móvil, 2 columnas en md/lg */}

      {/* Información Principal - 2 columnas en md */}
      <div className="md:col-span-2  bg-white dark:bg-gray-800  rounded-xl ">
      {/* <div className="md:col-span-2 lg:col-span-3  bg-slate-50 rounded-t-xl overflow-hidden ">
        <Image
          width={1200}
          height={800}
          src={project.imageSrc}
          alt="Project"
          className="object-cover h-40 w-30"
        />
      </div> */}
      <div className="p-6 space-y-4">
      <h2 className="text-3xl font-bold">{project.title}</h2>

      <p className="text-base leading-normal">{project.description}</p>
      <p className="text-base leading-normal">{project.detailedDescription}</p>
      <ul className="list-disc list-inside space-y-2">
        {project.features?.map((feature, index) => (
          <li key={index} className="text-base dark:text-gray-300">{feature}</li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech, index) => (
          <div key={index} className="flex h-8 items-center justify-center rounded-xl bg-gray-700 px-4">
            <span className="text-sm font-medium text-white">{tech}</span>
          </div>
        ))}
      </div>

      </div>

      </div>

      {/* Technologies - 1 columna */}
      {/* <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
        <h3 className="text-lg font-bold mb-4">Technologies</h3>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <div key={index} className="flex h-8 items-center justify-center rounded-xl bg-gray-700 px-4">
              <span className="text-sm font-medium text-white">{tech}</span>
            </div>
          ))}
        </div>
      </div> */}

{/* Links - 1 columna */}
<div className="rounded-xl">
  <div className="grid gap-4">
    {project.links.map((link, index) => (
      <Link
        key={index}
        href={link.href}
        className={`p-4 rounded-xl hover:scale-105 transition-all duration-300 flex items-center gap-3 
          ${link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live')
            ? 'bg-blue-100 dark:bg-blue-900' 
            : 'bg-white dark:bg-gray-800'}
          ${index === 0 ? 'row-span-2' : ''}
          ${index === 1 ? 'col-span-1' : ''}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={`text-2xl ${link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live') ? 'text-blue-600 dark:text-blue-400' : ''}`}>
          {link.svg}
        </div>
        <span className="text-sm font-medium dark:text-white whitespace-nowrap">{link.label}</span>
      </Link>
    ))}
  </div>
</div>

      {/* Features - 2 columnas en lg */}
      {/* <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl">
        <h3 className="text-lg font-bold mb-4">Key Features</h3>

      </div> */}



      {/* Galería de imágenes - Ocupa todo el ancho */}
{/* Galería de imágenes - Ocupa todo el ancho */}
{project.gallery && project.gallery.length > 0 && (
  <div className="md:col-span-2 lg:col-span-3  rounded-xl">
    <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
      {project.gallery.map((image, index) => (
        <div
          key={index}
          className={`rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] ${
            index === 0 ? 'col-span-2 row-span-2' : // Primera imagen más grande
            index === 3 ? 'col-span-2' : // Cuarta imagen ancha
            index === 5 ? 'row-span-2' : // Sexta imagen alta
            ''
          }`}
          onClick={() => openModal(index)}
        >
          <Image
            width={800}
            height={800}
            src={image}
            alt={`Gallery image ${index + 1}`}
            className="w-full h-full object-cover hover:opacity-90 transition-opacity duration-300"
          />
        </div>
      ))}
    </div>
  </div>
)}

    </div>
 

  {/* Modal para las imágenes */}
  {isModalOpen && (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
      onClick={closeModal}
    >
      {/* Contenedor absoluto para los botones */}
      <div className="absolute top-4 right-4 z-20 flex space-x-4" onClick={(e) => e.stopPropagation()}>
        {/* Botón de Zoom */}
        <button className="text-white text-2xl" onClick={toggleZoom}>
          {isZoomed ? '-' : '+'}
        </button>
        
        {/* Botón para cerrar el modal */}
        <button className="text-white text-3xl" onClick={closeModal}>
          &times;
        </button>
      </div>

      {/* Botones de navegación izquierda y derecha */}
      <div onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-opacity-50 text-white text-4xl px-6 py-4 rounded-full hover:bg-opacity-70 z-20"
          onClick={prevImage}
        >
          &#8249;
        </button>

        <button
          className="flex items-center justify-center text-center absolute right-4 top-1/2 transform -translate-y-1/2 bg-opacity-50 text-white text-4xl px-6 py-2 rounded-full hover:bg-opacity-70 z-20"
          onClick={nextImage}
        >
          &#8250;
        </button>
      </div>

      {/* Imagen actual */}
      <div className="flex justify-center items-center max-h-[85vh] max-w-[85vw]" onClick={(e) => e.stopPropagation()}>
      <Image
    key={currentImageIndex}
    width={961}
    height={4021}
    src={project.gallery[currentImageIndex]}
    alt={`Modal image ${currentImageIndex + 1}`}
    className={`object-contain transition-all duration-500 ease-in-out
      ${slideDirection === 'right' ? 'animate-slideRight' : 
        slideDirection === 'left' ? 'animate-slideLeft' : 
        'animate-zoomIn'}
      ${isZoomed ? 'scale-125 max-h-[80vh] max-w-[70vw]' : 'max-h-[85vh] max-w-[85vw]'}`}
  />
      </div>
    </div>
  )}
</div>

    
  );
};

export default ProjectDetails;
