import React, { useEffect, useRef, useState, useMemo } from "react";
import LogoLoop from '../components/LogoLoop/LogoLoop';
import { useTheme } from '../contexts/ThemeContext';
import Windmill from '../components/Windmill/Windmill';
import "./Home.css";

/*
  Put your MP4/WebM files inside public/videos/
  Example paths below assume that (so they are served from /videos/...)
*/
const VIDEO_LIST = [
  { webm: "/videos/video1.webm", mp4: "/videos/video1.mp4" },
  { webm: "/videos/video2.webm", mp4: "/videos/video2.mp4" },
  { webm: "/videos/video3.webm", mp4: "/videos/video3.mp4" }
];

const SWITCH_INTERVAL = 5000; // ms per slide (5 seconds)

// (Gallery images were removed; clients carousel will be used instead)
// Use images for gallery thumbnails. Point all thumbnails to the shared
// `/videos/image.png` file in the public folder (served from /videos/...)
const Home = () => {
  useTheme();
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);
  const videoRef0 = useRef(null);
  const videoRef1 = useRef(null);
  const videoRefs = useMemo(() => [videoRef0, videoRef1], []);
  const [activeLayer, setActiveLayer] = useState(0); // which video element is visible (0 or 1)
  const heroSectionRef = useRef(null);
  const heroContentRef = useRef(null);
  const clientsSectionRef = useRef(null);
  const [logoSpeed, setLogoSpeed] = useState(25);

  // auto-advance carousel (always running)
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    if (VIDEO_LIST.length > 1) {
      timerRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % VIDEO_LIST.length);
      }, SWITCH_INTERVAL);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // when current changes, load the next video into the inactive layer and play it,
  // then crossfade by toggling `activeLayer` when the new video starts playing
  useEffect(() => {
    const nextLayer = 1 - activeLayer;
    const activeVid = videoRefs[activeLayer].current;
    const nextVid = videoRefs[nextLayer].current;
    if (!nextVid) return;

    // prepare next video immediately with both WebM and MP4 sources
    const videoSources = nextVid.querySelectorAll('source');
    if (videoSources.length >= 2) {
      videoSources[0].src = VIDEO_LIST[current].webm;
      videoSources[1].src = VIDEO_LIST[current].mp4;
      nextVid.load(); // Reload with new sources
    }
    nextVid.preload = 'auto';
    nextVid.muted = true;
    nextVid.playsInline = true;
    nextVid.loop = true;
    nextVid.currentTime = 0; // Reset to start

    if (activeVid) {
      activeVid.loop = true;
    }

    const tryPlay = () => {
      const p = nextVid.play();
      if (p && p.catch) {
        p.catch(() => {
          // ignore autoplay block
        });
      }
    };

    const onCanPlay = () => {
      // Video is ready, switch immediately
      setActiveLayer(nextLayer);
      try {
        if (activeVid && !activeVid.paused) {
          activeVid.pause();
        }
      } catch (e) { }
    };

    const onPlaying = () => {
      // Ensure we're on the right layer
      setActiveLayer(nextLayer);
    };

    // Use both canplay and playing events for faster switching
    nextVid.removeEventListener('canplay', onCanPlay);
    nextVid.removeEventListener('playing', onPlaying);
    nextVid.addEventListener('canplay', onCanPlay, { once: true });
    nextVid.addEventListener('playing', onPlaying);

    // Start loading and playing immediately
    tryPlay();

    // Fallback: switch after a very short delay to prevent blank screens
    const fallback = setTimeout(() => {
      if (nextVid.readyState >= 2) { // HAVE_CURRENT_DATA or better
        setActiveLayer(nextLayer);
        tryPlay();
      }
    }, 100);

    return () => {
      nextVid.removeEventListener('canplay', onCanPlay);
      nextVid.removeEventListener('playing', onPlaying);
      clearTimeout(fallback);
    };
    // intentionally excluding activeLayer from deps so switching is driven by `current`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  // Manual navigation removed: carousel auto-advances only



  // small hack: add `app-loaded` class to trigger gallery stagger after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      document.documentElement.classList.add("app-loaded");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // initialize first layer on mount - aggressive preload for instant playback
  useEffect(() => {
    const v0 = videoRefs[0].current;
    if (v0) {
      // Set both WebM and MP4 sources for first video
      const sources0 = v0.querySelectorAll('source');
      if (sources0.length >= 2) {
        sources0[0].src = VIDEO_LIST[0].webm;
        sources0[1].src = VIDEO_LIST[0].mp4;
      }
      v0.preload = 'auto';
      v0.muted = true;
      v0.playsInline = true;
      v0.loop = true;
      v0.autoplay = true;
      v0.currentTime = 0;

      // Force immediate load
      v0.load();

      // Preload next video immediately
      const v1 = videoRefs[1].current;
      if (v1 && VIDEO_LIST.length > 1) {
        const sources1 = v1.querySelectorAll('source');
        if (sources1.length >= 2) {
          sources1[0].src = VIDEO_LIST[1].webm;
          sources1[1].src = VIDEO_LIST[1].mp4;
        }
        v1.preload = 'auto';
        v1.muted = true;
        v1.playsInline = true;
        v1.loop = true;
        v1.load();
      }

      // Play as soon as possible
      const attemptPlay = () => {
        const p = v0.play();
        if (p && p.catch) {
          p.catch(() => {
            // If autoplay fails, retry on user interaction
            document.addEventListener('click', () => v0.play(), { once: true });
          });
        }
      };

      if (v0.readyState >= 2) {
        attemptPlay();
      } else {
        v0.addEventListener('loadeddata', attemptPlay, { once: true });
      }
    }
  }, [videoRefs]);

  // Keep logo speed constant regardless of scroll velocity
  useEffect(() => {
    setLogoSpeed(25);
  }, []);

  // Reset transform on mount - content should be fixed, no parallax
  useEffect(() => {
    if (heroContentRef.current) {
      heroContentRef.current.style.transform = '';
    }
  }, []);

  // Scroll reveal animations for sections
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const elements = document.querySelectorAll('[data-scroll-reveal]');
    elements.forEach((el) => observer.observe(el));

    // Heading animations
    const headingObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay') || '0';
            const delayMs = parseFloat(delay) * 100;
            setTimeout(() => {
              entry.target.classList.add('heading-animated');
            }, delayMs);
            headingObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -80px 0px' }
    );

    const headings = document.querySelectorAll('[data-heading-animate]');
    headings.forEach((heading) => headingObserver.observe(heading));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      headings.forEach((heading) => headingObserver.unobserve(heading));
    };
  }, []);

  const clientLogoSrcs = [
    '/images/clients/Godrejconsumerproducts.jpg',
    '/images/clients/BharatPetroleum.png',
    '/images/clients/dalmia.jpg',
    '/images/clients/jktyre.jpg',
    '/images/clients/arvindmills.png',
    '/images/clients/Raymond.png',
    '/images/clients/ReliancePower.jpg',
    '/images/clients/mahindra.png',
    '/images/clients/volvo.png',
    '/images/clients/NLC.jpg',
    '/images/clients/ICF.jpg',
    '/images/clients/IFC.png',
    '/images/clients/UNIDO.png',
    '/images/clients/giz.png',
    '/images/clients/Concorde Textiles.jpg',
    '/images/clients/KG fabrics.jpg',
    '/images/clients/Varroc polymers.jpg',
  ];

  const clientNodes = clientLogoSrcs.map((src, i) => ({
    src,
    alt: `Client ${i + 1}`,
    href: '/clients'
  }));

  return (
    <div className="home-page">
      {/* HERO VIDEO CAROUSEL */}
      <section
        className="video-hero-container"
        aria-label="Intro video"
      >
        <div
          className="video-hero"
          ref={heroSectionRef}
        >
          {/* Company Logo - Top Left */}
          <div className="hero-logo">
            <img src="/videos/logo.png" alt="CEEP Logo" />
          </div>

          {/* Two layered videos: one visible, one preloads the next clip */}
          <video
            ref={videoRefs[0]}
            className={`video-bg layer ${activeLayer === 0 ? 'active' : ''}`}
            muted
            playsInline
            autoPlay
            preload="auto"
          >
            <source src="" type="video/webm" />
            <source src="" type="video/mp4" />
          </video>

          <video
            ref={videoRefs[1]}
            className={`video-bg layer ${activeLayer === 1 ? 'active' : ''}`}
            muted
            playsInline
            autoPlay
            preload="auto"
          >
            <source src="" type="video/webm" />
            <source src="" type="video/mp4" />
          </video>

          <div className="video-overlay" />

          <div className="hero-content-wrap" ref={heroContentRef}>
            {/* Left large headline */}
            <div className="hero-left-headline">
              <h1 className="hero-main-title">Centre for Energy<br /> Environment & Productivity</h1>
            </div>
          </div>

          {/* Controls removed — carousel auto-advances only */}
        </div>
      </section>

      {/* CONTENT BELOW VIDEO */}
      <section className="content-hero" data-scroll-reveal>
        <div className="content-inner">
          <div className="welcome-content-wrapper">
            <div className="welcome-text">
              <h2 className="section-intro" data-heading-animate>Welcome</h2>
              <p className="section-lead" data-heading-animate data-delay="1">
                At the Centre for Energy, Environment and Productivity (CEEP) we collaborate and strive to assist organisations in improved use of resources be it energy, water, human resources, time and anything to do with productivity. Our consulting and training services leverage our deep industry expertise and use analytical rigor to help organisations unveil improvement opportunities, make informed decisions rapidly and solve their critical business problems.
              </p>
            </div>
            <div className="welcome-windmill">
              <Windmill width="100%" height="100%" />
            </div>
          </div>
        </div>
      </section>

      {/* CLIENTS CAROUSEL (replaces gallery) */}
      <section id="clients-carousel" className="gallery-section" ref={clientsSectionRef} data-scroll-reveal>
        <div className="container">
          <h3 className="section-title" data-heading-animate>Our Clients</h3>
          <LogoLoop
            logos={clientNodes}
            speed={logoSpeed}
            direction="left"
            logoHeight={90}
            gap={50}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel="Clients carousel"
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="site-footer">
      </footer>

      {/* lightbox removed; clients carousel is used instead */}
    </div>
  );
};

export default Home;
