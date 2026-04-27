import React, { useState, useEffect, useRef, useMemo } from 'react';
import { FiArrowDown, FiArrowRight, FiCheckCircle, FiPlay, FiX, FiLayers } from 'react-icons/fi';
import './CaseStudies.css';

// Animated Counter Component (Preserved)
const Counter = ({ end, duration = 2000, prefix = "", suffix = "" }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const countRef = useRef(null);

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setIsVisible(true);
        }, { threshold: 0.1 });
        if (countRef.current) observer.observe(countRef.current);
        return () => countRef.current && observer.unobserve(countRef.current);
    }, []);

    useEffect(() => {
        if (!isVisible) return;
        let startTime = null;
        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [isVisible, end, duration]);

    return <span ref={countRef}>{prefix}{count}{suffix}</span>;
};

// Video Modal component (Preserved for internal depth if needed, but unused in primary dashboard)
const VideoModal = ({ isOpen, onClose, videoUrl, title }) => {
    if (!isOpen) return null;
    const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
    const isVimeo = videoUrl.includes('vimeo.com');
    let embedSrc = videoUrl;
    if (isYouTube) {
        embedSrc = videoUrl.replace('watch?v=', 'embed/').split('&')[0] + "?autoplay=1";
    } else if (isVimeo) {
        const vimeoId = videoUrl.split('/').pop();
        embedSrc = `https://player.vimeo.com/video/${vimeoId}?autoplay=1`;
    }
    return (
        <div className="video-modal-overlay" onClick={onClose}>
            <div className="video-modal-container" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose} aria-label="Close modal"><FiX /></button>
                <div className="modal-header"><h3>{title}</h3></div>
                <div className="modal-video-wrapper">
                    {isYouTube || isVimeo ? (
                        <iframe src={embedSrc} title={title} frameBorder="0" allowFullScreen></iframe>
                    ) : (
                        <video src={videoUrl} controls autoPlay className="modal-local-video"></video>
                    )}
                </div>
            </div>
        </div>
    );
};

const CaseStudies = () => {
    const cardScrollerRef = useRef(null);

    const allStudies = [
        {
            _id: 'cs13',
            title: 'Energy Audit at Remote Industrial Accommodation Camp',
            description: 'A comprehensive energy audit conducted at a remote industrial accommodation camp to identify energy-saving opportunities.',
            videoUrl: '/videos/caseStudy.mp4',
            category: 'Energy Audit',
            industry: 'Infrastructure'
        },
        {
            _id: 'cs1',
            title: 'Energy Audit at Processing Industry',
            description: 'An in-depth energy audit conducted at a major processing industry to identify energy-saving opportunities.',
            videoUrl: 'https://www.youtube.com/embed/CixGqEiB64c',
            category: 'Energy Audit',
            industry: 'Manufacturing'
        },
        {
            _id: 'cs2',
            title: 'Water Audit at International Airport',
            description: 'A comprehensive water audit at a busy international airport, leading to significant water conservation measures.',
            videoUrl: 'https://www.youtube.com/embed/69aFw956eKM',
            category: 'Water Audit',
            industry: 'Infrastructure'
        },
        {
            _id: 'cs3',
            title: 'Energy Audit at Engineering Industry',
            description: 'Identifying and implementing energy efficiency solutions in a large-scale engineering facility.',
            videoUrl: 'https://www.youtube.com/embed/gH9V2rnso3o',
            category: 'Energy Audit',
            industry: 'Manufacturing'
        },
        {
            _id: 'cs4',
            title: 'Energy Audit at a Textile Industry',
            description: 'A detailed energy audit in the textile sector, focusing on reducing energy consumption in production processes.',
            videoUrl: 'https://www.youtube.com/embed/NfzBn1MrGqw',
            category: 'Energy Audit',
            industry: 'Textile'
        },
        {
            _id: 'cs5',
            title: 'Energy Audit at IT Building, Bangalore',
            description: 'Improving energy performance and reducing operational costs for a major IT building in Bangalore.',
            videoUrl: 'https://www.youtube.com/embed/SSrRerV7Vj4',
            category: 'Energy Audit',
            industry: 'Civil & Commercial'
        },
        {
            _id: 'cs6',
            title: 'Cleaner Production Audit at Printing Unit',
            description: 'A cleaner production audit aimed at minimizing waste and emissions in a printing unit.',
            videoUrl: 'https://www.youtube.com/embed/KU08ir0uaTM',
            category: 'Cleaner Production',
            industry: 'Manufacturing'
        },
        {
            _id: 'cs7',
            title: 'Successful Case Studies on Energy Conservation',
            description: 'A compilation of successful energy conservation projects across various industries.',
            videoUrl: 'https://www.youtube.com/embed/N_kOQVSFMqk',
            category: 'Energy Conservation',
            industry: 'Manufacturing'
        },
        {
            _id: 'cs8',
            title: 'Energy Audit at Coach Factory',
            description: 'A comprehensive energy audit at a coach factory, leading to substantial energy savings.',
            videoUrl: 'https://www.youtube.com/embed/y7HxHrLDw_o',
            category: 'Energy Audit',
            industry: 'Automotive'
        },
        {
            _id: 'cs9',
            title: 'Energy Audit at IT Building',
            description: 'Optimizing energy usage and implementing saving measures at a large IT facility.',
            videoUrl: 'https://www.youtube.com/embed/cB5mzi9IDOo',
            category: 'Energy Audit',
            industry: 'Civil & Commercial'
        },
        {
            _id: 'cs10',
            title: 'Energy Audit at Common Effluent Treatment Plant',
            description: 'A specialized energy audit for a common effluent treatment plant to enhance energy efficiency.',
            videoUrl: 'https://www.youtube.com/embed/Y-K_TIZVfIk',
            category: 'Energy Audit',
            industry: 'Infrastructure'
        },
        {
            _id: 'cs11',
            title: 'Energy Audit at Muzn Mall',
            description: 'Improving energy performance and sustainability at Muzn Mall through a detailed energy audit.',
            videoUrl: 'https://www.youtube.com/embed/sVdjkpWeKX8',
            category: 'Energy Audit',
            industry: 'Civil & Commercial'
        },
        {
            _id: 'cs12',
            title: 'Energy Audit at Container Terminal',
            description: 'An energy audit focused on reducing energy consumption at a busy container terminal.',
            videoUrl: 'https://www.youtube.com/embed/QfmdfPO6HqI',
            category: 'Energy Audit',
            industry: 'Infrastructure'
        }
    ];

    const filterOptions = ['All', 'Manufacturing', 'Textile', 'Automotive', 'Civil & Commercial', 'Infrastructure'];

    const [activeId, setActiveId] = useState('cs1');
    const [viewedId, setViewedId] = useState('cs1');
    const [activeFilter, setActiveFilter] = useState('All');
    const [revealedIds, setRevealedIds] = useState(new Set());

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('data-id');
                    if (id) {
                        setRevealedIds(prev => new Set([...prev, id]));
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('[data-scroll-reveal]').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [activeFilter]);

    const filteredStudies = useMemo(() => (
        activeFilter === 'All'
            ? allStudies
            : allStudies.filter((s) => s.industry === activeFilter)
    ), [activeFilter, allStudies]);
    const activeStudy = allStudies.find(s => s._id === viewedId) || allStudies[0];

    useEffect(() => {
        if (filteredStudies.length === 0) return;

        // Reset to the top of the list and first case only when filter changes.
        const firstCaseId = filteredStudies[0]._id;
        setActiveId(firstCaseId);
        setViewedId(firstCaseId);

        if (cardScrollerRef.current) {
            cardScrollerRef.current.scrollTop = 0;
        }
    }, [activeFilter]);

    const patterns = [
        { id: 'p1', title: "Compressed Air Systems", val: "20-30%", desc: "Energy loss due to leaks and improper operation", img: "/images/pattern_hvac.png" },
        { id: 'p2', title: "HVAC Systems", val: "10-25%", desc: "Optimization potential through better load management", img: "/images/pattern_compressed_air.png" },
        { id: 'p3', title: "Pumps & Motors", val: "8-15%", desc: "Efficiency gains from system tuning and control", img: "/images/pattern_pumps_motors.png" },
        { id: 'p4', title: "Steam Systems", val: "Critical", desc: "Significant losses from insulation gaps and condensate mismanagement", img: "/images/pattern_steam.png" }
    ];


    const getEmbedUrl = (url) => {
        if (!url) return "";
        try {
            let videoId = "";
            if (url.includes("youtube.com/watch")) {
                const searchParams = new URL(url).searchParams;
                videoId = searchParams.get("v");
            } else if (url.includes("youtu.be/")) {
                videoId = url.split("youtu.be/")[1]?.split(/[?#]/)[0];
            } else if (url.includes("youtube.com/embed/")) {
                videoId = url.split("youtube.com/embed/")[1]?.split(/[?#]/)[0];
            } else {
                videoId = url;
            }
            return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0`;
        } catch (e) {
            if (url.includes('vimeo.com')) {
                const id = url.split('/').pop();
                return `https://player.vimeo.com/video/${id}?autoplay=1&muted=1`;
            }
            return url;
        }
    };

    const scrollToContent = () => {
        document.getElementById('find-case-anchor')?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToFooter = (e) => {
        e.preventDefault();
        if (window.lenis) {
            window.lenis.scrollTo('#contact');
        } else {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="case-studies-page">
            <section className="awesome-hero">
                <div className="hero-background-layer">
                    <div className="hero-mask-image"></div>
                    <div className="hero-pattern-dots"></div>
                </div>
                <div className="container">
                    <div className="hero-layout-grid">
                        <div data-scroll-reveal data-id="hero-text" className={`hero-primary-text ${revealedIds.has('hero-text') ? 'revealed' : ''}`}>
                            <span className="hero-small-tag">RESOURCES & IMPACT</span>
                            <h1 className="hero-title-mega">Proven Savings <br /><span>Across Industries.</span></h1>
                            <p className="hero-eyebrow-text">Real-world projects. Measurable results. Practical implementation.</p>
                            <p className="hero-lead-text">From manufacturing plants to commercial facilities, our work consistently delivers cost reduction, efficiency gains, and improved operational performance.</p>
                            <div className="hero-bottom-info">
                                <button className="hero-cta-btn" onClick={scrollToContent}>FIND A CASE <FiArrowDown className="ml-2" /></button>
                                <div className="hero-features">
                                    <div className="h-feature"><FiCheckCircle className="f-icon" /> ROI Focus</div>
                                    <div className="h-feature"><FiCheckCircle className="f-icon" /> Certified Audits</div>
                                </div>
                            </div>
                        </div>
                        <div data-scroll-reveal data-id="hero-card" className={`hero-visual-card ${revealedIds.has('hero-card') ? 'revealed' : ''}`}>
                            <div className="perspective-frame">
                                <img src="/images/work_hero_bg.png" alt="Engineering Excellence" />
                                <div className="card-overlay-mesh"></div>
                            </div>
                            <div className="feature-floating-hud">
                                <div className="hud-metric">
                                    <strong><Counter end={30} prefix="₹" suffix="+ Lakhs" /></strong>
                                    <span>Avg. Savings / Facility</span>
                                </div>
                                <div className="hud-metric secondary">
                                    <strong>&lt; <Counter end={12} suffix=" Months" /></strong>
                                    <span>Typical Payback</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="stats-bar-clean-awesome">
                <div className="container">
                    <div data-scroll-reveal data-id="stats-bar" className={`stats-inner-layout ${revealedIds.has('stats-bar') ? 'revealed' : ''}`}>
                        <div className="stat-card-outline">
                            <span className="sc-val"><Counter end={30} prefix="₹" suffix="+ Lakhs" /></span>
                            <span className="sc-lab">Average savings identified per facility</span>
                        </div>
                        <div className="stat-card-outline">
                            <span className="sc-val">10-<Counter end={30} suffix="%" /></span>
                            <span className="sc-lab">Typical energy reduction potential</span>
                        </div>
                        <div className="stat-card-outline">
                            <span className="sc-val">&lt; <Counter end={12} suffix=" Months" /></span>
                            <span className="sc-lab">Payback period for most measures</span>
                        </div>
                        <div className="stat-card-outline">
                            <span className="sc-val"><Counter end={50} suffix="+ Facilities" /></span>
                            <span className="sc-lab">Across industries and sectors</span>
                        </div>
                    </div>
                </div>
            </section>

            <section id="find-case-anchor" className="case-dashboard-section">
                <div className="container">
                    <div data-scroll-reveal data-id="grid-header" className={`case-grid-header ${revealedIds.has('grid-header') ? 'revealed' : ''}`}>
                        <h2 className="grid-main-title">Case Study Center</h2>
                        <div className="industry-filter-bar">
                            <div className="filter-buttons">
                                {filterOptions.map(opt => (
                                    <button
                                        key={opt}
                                        className={`industry-btn ${activeFilter === opt ? 'active' : ''}`}
                                        onClick={() => setActiveFilter(opt)}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="case-dashboard-layout">
                        <div className="case-list-column">
                            <div className="card-scroller" ref={cardScrollerRef}>
                                {filteredStudies.map((study) => (
                                    <div
                                        key={study._id}
                                        className={`list-card-perspective ${activeId === study._id ? 'active-flipped' : ''}`}
                                        onClick={() => {
                                            setActiveId(activeId === study._id ? null : study._id);
                                            setViewedId(study._id);
                                        }}
                                    >
                                        <div className="list-card-inner">
                                            <div className="list-card-front">
                                                <span className="list-industry-tag">{study.industry}</span>
                                                <h3 className="list-card-title">{study.title}</h3>
                                                <div className="list-card-hint"><FiPlay /> Click to review</div>
                                            </div>
                                            <div className="list-card-back">
                                                <h4>Outcome Overview</h4>
                                                <p>{study.description}</p>
                                                <div className="active-accent-bar"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="case-viewscreen-column">
                            <div className="viewscreen-housing">
                                <div className="video-viewport">
                                    {activeStudy.videoUrl.endsWith('.mp4') || activeStudy.videoUrl.startsWith('/videos/') ? (
                                        <video
                                            key={activeStudy._id}
                                            src={activeStudy.videoUrl}
                                            controls
                                            autoPlay
                                            muted
                                            className="viewport-local-video"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        ></video>
                                    ) : (
                                        <iframe
                                            key={activeStudy._id}
                                            src={getEmbedUrl(activeStudy.videoUrl)}
                                            title={activeStudy.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    )}
                                </div>
                                <div className="viewscreen-bottom-hud">
                                    <div className="hud-study-info">
                                        <h3>{activeStudy.title}</h3>
                                        <p>{activeStudy.category} {"//"} Audited Implementation</p>
                                    </div>
                                    <div className="hud-visualizer"><span></span><span></span><span></span><span></span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pattern-insight-tiles-section">
                <div className="container">
                    <div data-scroll-reveal data-id="pattern-header" className={`pattern-header ${revealedIds.has('pattern-header') ? 'revealed' : ''}`}>
                        <span className="technical-tag">ANALYSIS PATTERNS</span>
                        <h2 className="pattern-grid-title">Technical Focus Areas</h2>
                        <p className="pattern-intro-text">Across facilities, similar inefficiencies repeatedly emerge. Identifying these patterns allows faster implementation of high-impact measures.</p>
                    </div>

                    <div className="pattern-tile-grid">
                        {patterns.map((p) => (
                            <div
                                key={p.id}
                                className={`analysis-tile-new ${revealedIds.has(p.id) ? 'revealed' : ''}`}
                                data-scroll-reveal
                                data-id={p.id}
                            >
                                <div className="tile-media-wrapper">
                                    <img src={p.img} alt={p.title} />
                                    <div className="tile-stat-hud">{p.val}</div>
                                    <div className="tile-gradient-shroud"></div>
                                </div>
                                <div className="tile-info-block">
                                    <h4 className="tile-name">{p.title}</h4>
                                    <p className="tile-summary">{p.desc}</p>
                                    <div className="tile-indicator-bar"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div data-scroll-reveal data-id="pattern-footer" className={`pattern-grid-footer ${revealedIds.has('pattern-footer') ? 'revealed' : ''}`}>
                        <p>These recurring patterns allow faster identification and implementation of high-impact measures.</p>
                    </div>
                </div>
            </section>

            {/* SPLIT LAYOUT CTA */}
            <section className="work-cta-split">
                <div className="container">
                    <div data-scroll-reveal data-id="cta-split" className={`cta-split-wrapper ${revealedIds.has('cta-split') ? 'revealed' : ''}`}>
                        <div className="cta-left-content">
                            <h3>Achieve Similar Results.</h3>
                            <p>Expert audits designed to optimize your industrial operations and maximize ROI.</p>
                        </div>
                        <div className="cta-right-action">
                            <a href="#contact" onClick={scrollToFooter} className="cta-split-btn"><span>Book an Audit</span><FiArrowRight className="btn-icon" /></a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CaseStudies;
