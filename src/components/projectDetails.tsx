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
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsZoomed(false); // Desactivar el zoom al cerrar
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + project.gallery.length) % project.gallery.length);
  };

  const toggleZoom = () => {
    setIsZoomed((prevZoom) => !prevZoom); // Alternar zoom
  };

  return (
    <div className=" text-black rounded-xl dark:text-white">
          {/* Título del proyecto */}
      <div className=" h-64 bg-slate-50 rounded-xl flex justify-end overflow-hidden mx-4 ">
        <Image
          width={1200}
          height={800}
          src={project.imageSrc}
          alt="Project"
          className="object-cover w-full h-full"
        />
      </div>


    <h2 className="text-3xl font-bold mt-4 px-4">{project.title}</h2>

      {/* Descripción detallada del proyecto */}
      <p className="mt-4 text-base leading-normal px-4">{project.description}</p>
      <p className="mt-2 text-base leading-normal px-4">{project.detailedDescription}</p>
      <h3 className="text-lg font-bold leading-tight tracking-tight dark:text-white px-4 pb-2 pt-4">
        Key Features:
      </h3>
      <ul className="list-disc list-inside px-4">
        {project.features?.map((feature, index) => (
          <li key={index} className="text-base leading-normal dark:text-gray-300">
            {feature}
          </li>
        ))}
      </ul>


      {/* Tecnologías utilizadas */}
      <h3 className="text-lg font-bold tracking-tight dark:text-white px-4 pb-2 pt-4">
        Technologies:
      </h3>
      <div className="flex gap-3 flex-wrap px-4">
        {project.technologies.map((tech, index) => (
          <div key={index} className="flex h-8 items-center justify-center rounded-xl bg-gray-700 px-4">
            <a className="text-sm font-medium text-white">{tech}</a>
          </div>
        ))}
      </div>

      {/* Enlaces del proyecto */}
      <h3 className="text-lg font-bold tracking-tight dark:text-white px-4 pt-4">Links:</h3>
      <div className="mt-4 px-4">
        {project.links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="mr-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent dark:text-white hover:bg-primary transition-all duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.svg} {link.label}
          </Link>
        ))}
      </div>

      {/* <h3 className="text-lg font-bold leading-tight tracking-tight dark:text-white px-4 pb-2 pt-4">Project Images</h3>
        <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {project.gallery.map((image, index) => (
            <div key={index} className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover hover:opacity-90 transition-opacity duration-300"
                />
            </div>
            ))}
        </div> */}
        
        <div className="mt-4 px-4 text-black rounded-xl dark:text-white">
  {/* Verificar si hay imágenes en la galería antes de renderizar */}
  {project.gallery && project.gallery.length > 0 && (
    <>
      {/* Encabezado de la Galería de Imágenes */}
      <h3 className="text-lg font-bold leading-tight tracking-tight dark:text-white pb-4">
        Project Images
      </h3>

      {/* Galería de Imágenes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {project.gallery.map((image, index) => (
          <div
            key={index}
            className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden cursor-pointer"
            onClick={() => openModal(index)} // Abre el modal al hacer clic en la imagen
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
    </>
  )}

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
          width={400}
          height={400}
          src={project.gallery[currentImageIndex]}
          alt={`Modal image ${currentImageIndex + 1}`}
          className={`object-contain transition-transform duration-300 ${isZoomed ? 'scale-125 max-h-[80vh] max-w-[70vw]' : 'max-h-[85vh] max-w-[85vw]'}`}
        />
      </div>
    </div>
  )}
</div>

    </div>
  );
};

export default ProjectDetails;
