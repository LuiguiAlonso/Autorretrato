import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cuatro = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [floatingElements, setFloatingElements] = useState([]);

  useEffect(() => {
    // Scroll hacia arriba al montar el componente
    window.scrollTo(0, 0);
    setIsVisible(true);
    setTimeout(() => setImageLoaded(true), 1000);
    
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

  const handleNavigateToAnterior = () => {
    navigate('/tres');
  };

  const handleNavigateToInicio = () => {
    navigate('/');
  };

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
        
        {/* Imagen principal con elementos flotantes */}
        <div 
          className={`relative w-full max-w-4xl h-[500px] mb-16 transition-all duration-1200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Imagen del autorretrato */}
          <div className={`w-full h-full flex items-center justify-center transition-all duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <img 
              src="/cuatro.png" 
              alt="Autorretrato Final - Puente de cristal hacia el futuro"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl shadow-purple-500/20 border border-purple-300/20"
              onLoad={() => setImageLoaded(true)}
              style={{ filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.3))' }}
            />
          </div>

          {/* Elementos flotantes superpuestos */}
          <div className="absolute inset-0 pointer-events-none">
            {floatingElements.map((element) => (
              <div
                key={element.id}
                className={`absolute transition-all duration-2000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  left: `${(element.x / 400) * 100}%`,
                  top: `${(element.y / 500) * 100}%`,
                  animationDelay: `${element.delay}s`
                }}
              >
                {element.type === 'star' ? (
                  <div
                    className="text-yellow-300"
                    style={{
                      fontSize: `${element.size}px`,
                      opacity: element.opacity,
                      filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.8))',
                      animation: `float ${element.speed + 2}s ease-in-out infinite`
                    }}
                  >
                    ✦
                  </div>
                ) : (
                  <div
                    className="text-emerald-300"
                    style={{
                      fontSize: `${element.size}px`,
                      opacity: element.opacity,
                      filter: 'drop-shadow(0 0 4px rgba(6, 214, 160, 0.8))',
                      animation: `float ${element.speed + 1}s ease-in-out infinite reverse`
                    }}
                  >
                    ◈
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Partículas adicionales que fluyen */}
          <div className={`absolute inset-0 pointer-events-none transition-all duration-1500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div 
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
              style={{
                left: '20%',
                top: '30%',
                filter: 'drop-shadow(0 0 6px rgba(251, 191, 36, 0.8))',
                animation: 'drift 6s ease-in-out infinite'
              }}
            />
            <div 
              className="absolute w-1.5 h-1.5 bg-emerald-300 rounded-full"
              style={{
                left: '70%',
                top: '60%',
                filter: 'drop-shadow(0 0 6px rgba(6, 214, 160, 0.8))',
                animation: 'drift 4s ease-in-out infinite reverse'
              }}
            />
            <div 
              className="absolute w-2 h-2 bg-purple-300 rounded-full"
              style={{
                left: '50%',
                top: '20%',
                filter: 'drop-shadow(0 0 6px rgba(196, 132, 252, 0.8))',
                animation: 'drift 5s ease-in-out infinite'
              }}
            />
          </div>
        </div>

        {/* Texto principal */}
        <div 
          className={`max-w-4xl mx-auto text-center transition-all duration-1200 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-purple-300/20 shadow-xl shadow-purple-500/10">
            <p className="text-lg md:text-xl text-purple-50 leading-relaxed mb-6 font-light">
              Esta última escena une todas las partes de mi autorretrato. El puente de cristal es mi trayecto personal: incierto, pero fuerte y lleno de claridad en la dirección. A un lado, me acompaña la búsqueda de entenderme mejor, reflexionando sobre quién soy y hacia dónde quiero ir. Al otro, el portal simboliza la imaginación que me acompaña desde niño, ese refugio secreto que siempre me ofrece un camino alterno.
            </p>
            <p className="text-lg md:text-xl text-purple-100 leading-relaxed italic">
              Al fondo, la ciudad futurista representa la fascinación que me impulsa a caminar, el deseo de alcanzar lo que aún no existe. Mi figura pequeña frente a la inmensidad simboliza humildad, pero el hecho de avanzar muestra que no me detengo. Esta es la suma de todo: soy búsqueda, imaginación y proyección hacia adelante, un caminante del futuro que aún se descubre en el presente.
            </p>
          </div>
        </div>
          
        {/* Navegación */}
        <div 
          className={`mt-12 flex space-x-6 transition-all duration-1000 delay-1200 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >

        </div>
      </div>

      {/* Estilos de animación */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        @keyframes drift {
          0%, 100% { transform: translate(0px, 0px); opacity: 0.6; }
          33% { transform: translate(30px, -20px); opacity: 1; }
          66% { transform: translate(-20px, 30px); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};

export default Cuatro;