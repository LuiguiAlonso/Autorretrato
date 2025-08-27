import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Tres = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Scroll hacia arriba al montar el componente
    window.scrollTo(0, 0);
    setIsVisible(true);
  }, []);

  const handleNavigateToAnterior = () => {
    navigate('/dos');
  };

  const handleNavigateToSiguiente = () => {
    navigate('/cuatro');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-800 to-purple-900 overflow-hidden relative">
      {/* Partículas de energía */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 60 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-200 rounded-full shadow-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.4,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Rayos de luz de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-400/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-red-400/8 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
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
            src="/tres.png" 
            alt="Visión del futuro"
            className="w-full h-auto max-h-80 object-contain rounded-2xl shadow-2xl shadow-orange-500/30"
          />
          {/* Aura de luz futurista alrededor de la imagen */}
          <div className="absolute inset-0 -m-6 bg-gradient-to-r from-cyan-300/10 via-yellow-200/20 to-purple-300/10 rounded-3xl blur-2xl animate-pulse pointer-events-none"></div>
        </div>

        {/* Texto principal */}
        <div 
          className={`max-w-4xl mx-auto text-center transition-all duration-1200 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-orange-300/20 shadow-xl shadow-orange-500/10">
            <p className="text-lg md:text-xl text-orange-50 leading-relaxed mb-6 font-light">
              Este retrato muestra la fascinación que siento por lo que aún no existe. Los circuitos encendidos en mi rostro 
              representan la unión entre mi humanidad y mi deseo de comprender la tecnología como extensión de lo que somos.
            </p>
            <p className="text-lg md:text-xl text-orange-100 leading-relaxed mb-6 italic">
              El horizonte futurista detrás, con ciudades brillantes y satélites, encarna mi impulso de imaginar cómo viviremos 
              en el mañana y cómo la innovación puede transformar nuestras vidas.
            </p>
            <p className="text-lg md:text-xl text-orange-50 leading-relaxed italic">
              Las constelaciones digitales simbolizan esa red infinita de ideas y posibilidades que me atraen, como si pudiera 
              asomarme a un futuro antes de que llegue. Esta imagen es un reflejo de cómo me proyecto: alguien que no se conforma 
              con el presente, sino que encuentra sentido en anticipar lo que vendrá.
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
            className="group bg-orange-600/20 hover:bg-orange-500/30 border border-orange-400/30 hover:border-orange-300/50 backdrop-blur-sm rounded-full px-6 py-3 transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center space-x-2 text-orange-200 group-hover:text-orange-100">
              <svg className="w-4 h-4 group-hover:-rotate-90 transition-transform duration-300" fill="currentColor" viewBox="0 0 12 12">
                <path d="M7.5 9l-3-3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
              <span>Anterior</span>
            </div>
          </button>
          
          <button 
            onClick={handleNavigateToSiguiente}
            className="group bg-orange-600/20 hover:bg-orange-500/30 border border-orange-400/30 hover:border-orange-300/50 backdrop-blur-sm rounded-full px-6 py-3 transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center space-x-2 text-orange-200 group-hover:text-orange-100">
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
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
};

export default Tres;