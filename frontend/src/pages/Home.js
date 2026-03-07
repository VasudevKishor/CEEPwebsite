import React, { useEffect, useRef, useState, useMemo } from "react";
import LogoLoop from '../components/LogoLoop/LogoLoop';
import { useTheme } from '../contexts/ThemeContext';


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
  const [logoSpeed, setLogoSpeed] = useState(25);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

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
    alt: `Client ${i + 1}`
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
          {/* Company Name Branding - Top Left (Alignment with Fixed Logo) */}
          <div className="hero-brand-area">
            <div className="hero-logo-text">
              <span className="company-name-sub">Centre for Energy, Environment and Productivity</span>
            </div>
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
            {/* Hero Content */}
            <div className="hero-content">
              <h2 className="hero-slogan">Measure What Matters. Improve What Counts</h2>
              <p className="hero-description">
                Transforming operational performance through data-driven insight, engineering depth, and practical implementation.
              </p>
              <div className="hero-ctas">
                <a href="/services" className="btn btn-primary">Learn more</a>
                <a href="#contact" className="btn btn-ghost">Contact us</a>
              </div>
            </div>
          </div>

          {/* Controls removed — carousel auto-advances only */}
        </div>
      </section>

      {/* WHO WE ARE SECTION */}
      <section className="who-we-are-section" data-scroll-reveal>
        <div className="section-container-full">
          <div className="who-we-are-wrapper">
            <div className="who-we-are-content">
              <h2 className="section-slogan" data-heading-animate>Engineering Sustainability with Industry Precision</h2>
              <p className="section-content-wide" data-heading-animate data-delay="1">
                At the Centre for Energy, Environment and Productivity (CEEP) we collaborate and strive to assist organisations in improved use of resources be it energy, water, human resources, time and anything to do with productivity.
              </p>
              <p className="section-content-wide" data-heading-animate data-delay="2">
                Our consulting and training services leverage our deep industry expertise and use analytical rigor to help organisations unveil improvement opportunities, make informed decisions rapidly and solve their critical business problems.
              </p>
              <div className="section-cta-left" data-heading-animate data-delay="3">
                <a href="/company" className="btn btn-primary">Meet the team</a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WHY IT MATTERS SECTION */}
      <section className="why-matters-section" data-scroll-reveal>
        <div className="section-container">
          <h2 className="section-slogan" data-heading-animate>The Industry is Changing. Are you ready?</h2>
          <p className="section-content-center" data-heading-animate data-delay="1">
            Energy and resource performance now directly influence profitability, compliance, and long-term competitiveness. Organisations must manage cost pressures and sustainability expectations without disrupting operations or compromising user experience.
          </p>

          <div className="key-drivers">
            <h3 className="key-drivers-title" data-heading-animate data-delay="2">Key Drivers:</h3>
            <div className="drivers-grid">
              <div className="driver-item" data-scroll-reveal>
                <div className="driver-number">01</div>
                <h4>Volatile and rising energy costs</h4>
              </div>
              <div className="driver-item" data-scroll-reveal>
                <div className="driver-number">02</div>
                <h4>Carbon reduction and ESG mandates</h4>
              </div>
              <div className="driver-item" data-scroll-reveal>
                <div className="driver-number">03</div>
                <h4>Aging infrastructure and inefficiencies</h4>
              </div>
              <div className="driver-item" data-scroll-reveal>
                <div className="driver-number">04</div>
                <h4>Increasing demand for operational resilience</h4>
              </div>
              <div className="driver-item" data-scroll-reveal>
                <div className="driver-number">05</div>
                <h4>Expectations of uninterrupted comfort and productivity</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="faq-section" data-scroll-reveal>
        <div className="section-container">
          <h2 className="section-title" data-heading-animate>Frequently Asked Questions</h2>
          <div className="faq-list">
            <div className={`faq-item ${openFaqIndex === 0 ? 'active' : ''}`} onClick={() => toggleFaq(0)}>
              <div className="faq-question-wrapper">
                <h4 className="faq-question">What type of organizations do you work with?</h4>
                <span className="faq-toggle">{openFaqIndex === 0 ? '−' : '+'}</span>
              </div>
              <div className="faq-answer-wrapper">
                <p className="faq-answer">We support manufacturing facilities, commercial buildings, institutions, and infrastructure operators seeking structured improvements in operational performance and resource management.</p>
              </div>
            </div>

            <div className={`faq-item ${openFaqIndex === 1 ? 'active' : ''}`} onClick={() => toggleFaq(1)}>
              <div className="faq-question-wrapper">
                <h4 className="faq-question">How do your engagements typically begin?</h4>
                <span className="faq-toggle">{openFaqIndex === 1 ? '−' : '+'}</span>
              </div>
              <div className="faq-answer-wrapper">
                <p className="faq-answer">Engagements usually start with a diagnostic assessment to understand system performance, operational constraints, and financial priorities. From there, we define a structured improvement roadmap.</p>
              </div>
            </div>

            <div className={`faq-item ${openFaqIndex === 2 ? 'active' : ''}`} onClick={() => toggleFaq(2)}>
              <div className="faq-question-wrapper">
                <h4 className="faq-question">Do you focus only on energy reduction?</h4>
                <span className="faq-toggle">{openFaqIndex === 2 ? '−' : '+'}</span>
              </div>
              <div className="faq-answer-wrapper">
                <p className="faq-answer">No. Our work considers financial outcomes, operational reliability, regulatory alignment, and occupant or process requirements. Energy performance is evaluated within the broader business context.</p>
              </div>
            </div>

            <div className={`faq-item ${openFaqIndex === 3 ? 'active' : ''}`} onClick={() => toggleFaq(3)}>
              <div className="faq-question-wrapper">
                <h4 className="faq-question">Will recommended measures disrupt ongoing operations?</h4>
                <span className="faq-toggle">{openFaqIndex === 3 ? '−' : '+'}</span>
              </div>
              <div className="faq-answer-wrapper">
                <p className="faq-answer">Our approach prioritizes practical implementation. Recommendations are phased and aligned with operational continuity to minimize disruption.</p>
              </div>
            </div>

            <div className={`faq-item ${openFaqIndex === 4 ? 'active' : ''}`} onClick={() => toggleFaq(4)}>
              <div className="faq-question-wrapper">
                <h4 className="faq-question">How are results measured?</h4>
                <span className="faq-toggle">{openFaqIndex === 4 ? '−' : '+'}</span>
              </div>
              <div className="faq-answer-wrapper">
                <p className="faq-answer">Outcomes are tracked through defined performance indicators such as consumption patterns, operational metrics, financial impact, and system stability.</p>
              </div>
            </div>

            <div className={`faq-item ${openFaqIndex === 5 ? 'active' : ''}`} onClick={() => toggleFaq(5)}>
              <div className="faq-question-wrapper">
                <h4 className="faq-question">Do you provide implementation support?</h4>
                <span className="faq-toggle">{openFaqIndex === 5 ? '−' : '+'}</span>
              </div>
              <div className="faq-answer-wrapper">
                <p className="faq-answer">Yes. We support both advisory-level guidance and hands-on coordination during execution, depending on client requirements.</p>
              </div>
            </div>

            <div className={`faq-item ${openFaqIndex === 6 ? 'active' : ''}`} onClick={() => toggleFaq(6)}>
              <div className="faq-question-wrapper">
                <h4 className="faq-question">Can you assist with compliance and sustainability reporting?</h4>
                <span className="faq-toggle">{openFaqIndex === 6 ? '−' : '+'}</span>
              </div>
              <div className="faq-answer-wrapper">
                <p className="faq-answer">We help align technical improvements with relevant regulatory and reporting frameworks to support governance and disclosure requirements.</p>
              </div>
            </div>

            <div className={`faq-item ${openFaqIndex === 7 ? 'active' : ''}`} onClick={() => toggleFaq(7)}>
              <div className="faq-question-wrapper">
                <h4 className="faq-question">What is the average period for the Return on Investment?</h4>
                <span className="faq-toggle">{openFaqIndex === 7 ? '−' : '+'}</span>
              </div>
              <div className="faq-answer-wrapper">
                <p className="faq-answer">Most measures have a ROI of 12-14 months. Some measures can be longer but provide huge savings in the long run.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENTS SECTION */}
      <section className="clients-section" data-scroll-reveal>
        <div className="section-container">
          <h2 className="section-slogan" data-heading-animate>Engineered Solutions. Enduring Relationships.</h2>

          <div className="clients-content">
            <div className="client-highlights">
              <div className="highlight-card" data-heading-animate data-delay="1">
                <div className="highlight-header">
                  <span className="highlight-number">20%</span>
                  <span className="highlight-label">Reduction</span>
                </div>
                <p className="highlight-description">
                  CEEP conducted a comprehensive energy audit for <strong>Al Muzn Mall, Muscat</strong>, where practical and innovative measures were implemented, resulting in a 20% reduction in air-conditioning energy consumption.
                </p>
              </div>

              <div className="highlight-card" data-heading-animate data-delay="2">
                <div className="highlight-header">
                  <span className="highlight-number">25%</span>
                  <span className="highlight-label">Efficiency</span>
                </div>
                <p className="highlight-description">
                  At the <strong>DELL R&D Center, Bangalore</strong>, our structured assessment led to a 25% reduction in cooling energy requirements through straightforward, low-investment interventions.
                </p>
              </div>
            </div>

            <p className="clients-paragraph" data-heading-animate data-delay="3">
              CEEP has also served as a professional trainer and consultant to leading corporates including <strong>Gujarat Alkalies and Chemicals Limited, Manali Petrochemicals Limited, JK Tyre, Dalmia Cement, Arvind Mills, Raymonds</strong> and many more, supporting multiple facilities across India in strengthening energy performance.
            </p>

            <div className="sectors-grid" data-heading-animate data-delay="4">
              <h3 className="sectors-title">Our experience spans diverse sectors:</h3>
              <div className="sectors-cards">
                <div className="sector-card">
                  <div className="sector-icon"></div>
                  <h4>Power and Utilities</h4>
                </div>
                <div className="sector-card">
                  <div className="sector-icon"></div>
                  <h4>Civil and Commercial Infrastructures</h4>
                </div>
                <div className="sector-card">
                  <div className="sector-icon"></div>
                  <h4>Manufacturing and Process Industries</h4>
                </div>
                <div className="sector-card">
                  <div className="sector-icon"></div>
                  <h4>Oil, Gas and Energy Sector</h4>
                </div>
              </div>
            </div>

            <p className="clients-paragraph" data-heading-animate data-delay="5">
              We have also conducted energy audits for Government institutions, reinforcing our credibility across both public and private domains.
            </p>
          </div>

          {/* Logo Carousels - Split logos between two ribbons */}
          <div className="logo-carousels" data-heading-animate data-delay="6">
            <div className="logo-carousel-row">
              <LogoLoop
                logos={clientNodes.slice(0, Math.ceil(clientNodes.length / 2))}
                speed={logoSpeed}
                direction="left"
                logoHeight={90}
                gap={50}
                hoverSpeed={0}
                scaleOnHover
                fadeOut
                fadeOutColor="#ffffff"
                ariaLabel="Clients carousel moving left"
              />
            </div>
            <div className="logo-carousel-row">
              <LogoLoop
                logos={clientNodes.slice(Math.ceil(clientNodes.length / 2))}
                speed={logoSpeed}
                direction="right"
                logoHeight={90}
                gap={50}
                hoverSpeed={0}
                scaleOnHover
                fadeOut
                fadeOutColor="#ffffff"
                ariaLabel="Clients carousel moving right"
              />
            </div>
          </div>
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
