import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './HeroScene.css';

const HeroScene = () => {
    const videos = [
        { mp4: '/videos/video1.mp4' },
        { mp4: '/videos/video2.mp4' },
        { mp4: '/videos/video3.mp4' },
        { mp4: '/videos/video4.mp4' },
        { mp4: '/videos/video5.mp4' },
        { mp4: '/videos/video7.mp4' },
        { mp4: '/videos/video9.mp4' }
    ];

    const [activeLayer, setActiveLayer] = useState(0); 
    const [indices, setIndices] = useState([0, 1]); 
    const [isLoaded, setIsLoaded] = useState(false);

    const videoRef0 = useRef(null);
    const videoRef1 = useRef(null);

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
        }, 5000); 

        return () => {
            clearInterval(interval);
            clearTimeout(fallback);
        };
    }, [videos.length]);

    // Ensure the newly active video starts from the beginning
    useEffect(() => {
        const activeVideo = activeLayer === 0 ? videoRef0.current : videoRef1.current;
        if (activeVideo) {
            activeVideo.currentTime = 0;
            activeVideo.play().catch(err => console.log("Auto-play blocked or error:", err));
        }
    }, [activeLayer]);

    const handleVideoLoad = () => {
        setIsLoaded(true);
    };

    const handleVideoError = (layer) => {
        setIndices((prevIndices) => {
            const failedIndex = prevIndices[layer];
            let replacementIndex = (failedIndex + 1) % videos.length;

            if (replacementIndex === prevIndices[layer === 0 ? 1 : 0]) {
                replacementIndex = (replacementIndex + 1) % videos.length;
            }

            const nextIndices = [...prevIndices];
            nextIndices[layer] = replacementIndex;
            return nextIndices;
        });
    };

    const handleContactClick = (e) => {
        e.preventDefault();
        // Priority: Use the Lenis smooth scroll instance if available
        if (window.lenis) {
            window.lenis.scrollTo('#contact');
        } else {
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


                {/* Layer 0 (A) */}
                <video
                    ref={videoRef0}
                    className={`video-bg layer ${activeLayer === 0 ? 'active' : ''}`}
                    autoPlay
                    loop
                    muted
                    playsInline
                    webkit-playsinline="true"
                    disablePictureInPicture
                    controlsList="nodownload"
                    onCanPlayThrough={activeLayer === 0 ? handleVideoLoad : undefined}
                    onError={() => handleVideoError(0)}
                    preload="auto"
                    src={videos[indices[0]].mp4}
                >
                </video>
                
                {/* Layer 1 (B) */}
                <video
                    ref={videoRef1}
                    className={`video-bg layer ${activeLayer === 1 ? 'active' : ''}`}
                    autoPlay
                    loop
                    muted
                    playsInline
                    webkit-playsinline="true"
                    disablePictureInPicture
                    controlsList="nodownload"
                    onCanPlayThrough={activeLayer === 1 ? handleVideoLoad : undefined}
                    onError={() => handleVideoError(1)}
                    preload="auto"
                    src={videos[indices[1]].mp4}
                >
                </video>
            </div>
        </section>
    );
};

export default HeroScene;
