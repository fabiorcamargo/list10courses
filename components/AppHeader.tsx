
import React from 'react';

// URL for the Profissionaliza SVG logo
const LOGO_URL = "https://profissionalizaead.com.br/assets/logo/Logo-White.svg";

export const AppHeader: React.FC = () => {
  return (
    <header className="bg-blue-700 text-white p-4 sm:p-6 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
            DIVERSAS OPÇÕES DE CURSOS PARA VOCÊ ESCOLHER!
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-blue-200 mt-1">
            CAPACITAÇÃO NAS ÁREAS DA INFORMÁTICA, ADMINISTRAÇÃO E PROFISSIONALIZANTES.
          </p>
        </div>
        <div className="flex items-center mt-4 sm:mt-0">
          <img
            src={LOGO_URL}
            alt="Profissionaliza Logo"
            className="h-10 sm:h-12 md:h-14" // Adjusted height, width will be auto
            
                                                        // This might need adjustment or removal if the SVG logo is already light-colored.
          />
          {/*
            If the original SVG logo is already white or light-colored and designed for dark backgrounds,
            the `style` attribute with the filter might not be necessary or could be counterproductive.
            Test with the actual logo; if it doesn't look right, consider removing the filter style.
          */}
        </div>
      </div>
    </header>
  );
};
