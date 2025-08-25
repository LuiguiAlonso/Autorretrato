import React, { useEffect, useState } from 'react';

const Uno = () => {
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
        
        {/* Espejo central con fragmentos flotantes */}
        <div className="relative w-full max-w-4xl h-96 mb-16">
          
          {/* Espejo central roto */}
          <div 
            className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
          >
            {/* Marco del espejo principal */}
            <div className="relative">
              <div className="w-48 h-64 border-4 border-blue-300/50 rounded-lg bg-gradient-to-br from-slate-800 to-blue-900 shadow-2xl shadow-blue-500/30 transform rotate-12">
                {/* Grietas en el espejo */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 250">
                  <path 
                    d="M50 50 L150 200 M100 30 L80 220 M30 120 L170 180" 
                    stroke="rgba(147, 197, 253, 0.4)" 
                    strokeWidth="2" 
                    fill="none"
                  />
                </svg>
                {/* Reflejo distorsionado */}
                <div className="absolute inset-2 bg-gradient-to-br from-blue-400 via-indigo-500 to-cyan-400 opacity-70 rounded"></div>
                {/* Brillo del espejo */}
                <div className="absolute inset-2 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded"></div>
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
                  className="border-2 border-blue-300/60 bg-gradient-to-br from-blue-200 via-indigo-300 to-cyan-200 shadow-xl shadow-blue-500/30"
                  style={{
                    width: `${fragment.size}px`,
                    height: `${fragment.size * 1.2}px`,
                    opacity: fragment.opacity,
                    clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
                    animation: `float-${fragment.id} ${4 + Math.random() * 2}s ease-in-out infinite alternate`
                  }}
                >
                  {/* Reflejo en el fragmento */}
                  <div className="w-full h-full bg-gradient-to-br from-white/30 to-blue-100/10"></div>
                  {/* Brillo interior */}
                  <div className="absolute inset-1 bg-gradient-to-tr from-transparent via-blue-100/20 to-white/40 rounded-sm"></div>
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
              Siento que aún no me conozco del todo. A veces pruebo distintas versiones de mí mismo, 
              como si buscara descubrir cuál refleja mejor quién soy.
            </p>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed italic">
              Me pregunto si esas variaciones son máscaras… o si todas son parte de la misma esencia.
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
            onClick={() => window.location.href = '/dos'}
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