import React from 'react';
import { Chat } from '../components/Chat';

export const Meeting = () => {

  return (
    <div className="relative w-full h-screen flex">
      {/* Contenedor del video, centrado a la izquierda */}
      <div className="w-2/3 flex justify-center items-center p-48">
        <iframe
          className="w-full h-full"  // El iframe ocupa todo el tamaño del contenedor
          src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Reemplaza con tu video
          title="Video"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>


      <div className="w-1/3 h-full bg-neutral-200 shadow-lg fixed top-0 right-0 z-40">
        <Chat/>
      </div>
    </div>
  );
};

