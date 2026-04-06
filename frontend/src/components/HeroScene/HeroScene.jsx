import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HeroScene.css';

const HeroScene = () => {
    const videos = [
        { mp4: '/videos/video1.mp4', webm: '/videos/video1.webm' },
        { mp4: '/videos/video2.mp4', webm: '/videos/video2.webm' },
        { mp4: '/videos/video3.mp4', webm: '/videos/video3.webm' }
    ];

    const [activeLayer, setActiveLayer] = useState(0); 
    const [indices, setIndices] = useState([0, 1]); 
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Fallback timer: Show content after 5 seconds
        const fallback = setTimeout(() => {
            setIsLoaded(true);
        }, 5000);

        const interval = setInterval(() => {
            // 1. Toggle the active layer to START the cross-fade transition
            setActiveLayer((prevActive) => {
                const nextActive = prevActive === 0 ? 1 : 0;
                
                // 2. WAIT for the current transition to finish (fadeOut)
                // before updating the source of the layer that's now hidden
                setTimeout(() => {
                    setIndices((prevIndices) => {
                        const newIndices = [...prevIndices];
                        // The layer that just became hidden (prevActive)
                        // should now preload the video that follows the one in the newly active layer (nextActive)
                        newIndices[prevActive] = (prevIndices[nextActive] + 1) % videos.length;
                        return newIndices;
                    });
                }, 2000); 

                return nextActive;
            });
        }, 8500); 

        return () => {
            clearInterval(interval);
            clearTimeout(fallback);
        };
    }, [videos.length]);

    const handleVideoLoad = () => {
        setIsLoaded(true);
    };

    const handleContactClick = (e) => {
        e.preventDefault();
        // Priority: Use the Lenis smooth scroll instance if available
        if (window.lenis) {
            window.lenis.scrollTo('#contact');
        } else {
            // Fallback: Use corrected selector for standard scroll
            const footer = document.querySelector('.footer');
            if (footer) {
                footer.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <section className={`video-hero-container ${isLoaded ? 'loaded' : 'loading'}`}>
            {!isLoaded && (
                <div className="hero-loader">
                    <div className="loader-content">
                        <div className="loader-spinner"></div>
                        <p>Loading experience</p>
                    </div>
                </div>
            )}
            <div className="video-hero">
                <div className="video-overlay"></div>

                <div className="hero-content-wrap">
                    <div className="hero-content">
                        <div className="content-inner">
                            <h1 className="hero-title reveal">
                                <span className="hero-title-line hero-title-line--small">Measure What Matters.</span>
                                <span className="hero-title-line hero-title-line--large">Improve What Counts</span>
                            </h1>
                            <p className="hero-description reveal delay-2">
                                Transforming operational performance through data-driven insight,
                                engineering depth, and practical implementation.
                            </p>
                            <div className="hero-ctas reveal delay-4">
                                <Link to="/services" className="btn btn-primary">Learn more</Link>
                                <a href="#contact" onClick={handleContactClick} className="btn btn-ghost">Contact us</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hero-brand-area">
                    <div className="hero-logo-text">
                        <span className="company-name-sub">Centre for Energy, Environment and Productivity</span>
                    </div>
                </div>

                {/* Layer 0 (A) */}
                <video
                    className={`video-bg layer ${activeLayer === 0 ? 'active' : ''}`}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onCanPlayThrough={activeLayer === 0 ? handleVideoLoad : undefined}
                    preload="auto"
                    src={videos[indices[0]].mp4}
                >
                </video>
                
                {/* Layer 1 (B) */}
                <video
                    className={`video-bg layer ${activeLayer === 1 ? 'active' : ''}`}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onCanPlayThrough={activeLayer === 1 ? handleVideoLoad : undefined}
                    preload="auto"
                    src={videos[indices[1]].mp4}
                >
                </video>
            </div>
        </section>
    );
};

export default HeroScene;
