import thorax from '../../data/images/thorax.jpg';
import pause from '../../data/images/pause.png';
import play from '../../data/images/play.png';
import '../../styles/general.css';
import React, { useState, useCallback, useEffect } from 'react';
import SpectrogramPlayer from 'react-audio-spectrogram-player';

export default function Player({ data }) {
    const [activeIndex, setActiveIndex] = useState(null);
    const [currentAudio, setCurrentAudio] = useState(null);
    const [isLooping, setIsLooping] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);

    // Остановка текущего аудио
    const stopCurrentAudio = useCallback(() => {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio.onended = null;
            setCurrentAudio(null);
            setIsPlaying(false);
        }
    }, [currentAudio]);

    // Воспроизведение звука
    const playSound = useCallback((valveName) => {
        // Получаем URL из объекта data[0] по ключу
        const audioUrl = data[0]?.[valveName];
        
        if (!audioUrl) {
            console.error('No audio for valve:', valveName);
            return;
        }

        // Если уже играет этот же звук, ничего не делаем
        if (currentAudio && currentAudio.src === audioUrl) {
            return;
        }

        // Останавливаем текущий
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio.onended = null;
        }

        // Создаем новый
        const newAudio = new Audio(audioUrl);
        newAudio.loop = isLooping;
        
        // Обработчик окончания
        newAudio.onended = () => {
            if (!isLooping) {
                setIsPlaying(false);
                setCurrentAudio(null);
                setActiveIndex(null);
            }
        };

        // Пытаемся воспроизвести
        const playPromise = newAudio.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    setCurrentAudio(newAudio);
                    setIsPlaying(true);
                    setActiveIndex(valveName);
                    console.log(`Playing: ${valveName} - ${audioUrl}`);
                })
                .catch(error => {
                    console.error("Playback failed:", error);
                    setCurrentAudio(null);
                    setIsPlaying(false);
                    setActiveIndex(null);
                });
        }
    }, [currentAudio, data, isLooping]);

    // Пауза/возобновление
    const togglePause = useCallback(() => {
        if (currentAudio) {
            if (!currentAudio.paused) {
                currentAudio.pause();
                setIsPlaying(false);
            } else {
                const playPromise = currentAudio.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => setIsPlaying(true))
                        .catch(error => console.error("Resume failed:", error));
                }
            }
        }
    }, [currentAudio]);

    // Полная остановка
    const stopSound = useCallback(() => {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            setCurrentAudio(null);
            setIsPlaying(false);
            setActiveIndex(null);
        }
    }, [currentAudio]);

    // Очистка при размонтировании
    useEffect(() => {
        return () => {
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }
        };
    }, [currentAudio]);

    // Компонент спектрограммы
    const CreateSpectrogram = useCallback(() => {
        const audioUrl = currentAudio?.src;
        if (audioUrl) {
            return <SpectrogramPlayer src={audioUrl} />;
        }
        return <div>Выберите аудио</div>;
    }, [currentAudio]);

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
                <div>
                    <button 
                        className={`stop-button ${!currentAudio ? 'active' : ''}`}
                        onClick={stopSound}>
                    </button>
                    <CreateSpectrogram />
                </div>
            </div>
        </div>
    );
}