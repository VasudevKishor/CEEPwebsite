import { useEffect, useRef, useState } from 'react';
import './TrueFocus.css';

const TrueFocus = ({
    sentence = 'True Focus',
    separator = ' ',
    manualMode = false,
    blurAmount = 5,
    borderColor = 'var(--color-blue)',
    glowColor = 'rgba(59, 130, 246, 0.4)',
    animationDuration = 0.5,
    pauseBetweenAnimations = 1
}) => {
    const words = sentence.split(separator);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lastActiveIndex, setLastActiveIndex] = useState(null);
    const containerRef = useRef(null);
    const wordRefs = useRef([]);
    const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

    useEffect(() => {
        if (!manualMode) {
            const interval = setInterval(
                () => {
                    setCurrentIndex(prev => (prev + 1) % words.length);
                },
                (animationDuration + pauseBetweenAnimations) * 1000
            );

            return () => clearInterval(interval);
        }
        return undefined;
    }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

    useEffect(() => {
        if (currentIndex === null || currentIndex === -1) return;

        if (!wordRefs.current[currentIndex] || !containerRef.current) return;

        const parentRect = containerRef.current.getBoundingClientRect();
        const activeRect = wordRefs.current[currentIndex].getBoundingClientRect();

        setFocusRect({
            x: activeRect.left - parentRect.left,
            y: activeRect.top - parentRect.top,
            width: activeRect.width,
            height: activeRect.height
        });
    }, [currentIndex, words.length]);

    const handleMouseEnter = index => {
        if (manualMode) {
            setLastActiveIndex(index);
            setCurrentIndex(index);
        }
    };

    const handleMouseLeave = () => {
        if (manualMode) {
            setCurrentIndex(lastActiveIndex);
        }
    };

    return (
        <div className="focus-container" ref={containerRef}>
            {words.map((word, index) => {
                const isActive = index === currentIndex;
                return (
                    <span
                        key={index}
                        ref={el => (wordRefs.current[index] = el)}
                        className={`focus-word ${manualMode ? 'manual' : ''} ${isActive && !manualMode ? 'active' : ''}`}
                        style={{
                            filter: isActive ? 'blur(0px)' : `blur(${blurAmount}px)`,
                            '--border-color': borderColor,
                            '--glow-color': glowColor,
                            transition: `filter ${animationDuration}s cubic-bezier(0.4, 0, 0.2, 1)`
                        }}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {word}
                    </span>
                );
            })}

            <div
                className="focus-frame"
                style={{
                    transform: `translate3d(${focusRect.x}px, ${focusRect.y}px, 0)`,
                    width: `${focusRect.width}px`,
                    height: `${focusRect.height}px`,
                    opacity: currentIndex >= 0 ? 1 : 0,
                    transition: `all ${animationDuration}s cubic-bezier(0.4, 0, 0.2, 1)`,
                    '--border-color': borderColor,
                    '--glow-color': glowColor,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    pointerEvents: 'none'
                }}
            >
                <span className="corner top-left"></span>
                <span className="corner top-right"></span>
                <span className="corner bottom-left"></span>
                <span className="corner bottom-right"></span>
            </div>
        </div>
    );
};

export default TrueFocus;

