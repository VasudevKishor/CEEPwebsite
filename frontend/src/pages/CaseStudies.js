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
                title: 'Energy Project 1',
                description: 'Improving energy efficiency in a plant',
                videoUrl: '/videos/video1.mp4',
                client: 'Sample Client A',
                category: 'Energy'
            },
            {
                _id: 'cs2',
                title: 'Water Conservation Case',
                description: 'Water-saving initiatives in a large facility',
                videoUrl: '/videos/video2.mp4',
                client: 'Sample Client B',
                category: 'Water'
            },
            {
                _id: 'cs3',
                title: 'Productivity Improvement',
                description: 'Lean transformation and productivity uplift',
                videoUrl: '/videos/video3.mp4',
                client: 'Sample Client C',
                category: 'Productivity'
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
                <p className="section-subtitle" data-heading-animate data-delay="1">
                    Explore our successful projects and the impact we've made for our clients
                </p>

                {selectedCase ? (
                    <div className="case-spotlight" data-scroll-reveal>
                        <div className="spotlight-video">
                            <video key={selectedCase._id} controls src={selectedCase.videoUrl}>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div className="spotlight-details">
                            <span className="spotlight-pill">{selectedCase.category}</span>
                            <h2 data-heading-animate>{selectedCase.title}</h2>
                            <p className="spotlight-client">Client: {selectedCase.client}</p>
                            <p>{selectedCase.description}</p>
                        </div>
                    </div>
                ) : null}

                <div className="case-deck">
                    {caseStudies.map((study, idx) => (
                        <button
                            key={study._id}
                            className={`deck-card ${study._id === selectedId ? 'active' : ''}`}
                            onClick={() => setSelectedId(study._id)}
                            data-scroll-reveal
                            style={{ transitionDelay: `${idx * 0.1}s` }}
                        >
                            <div>
                                <span>{study.category}</span>
                                <strong>{study.title}</strong>
                                <p>{study.description}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CaseStudies;


