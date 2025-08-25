import React, { useEffect, useState } from 'react';

const Cuatro = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hourglassLoaded, setHourglassLoaded] = useState(false);
  const [floatingElements, setFloatingElements] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setHourglassLoaded(true), 1000);
    
    // Generar elementos flotantes (estrellas y caminos)
    const elements = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      type: i < 12 ? 'star' : 'path',
      size: Math.random() * 8 + 4,
      x: Math.random() * 200 + 100,
      y: Math.random() * 300 + 150,
      delay: Math.random() * 4,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.4
    }));
    setFloatingElements(elements);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-slate-900 overflow-hidden relative">
      {/* Partículas de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 80 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-200 rounded-full shadow-sm"
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

      {/* Nebulosas temporales */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-400/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-violet-400/8 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Contenedor principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        
        {/* Reloj de arena suspendido con elementos flotantes */}
        <div 
          className={`relative w-full max-w-4xl h-[500px] mb-16 transition-all duration-1200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <svg viewBox="0 0 400 500" className="w-full h-full mx-auto">
            <defs>
              <linearGradient id="hourglassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
              
              <linearGradient id="glassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
              </linearGradient>

              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Marco del reloj de arena */}
            <g className={`transition-all duration-1000 ${hourglassLoaded ? 'opacity-100' : 'opacity-0'}`}>
              {/* Base superior */}
              <rect x="150" y="50" width="100" height="20" rx="10" fill="url(#hourglassGradient)" stroke="#a855f7" strokeWidth="2"/>
              
              {/* Cristal superior */}
              <path d="M160 70 L240 70 L220 180 L180 180 Z" fill="url(#glassGradient)" stroke="#c084fc" strokeWidth="2" opacity="0.8"/>
              
              {/* Cristal inferior */}
              <path d="M180 320 L220 320 L240 430 L160 430 Z" fill="url(#glassGradient)" stroke="#c084fc" strokeWidth="2" opacity="0.8"/>
              
              {/* Cuello del reloj */}
              <path d="M180 180 L200 250 L220 180" stroke="#c084fc" strokeWidth="2" fill="none"/>
              <path d="M180 320 L200 250 L220 320" stroke="#c084fc" strokeWidth="2" fill="none"/>
              
              {/* Base inferior */}
              <rect x="150" y="430" width="100" height="20" rx="10" fill="url(#hourglassGradient)" stroke="#a855f7" strokeWidth="2"/>
              
              {/* Soporte suspendido */}
              <line x1="200" y1="20" x2="200" y2="50" stroke="#c084fc" strokeWidth="3" opacity="0.8"/>
              <circle cx="200" cy="15" r="8" fill="#c084fc" opacity="0.8"/>
            </g>

            {/* Elementos flotantes dentro del reloj */}
            {floatingElements.map((element) => (
              <g key={element.id} className={`transition-all duration-2000 ${hourglassLoaded ? 'opacity-100' : 'opacity-0'}`}>
                {element.type === 'star' ? (
                  <g>
                    <polygon 
                      points={`${element.x},${element.y - element.size} ${element.x + element.size * 0.3},${element.y - element.size * 0.3} ${element.x + element.size},${element.y - element.size * 0.3} ${element.x + element.size * 0.5},${element.y + element.size * 0.2} ${element.x + element.size * 0.8},${element.y + element.size} ${element.x},${element.y + element.size * 0.6} ${element.x - element.size * 0.8},${element.y + element.size} ${element.x - element.size * 0.5},${element.y + element.size * 0.2} ${element.x - element.size},${element.y - element.size * 0.3} ${element.x - element.size * 0.3},${element.y - element.size * 0.3}`}
                      fill="#fbbf24" 
                      opacity={element.opacity}
                      filter="url(#glow)"
                    >
                      <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="translate"
                        values={`0,0; 0,-20; 0,0`}
                        dur={`${element.speed + 2}s`}
                        repeatCount="indefinite"
                      />
                    </polygon>
                  </g>
                ) : (
                  <g>
                    <path 
                      d={`M${element.x - 15},${element.y} Q${element.x},${element.y - 10} ${element.x + 15},${element.y} Q${element.x + 25},${element.y + 15} ${element.x + 40},${element.y + 5}`}
                      stroke="#06d6a0" 
                      strokeWidth="2" 
                      fill="none" 
                      opacity={element.opacity}
                      filter="url(#glow)"
                    >
                      <animate
                        attributeName="stroke-dasharray"
                        values="0,100; 50,50; 100,0"
                        dur={`${element.speed + 1}s`}
                        repeatCount="indefinite"
                      />
                    </path>
                    
                    {/* Ramificaciones */}
                    <path 
                      d={`M${element.x + 10},${element.y - 5} Q${element.x + 20},${element.y - 20} ${element.x + 35},${element.y - 15}`}
                      stroke="#06d6a0" 
                      strokeWidth="1" 
                      fill="none" 
                      opacity={element.opacity * 0.7}
                    >
                      <animate
                        attributeName="stroke-dasharray"
                        values="0,50; 25,25; 50,0"
                        dur={`${element.speed + 1.5}s`}
                        repeatCount="indefinite"
                      />
                    </path>
                    
                    <path 
                      d={`M${element.x + 20},${element.y + 8} Q${element.x + 15},${element.y + 25} ${element.x + 30},${element.y + 30}`}
                      stroke="#06d6a0" 
                      strokeWidth="1" 
                      fill="none" 
                      opacity={element.opacity * 0.7}
                    >
                      <animate
                        attributeName="stroke-dasharray"
                        values="0,50; 25,25; 50,0"
                        dur={`${element.speed + 2}s`}
                        repeatCount="indefinite"
                      />
                    </path>
                  </g>
                )}
              </g>
            ))}

            {/* Flujo de elementos entre las cámaras */}
            <g className={`transition-all duration-1500 ${hourglassLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <circle cx="195" cy="240" r="2" fill="#fbbf24" opacity="0.8">
                <animate attributeName="cy" values="180;320;320;180" dur="4s" repeatCount="indefinite"/>
              </circle>
              <circle cx="200" cy="250" r="1.5" fill="#06d6a0" opacity="0.8">
                <animate attributeName="cy" values="190;330;330;190" dur="3.5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="205" cy="235" r="2" fill="#c084fc" opacity="0.8">
                <animate attributeName="cy" values="175;315;315;175" dur="4.5s" repeatCount="indefinite"/>
              </circle>
            </g>
          </svg>
        </div>

        {/* Texto principal */}
        <div 
          className={`max-w-4xl mx-auto text-center transition-all duration-1200 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-purple-300/20 shadow-xl shadow-purple-500/10">
            <p className="text-lg md:text-xl text-purple-50 leading-relaxed mb-6 font-light">
Dentro de mí habita una mirada que se adelanta al tiempo, como si mis pensamientos caminaran siempre 
    algunos pasos por delante del presente. Ese lado futurista me impulsa a imaginar escenarios donde la 
    tecnología, la creatividad y lo desconocido se transforman en posibilidades tangibles.  
            </p>
            <p className="text-lg md:text-xl text-purple-100 leading-relaxed italic">
             Me reconozco en el símbolo del infinito y en las formas geométricas que parecen surgir de otros mundos, 
    porque ambas me recuerdan que no estoy hecho para repetir lo establecido, sino para soñar con lo que aún 
    no existe y abrirle un espacio real en mi camino.
            </p>
          </div>
        </div>

        {/* Navegación */}
        <div 
          className={`mt-12 flex space-x-6 transition-all duration-1000 delay-1200 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button 
            onClick={() => window.location.href = '/tres'}
            className="group bg-purple-600/20 hover:bg-purple-500/30 border border-purple-400/30 hover:border-purple-300/50 backdrop-blur-sm rounded-full px-6 py-3 transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center space-x-2 text-purple-200 group-hover:text-purple-100">
              <svg className="w-4 h-4 group-hover:-rotate-90 transition-transform duration-300" fill="currentColor" viewBox="0 0 12 12">
                <path d="M7.5 9l-3-3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
              <span>Anterior</span>
            </div>
          </button>
          
          <button 
            onClick={() => window.location.href = '/cinco'}
            className="group bg-purple-600/20 hover:bg-purple-500/30 border border-purple-400/30 hover:border-purple-300/50 backdrop-blur-sm rounded-full px-6 py-3 transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center space-x-2 text-purple-200 group-hover:text-purple-100">
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

export default Cuatro;