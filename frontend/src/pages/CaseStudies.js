import React, { useState, useEffect } from 'react';
import './CaseStudies.css';

const CaseStudies = () => {
    const [caseStudies, setCaseStudies] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const localStudies = [
            {
                _id: 'cs1',
                title: 'Energy Audit at Processing Industry',
                description: 'An in-depth energy audit conducted at a major processing industry to identify energy-saving opportunities.',
                videoUrl: 'https://www.youtube.com/embed/CixGqEiB64c',
                category: 'Energy Audit'
            },
            {
                _id: 'cs2',
                title: 'Water Audit at International Airport',
                description: 'A comprehensive water audit at a busy international airport, leading to significant water conservation measures.',
                videoUrl: 'https://www.youtube.com/embed/69aFw956eKM',
                category: 'Water Audit'
            },
            {
                _id: 'cs3',
                title: 'Energy Audit at Engineering Industry',
                description: 'Identifying and implementing energy efficiency solutions in a large-scale engineering facility.',
                videoUrl: 'https://www.youtube.com/embed/gH9V2rnso3o',
                category: 'Energy Audit'
            },
            {
                _id: 'cs4',
                title: 'Energy Audit at a Textile Industry',
                description: 'A detailed energy audit in the textile sector, focusing on reducing energy consumption in production processes.',
                videoUrl: 'https://www.youtube.com/embed/NfzBn1MrGqw',
                category: 'Energy Audit'
            },
            {
                _id: 'cs5',
                title: 'Energy Audit at IT Building, Bangalore',
                description: 'Improving energy performance and reducing operational costs for a major IT building in Bangalore.',
                videoUrl: 'https://www.youtube.com/embed/SSrRerV7Vj4',
                category: 'Energy Audit'
            },
            {
                _id: 'cs6',
                title: 'Cleaner Production Audit at Printing Unit',
                description: 'A cleaner production audit aimed at minimizing waste and emissions in a printing unit.',
                videoUrl: 'https://www.youtube.com/embed/KU08ir0uaTM',
                category: 'Cleaner Production'
            },
            {
                _id: 'cs7',
                title: 'Successful Case Studies on Energy Conservation',
                description: 'A compilation of successful energy conservation projects across various industries.',
                videoUrl: 'https://www.youtube.com/embed/N_kOQVSFMqk',
                category: 'Energy Conservation'
            },
            {
                _id: 'cs8',
                title: 'Energy Audit at Coach Factory',
                description: 'A comprehensive energy audit at a coach factory, leading to substantial energy savings.',
                videoUrl: 'https://www.youtube.com/embed/y7HxHrLDw_o',
                category: 'Energy Audit'
            },
            {
                _id: 'cs9',
                title: 'Energy Audit at IT Building',
                description: 'Optimizing energy usage and implementing saving measures at a large IT facility.',
                videoUrl: 'https://www.youtube.com/embed/cB5mzi9IDOo',
                category: 'Energy Audit'
            },
            {
                _id: 'cs10',
                title: 'Energy Audit at Common Effluent Treatment Plant',
                description: 'A specialized energy audit for a common effluent treatment plant to enhance energy efficiency.',
                videoUrl: 'https://www.youtube.com/embed/Y-K_TIZVfIk',
                category: 'Energy Audit'
            },
            {
                _id: 'cs11',
                title: 'Energy Audit at Muzn Mall',
                description: 'Improving energy performance and sustainability at Muzn Mall through a detailed energy audit.',
                videoUrl: 'https://www.youtube.com/embed/sVdjkpWeKX8',
                category: 'Energy Audit'
            },
            {
                _id: 'cs12',
                title: 'Energy Audit at Container Terminal',
                description: 'An energy audit focused on reducing energy consumption at a busy container terminal.',
                videoUrl: 'https://www.youtube.com/embed/QfmdfPO6HqI',
                category: 'Energy Audit'
            }
        ];
        setCaseStudies(localStudies);
        setSelectedId(localStudies[0]?._id || null);
        setLoading(false);
    }, []);

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
    }, [caseStudies, selectedId]);

    if (loading) {
        return (
            <div className="case-studies-page section">
                <div className="container">
                    <div className="loading">Loading case studies...</div>
                </div>
            </div>
        );
    }

    const selectedCase = caseStudies.find((study) => study._id === selectedId) || caseStudies[0];

    return (
        <div className="case-studies-page section">
            <div className="container">
                <h1 className="section-title" data-heading-animate>Case Studies</h1>

                <div className="case-studies-layout" data-scroll-reveal>
                    {/* Left sidebar with case study list */}
                    <div className="case-studies-sidebar">
                        {caseStudies.map((study, idx) => (
                            <button
                                key={study._id}
                                className={`sidebar-item ${study._id === selectedId ? 'active' : ''}`}
                                onClick={() => setSelectedId(study._id)}
                                style={{ transitionDelay: `${idx * 0.05}s` }}
                            >
                                <span className="item-category">{study.category}</span>
                                <strong className="item-title">{study.title}</strong>
                                <p className="item-description">{study.description}</p>
                            </button>
                        ))}
                    </div>

                    {/* Right video panel */}
                    <div className="case-video-panel">
                        {selectedCase ? (
                            <>
                                <div className="video-details">
                                    <span className="video-pill">{selectedCase.category}</span>
                                </div>
                                <div className="video-wrapper">
                                    <div className="video-container">
                                        <iframe
                                            key={selectedCase._id}
                                            src={selectedCase.videoUrl}
                                            title={selectedCase.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CaseStudies;


