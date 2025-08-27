import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dos = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleNavigateToAnterior = () => {
    navigate('/');
  };

  const handleNavigateToSiguiente = () => {
    navigate('/tres');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-slate-900 overflow-hidden relative">
      {/* Cielo estrellado */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 80 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-100 rounded-full shadow-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Contenedor principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        
        {/* Imagen principal */}
        <div 
          className={`w-full max-w-lg mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <img 
            src="/dos.png" 
            alt="Portal de la imaginación"
            className="w-full h-auto max-h-80 object-contain rounded-2xl shadow-2xl shadow-emerald-500/30"
          />
          {/* Aura de luz creativa alrededor de la imagen */}
          <div className="absolute inset-0 -m-6 bg-gradient-to-r from-yellow-300/10 via-orange-200/20 to-yellow-300/10 rounded-3xl blur-2xl animate-pulse pointer-events-none"></div>
        </div>

        {/* Texto principal */}
        <div 
          className={`max-w-4xl mx-auto text-center transition-all duration-1200 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-emerald-300/20 shadow-xl shadow-emerald-500/10">
            <p className="text-lg md:text-xl text-emerald-50 leading-relaxed mb-6 font-light">
              Esta escena representa mi infancia y mi refugio en la imaginación. Los juguetes apagados a su alrededor son las 
              distracciones que dejaban de atraerme, porque mi verdadera diversión estaba en crear mundos nuevos.
            </p>
            <p className="text-lg md:text-xl text-emerald-100 leading-relaxed mb-6 italic">
              El portal luminoso simboliza la puerta hacia ese espacio interior al que solo yo podía entrar: allí inventaba 
              escenarios, personajes e historias que eran mucho más atractivos que lo real.
            </p>
            <p className="text-lg md:text-xl text-emerald-50 leading-relaxed italic">
              La luz que ilumina al niño es la fuerza de la creatividad que me acompañaba en silencio, una compañía invisible 
              que no necesitaba aprobación externa. La imagen muestra cómo, desde pequeño, la imaginación fue mi casa secreta, 
              un lugar íntimo que me ayudaba a definirme.
            </p>
          </div>
        </div>

        {/* Navegación */}
        <div 
          className={`mt-12 flex space-x-6 transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button 
            onClick={handleNavigateToAnterior}
            className="group bg-emerald-600/20 hover:bg-emerald-500/30 border border-emerald-400/30 hover:border-emerald-300/50 backdrop-blur-sm rounded-full px-6 py-3 transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center space-x-2 text-emerald-200 group-hover:text-emerald-100">
              <svg className="w-4 h-4 group-hover:-rotate-90 transition-transform duration-300" fill="currentColor" viewBox="0 0 12 12">
                <path d="M7.5 9l-3-3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
              <span>Anterior</span>
            </div>
          </button>
          
          <button 
            onClick={handleNavigateToSiguiente}
            className="group bg-emerald-600/20 hover:bg-emerald-500/30 border border-emerald-400/30 hover:border-emerald-300/50 backdrop-blur-sm rounded-full px-6 py-3 transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center space-x-2 text-emerald-200 group-hover:text-emerald-100">
              <span>Siguiente</span>
              <svg className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" fill="currentColor" viewBox="0 0 12 12">
                <path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Estilos de animación */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default Dos;