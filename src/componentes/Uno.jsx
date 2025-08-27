import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Uno = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [fragmentsLoaded, setFragmentsLoaded] = useState(false);
  const [hoveredFragment, setHoveredFragment] = useState(null);
  const [fragmentMousePos, setFragmentMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setFragmentsLoaded(true), 800);
  }, []);

  // Generar posiciones aleatorias para los fragmentos
  const fragments = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 40,
    left: Math.random() * 80 + 10,
    top: Math.random() * 70 + 15,
    delay: Math.random() * 2,
    rotation: Math.random() * 360,
    opacity: Math.random() * 0.4 + 0.6
  }));

  const handleNavigateToNext = () => {
    navigate('/dos');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 overflow-hidden relative">
      {/* Estrellas de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 100 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-100 rounded-full shadow-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Nebulosas de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-400/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-cyan-400/8 rounded-full blur-3xl"></div>
      </div>

      {/* Contenedor principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        
        {/* Imagen central con fragmentos flotantes */}
        <div className="relative w-full max-w-4xl h-96 mb-16">
          
          {/* Imagen central */}
          <div 
            className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
          >
            {/* Contenedor de la imagen principal */}
            <div className="relative">
              <div className="w-64 h-64 border-4 border-blue-300/50 rounded-lg overflow-hidden shadow-2xl shadow-blue-500/30 transform rotate-12">
                <img 
                  src="/uno.png" 
                  alt="Autorretrato fragmentado"
                  className="w-full h-full object-cover"
                />
                {/* Overlay con efecto de cristal roto */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 256 256">
                  <path 
                    d="M64 64 L192 224 M128 32 L96 232 M32 128 L224 192" 
                    stroke="rgba(147, 197, 253, 0.6)" 
                    strokeWidth="3" 
                    fill="none"
                  />
                </svg>
                {/* Brillo del cristal */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent"></div>
              </div>
            </div>
          </div>

          {/* Fragmentos flotantes */}
          {fragments.map((fragment) => {
            const isHovered = hoveredFragment === fragment.id;
            
            return (
              <div
                key={fragment.id}
                className={`absolute transition-all duration-500 ease-out cursor-pointer ${
                  fragmentsLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  left: `${fragment.left}%`,
                  top: `${fragment.top}%`,
                  transform: isHovered 
                    ? `translate(${fragmentMousePos.x * 0.3}px, ${fragmentMousePos.y * 0.3}px) rotate(${fragment.rotation + (fragmentMousePos.x * 0.1)}deg) scale(1.1)`
                    : `rotate(${fragment.rotation}deg)`,
                  animationDelay: `${fragment.delay}s`,
                  zIndex: isHovered ? 30 : 20
                }}
                onMouseEnter={() => {
                  setHoveredFragment(fragment.id);
                }}
                onMouseLeave={() => {
                  setHoveredFragment(null);
                  setFragmentMousePos({ x: 0, y: 0 });
                }}
                onMouseMove={(e) => {
                  if (hoveredFragment === fragment.id) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    setFragmentMousePos({
                      x: e.clientX - centerX,
                      y: e.clientY - centerY
                    });
                  }
                }}
              >
                <div 
                  className="border-2 border-blue-300/60 bg-gradient-to-br from-blue-200 via-indigo-300 to-cyan-200 shadow-xl shadow-blue-500/30 overflow-hidden"
                  style={{
                    width: `${fragment.size}px`,
                    height: `${fragment.size}px`,
                    opacity: fragment.opacity,
                    clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
                    animation: `float-${fragment.id} ${4 + Math.random() * 2}s ease-in-out infinite alternate`
                  }}
                >
                  {/* Fragmento de la imagen */}
                  <img 
                    src="/uno.png" 
                    alt=""
                    className="w-full h-full object-cover opacity-80"
                    style={{
                      transform: `scale(${Math.random() * 0.5 + 1.2}) translate(${Math.random() * 40 - 20}%, ${Math.random() * 40 - 20}%)`
                    }}
                  />
                  {/* Overlay con brillo */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-100/20 to-white/40"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Texto principal */}
        <div 
          className={`max-w-4xl mx-auto text-center transition-all duration-1200 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-blue-300/20 shadow-xl shadow-blue-500/10">
            <p className="text-lg md:text-xl text-blue-50 leading-relaxed mb-6 font-light">
              Esta imagen refleja que aún no termino de conocerme del todo. El camino dividido simboliza las distintas posibilidades de lo que puedo llegar a ser, las rutas que exploro para descubrir con cuál me identifico más. La luz en el pecho representa la esencia que siempre me acompaña, incluso cuando no tengo todas las respuestas.
            </p>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed italic">
              El cielo estrellado y las constelaciones me recuerdan que la búsqueda de identidad no es un error ni un vacío, sino un proceso natural, guiado por señales internas y externas, un viajero que sigue explorando su propio mapa.
            </p>
          </div>
        </div>

        {/* Indicador de navegación */}
        <div 
          className={`mt-12 transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button 
            onClick={handleNavigateToNext}
            className="group bg-blue-600/20 hover:bg-blue-500/30 border border-blue-400/30 hover:border-blue-300/50 backdrop-blur-sm rounded-full px-8 py-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <div className="flex items-center space-x-3 text-blue-200 group-hover:text-blue-100">
              <span className="text-lg">Continuar explorando</span>
              <div className="w-6 h-6 rounded-full border border-blue-300 flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 12 12">
                  <path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Estilos de animación dinámicos */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes float-0 { 0% { transform: translateY(0px) rotate(0deg); } 100% { transform: translateY(-10px) rotate(5deg); } }
        @keyframes float-1 { 0% { transform: translateY(0px) rotate(10deg); } 100% { transform: translateY(-15px) rotate(15deg); } }
        @keyframes float-2 { 0% { transform: translateY(0px) rotate(-5deg); } 100% { transform: translateY(-12px) rotate(0deg); } }
        @keyframes float-3 { 0% { transform: translateY(0px) rotate(20deg); } 100% { transform: translateY(-8px) rotate(25deg); } }
        @keyframes float-4 { 0% { transform: translateY(0px) rotate(-10deg); } 100% { transform: translateY(-14px) rotate(-5deg); } }
        @keyframes float-5 { 0% { transform: translateY(0px) rotate(15deg); } 100% { transform: translateY(-9px) rotate(20deg); } }
        @keyframes float-6 { 0% { transform: translateY(0px) rotate(-15deg); } 100% { transform: translateY(-11px) rotate(-10deg); } }
        @keyframes float-7 { 0% { transform: translateY(0px) rotate(5deg); } 100% { transform: translateY(-13px) rotate(10deg); } }
      `}</style>
    </div>
  );
};

export default Uno;