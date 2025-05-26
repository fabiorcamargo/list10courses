
import React, { useState } from 'react';
import { Course } from '../types';

interface SelectionSummaryProps {
  selectedCourses: Course[];
  courseSelectionLimit: number; 
}

export const SelectionSummary: React.FC<SelectionSummaryProps> = ({ selectedCourses, courseSelectionLimit }) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const handleCopyCourses = async () => {
    if (selectedCourses.length === 0) return;

    const courseNames = selectedCourses.map(course => course.name).join('\n');
    try {
      await navigator.clipboard.writeText(courseNames);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000); // Reset status after 2 seconds
    } catch (err) {
      console.error('Failed to copy courses: ', err);
      setCopyStatus('error');
      alert('Erro ao copiar os cursos. Por favor, tente manualmente ou verifique as permissões do navegador.');
      setTimeout(() => setCopyStatus('idle'), 3000);
    }
  };

  const handleSendViaWhatsApp = () => {
    if (selectedCourses.length === 0) return;

    const headerText = "Olá! Tenho interesse nos seguintes cursos:\n";
    const courseListText = selectedCourses.map(course => `- ${course.name}`).join('\n');
    const fullMessage = `${headerText}\n${courseListText}`;
    const encodedMessage = encodeURIComponent(fullMessage);
    const whatsappNumber = "5544984475377"; // Brazil country code + area code + number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="mt-10 p-6 bg-gradient-to-r from-sky-600 to-blue-700 text-white rounded-xl shadow-2xl">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center">
        Resumo da Seleção de Cursos
      </h2>
      <p className="text-center text-sky-200 text-xs italic mb-4">
        (Limite de seleção atual: {courseSelectionLimit} curso(s))
      </p>
      {selectedCourses.length === 0 ? (
        <p className="text-center text-sky-100 text-lg">Nenhum curso selecionado ainda. Explore as opções acima!</p>
      ) : (
        <div>
          <p className="text-lg mb-4 text-center">
            Você selecionou <span className="font-extrabold text-yellow-300">{selectedCourses.length} de {courseSelectionLimit}</span> curso(s):
          </p>
          <ul className="space-y-2 max-h-60 overflow-y-auto bg-white/10 p-4 rounded-lg backdrop-blur-sm mb-6">
            {selectedCourses.map(course => (
              <li key={course.id} className="py-2 px-3 bg-white/20 rounded-md text-sm sm:text-base shadow-sm">
                {course.name}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={handleSendViaWhatsApp}
              className="bg-white hover:bg-green-300 text-blue-800 font-bold py-3 px-6 sm:px-8 rounded-lg shadow-md transition-transform duration-150 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-75 w-full sm:w-auto flex items-center justify-center gap-2"
              aria-label="Enviar lista de cursos selecionados via WhatsApp"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50" // Simplified viewBox, original was 256 with scale(5.12) -> 256/5.12 = 50
                className="h-6 w-6" // Standard icon size
              >
                <g fill="#00ba15" style={{ mixBlendMode: 'normal' }}>
                  {/* Path data from original SVG, coordinates are for a 50x50 viewbox effectively */}
                  <path d="M25,2c-12.682,0 -23,10.318 -23,23c0,3.96 1.023,7.854 2.963,11.29l-2.926,10.44c-0.096,0.343 -0.003,0.711 0.245,0.966c0.191,0.197 0.451,0.304 0.718,0.304c0.08,0 0.161,-0.01 0.24,-0.029l10.896,-2.699c3.327,1.786 7.074,2.728 10.864,2.728c12.682,0 23,-10.318 23,-23c0,-12.682 -10.318,-23 -23,-23zM36.57,33.116c-0.492,1.362 -2.852,2.605 -3.986,2.772c-1.018,0.149 -2.306,0.213 -3.72,-0.231c-0.857,-0.27 -1.957,-0.628 -3.366,-1.229c-5.923,-2.526 -9.791,-8.415 -10.087,-8.804c-0.295,-0.389 -2.411,-3.161 -2.411,-6.03c0,-2.869 1.525,-4.28 2.067,-4.864c0.542,-0.584 1.181,-0.73 1.575,-0.73c0.394,0 0.787,0.005 1.132,0.021c0.363,0.018 0.85,-0.137 1.329,1.001c0.492,1.168 1.673,4.037 1.819,4.33c0.148,0.292 0.246,0.633 0.05,1.022c-0.196,0.389 -0.294,0.632 -0.59,0.973c-0.296,0.341 -0.62,0.76 -0.886,1.022c-0.296,0.291 -0.603,0.606 -0.259,1.19c0.344,0.584 1.529,2.493 3.285,4.039c2.255,1.986 4.158,2.602 4.748,2.894c0.59,0.292 0.935,0.243 1.279,-0.146c0.344,-0.39 1.476,-1.703 1.869,-2.286c0.393,-0.583 0.787,-0.487 1.329,-0.292c0.542,0.194 3.445,1.604 4.035,1.896c0.59,0.292 0.984,0.438 1.132,0.681c0.148,0.242 0.148,1.41 -0.344,2.771z" />
                </g>
              </svg>
              Enviar Lista
            </button>
            <button
              onClick={handleCopyCourses}
              disabled={copyStatus === 'copied' || selectedCourses.length === 0}
              className={`bg-yellow-400 hover:bg-yellow-600 text-gray-800 font-bold py-3 px-6 sm:px-8 rounded-lg shadow-md transition-all duration-150 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 w-full sm:w-auto flex items-center justify-center gap-2 ${copyStatus === 'copied' ? 'bg-green-500 hover:bg-green-600' : ''} ${copyStatus === 'error' ? 'bg-red-500 hover:bg-red-600' : ''} ${selectedCourses.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-live="polite"
              aria-label="Copiar nomes dos cursos selecionados para a área de transferência"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {copyStatus === 'copied' ? 'Copiado!' : copyStatus === 'error' ? 'Erro ao Copiar' : 'Copiar Seleção'}
            </button>
          </div>
          {copyStatus === 'copied' && (
            <p className="text-center text-green-300 mt-3 text-sm" role="status">
              Nomes dos cursos copiados para a área de transferência!
            </p>
          )}
           {copyStatus === 'error' && (
            <p className="text-center text-red-300 mt-3 text-sm" role="status">
              Não foi possível copiar. Tente novamente ou copie manualmente.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
