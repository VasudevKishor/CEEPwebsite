import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HeroScene.css';

const HeroScene = () => {
    const videos = [
        { mp4: '/videos/video1.mp4', webm: '/videos/video1.webm' },
        { mp4: '/videos/video2.mp4', webm: '/videos/video2.webm' },
        { mp4: '/videos/video3.mp4', webm: '/videos/video3.webm' }
    ];

    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [nextVideoIndex, setNextVideoIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Fallback timer: Show content after 5 seconds even if video events fail
        const fallback = setTimeout(() => {
            setIsLoaded(true);
        }, 5000);

        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
                setNextVideoIndex((prev) => (prev + 1) % videos.length);
                setIsTransitioning(false);
            }, 1000); // Wait for fade out
        }, 8000); // Rotate every 8 seconds

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
        const footer = document.querySelector('.site-footer');
        if (footer) {
            footer.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className={`video-hero-container ${isLoaded ? 'loaded' : 'loading'}`}>
            {!isLoaded && (
                <div className="hero-loader">
                    <div className="loader-content">
                        <div className="loader-spinner"></div>
                        <p>Loading Experience...</p>
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

                {/* Current Video Layer */}
                <video
                    key={`current-${currentVideoIndex}`}
                    className={`video-bg layer ${!isTransitioning ? 'active' : ''}`}
                    autoPlay
                    loop
                    muted
                    playsInline
                    onCanPlayThrough={handleVideoLoad}
                >
                    <source src={videos[currentVideoIndex].mp4} type="video/mp4" />
                    <source src={videos[currentVideoIndex].webm} type="video/webm" />
                </video>

                {/* Next Video Layer (pre-loading or transitioning) */}
                <video
                    key={`next-${nextVideoIndex}`}
                    className={`video-bg layer ${isTransitioning ? 'active' : ''}`}
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ opacity: isTransitioning ? 1 : 0 }}
                >
                    <source src={videos[nextVideoIndex].mp4} type="video/mp4" />
                    <source src={videos[nextVideoIndex].webm} type="video/webm" />
                </video>
            </div>
        </section>
    );
};

export default HeroScene;
