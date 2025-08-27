import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const MusicContext = createContext();

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic debe usarse dentro de MusicProvider');
  }
  return context;
};

export const MusicProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // useEffect para inicializar el audio (solo una vez)
  useEffect(() => {
    // Crear el elemento de audio
    audioRef.current = new Audio('/music/background.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    audioRef.current.preload = 'auto';

    // Eventos del audio
    const handleCanPlayThrough = () => {
      setIsLoaded(true);
      tryAutoPlay();
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough);
    audioRef.current.addEventListener('play', handlePlay);
    audioRef.current.addEventListener('pause', handlePause);

    // Función para intentar autoplay
    const tryAutoPlay = async () => {
      if (audioRef.current && audioRef.current.readyState >= 4) {
        try {
          await audioRef.current.play();
          setHasUserInteracted(true);
          console.log('Música iniciada automáticamente');
        } catch (error) {
          console.log('Autoplay bloqueado, esperando interacción del usuario');
        }
      }
    };

    // Detector de primera interacción del usuario
    const handleFirstInteraction = async () => {
      if (!hasUserInteracted && audioRef.current) {
        setHasUserInteracted(true);
        try {
          await audioRef.current.play();
          console.log('Música iniciada por interacción del usuario');
        } catch (error) {
          console.log('Error al iniciar música:', error);
        }
      }
    };

    // Detector específico para scroll en móviles
    let scrollTimer;
    const handleScroll = () => {
      if (!hasUserInteracted) {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          handleFirstInteraction();
        }, 100);
      }
    };

    // Agregar evento de scroll separado (no se remueve automáticamente)
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Intentar autoplay después de un breve delay
    const autoplayTimer = setTimeout(tryAutoPlay, 1000);

    // Agregar listeners para múltiples tipos de interacción (incluyendo eventos táctiles más específicos)
    const events = [
      'click', 'keydown', 'touchstart', 'mousedown', 'scroll', 
      'mousemove', 'mouseenter', 'touchmove', 'touchend', 
      'wheel', 'gesturestart', 'orientationchange'
    ];
    events.forEach(event => {
      document.addEventListener(event, handleFirstInteraction, { once: true, passive: true });
    });

    // Cleanup
    return () => {
      clearTimeout(autoplayTimer);
      clearTimeout(scrollTimer);
      
      window.removeEventListener('scroll', handleScroll);
      
      events.forEach(event => {
        document.removeEventListener(event, handleFirstInteraction);
      });
      
      if (audioRef.current) {
        audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
        audioRef.current.removeEventListener('play', handlePlay);
        audioRef.current.removeEventListener('pause', handlePause);
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []); // Sin dependencias para que solo se ejecute una vez

  // useEffect separado para manejar cambios de volumen
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const play = async () => {
    if (audioRef.current && isLoaded) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setHasUserInteracted(true);
      } catch (error) {
        console.error('Error al reproducir música:', error);
      }
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const changeVolume = (newVolume) => {
    setVolume(newVolume);
    // El volumen se actualiza en el useEffect separado
  };

  // Función para obtener el tiempo actual (útil para debugging)
  const getCurrentTime = () => {
    return audioRef.current ? audioRef.current.currentTime : 0;
  };

  return (
    <MusicContext.Provider value={{
      isPlaying,
      volume,
      isLoaded,
      hasUserInteracted,
      play,
      pause,
      toggle,
      changeVolume,
      getCurrentTime // Función adicional para debugging
    }}>
      {children}
    </MusicContext.Provider>
  );
};