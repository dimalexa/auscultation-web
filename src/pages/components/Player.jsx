// src/pages/Player.jsx
// src/pages/Player.jsx
import React, { useCallback, useState, useRef, useEffect } from 'react';
import AudioSpectrogram from './Spectrogram';
import '../../styles/general.css';

export default function Player({ data }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isLooping, setIsLooping] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const spectrogramRef = useRef(null);

  // Воспроизведение звука
  const playSound = useCallback((valveKey) => {
    const audioUrl = data[0]?.[valveKey];
    
    if (!audioUrl) {
      console.error('No audio for valve:', valveKey);
      return;
    }

    // Если уже играет этот же звук — переключаем паузу
    if (activeIndex === valveKey && spectrogramRef.current) {
      spectrogramRef.current.togglePlayPause();
      return;
    }

    // Останавливаем текущий
    if (spectrogramRef.current) {
      spectrogramRef.current.stop();
    }

    // Устанавливаем новый активный клапан
    setActiveIndex(valveKey);
    setIsPlaying(true);

    // Даем время на создание нового плеера
    setTimeout(() => {
      if (spectrogramRef.current) {
        spectrogramRef.current.play();
      }
    }, 200);
  }, [activeIndex, data]);

  // Остановка
  const stopSound = useCallback(() => {
    if (spectrogramRef.current) {
      spectrogramRef.current.stop();
    }
    setActiveIndex(null);
    setIsPlaying(false);
  }, []);

  // Обработчик окончания трека
  const handleFinish = useCallback(() => {
    if (!isLooping) {
      setActiveIndex(null);
      setIsPlaying(false);
    }
  }, [isLooping]);

  // Обработчик начала воспроизведения (для синхронизации состояния)
  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  return (
    <div className='general-block' style={{ gap: '10%' }}>
      <div className='wrap-player'>
        <div className='player'>
          <button 
            key='mitral' 
            className={`valve-button ${activeIndex === 'mitral' ? 'active' : ''}`}
            onClick={() => playSound('mitral')} 
            style={{ top: '57%', left: '57%' }}>
          </button>
          <button 
            key='aortic' 
            className={`valve-button ${activeIndex === 'aortic' ? 'active' : ''}`}
            onClick={() => playSound('aortic')} 
            style={{ top: '38%', left: '37%' }}>
          </button>
          <button 
            key='pulmonary' 
            className={`valve-button ${activeIndex === 'pulmonary' ? 'active' : ''}`}
            onClick={() => playSound('pulmonary')} 
            style={{ top: '38%', left: '50%' }}>
          </button>
          <button 
            key='tricuspid' 
            className={`valve-button ${activeIndex === 'tricuspid' ? 'active' : ''}`}
            onClick={() => playSound('tricuspid')} 
            style={{ top: '57%', left: '40%' }}>
          </button>
        </div>
        <div style={{display : 'flex', gap : '10%', justifyContent : 'center', flexDirection : 'column'}}>
          <button 
            className={`stop-button ${!activeIndex ? 'active' : ''}`}
            onClick={stopSound}>
          </button>
          <div className='spectrogramm'>
            {activeIndex && data[0]?.[activeIndex] && (
              <AudioSpectrogram 
                ref={spectrogramRef}
                key={activeIndex}
                url={data[0][activeIndex]}
                onPlay={handlePlay}
                onPause={handlePause}
                onFinish={handleFinish}
                isLooping={isLooping}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}