import React, { useState, useEffect, useRef } from 'react';
// Data for services stored in frontend now
import './Services.css';

const Services = () => {
    const [services, setServices] = useState([]);
    const [trainingPrograms, setTrainingPrograms] = useState([]);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const sectionRefs = useRef([]);

    useEffect(() => {
        const localServices = [
            { _id: 's1', title: 'Energy Audit', description: 'Comprehensive energy audits to identify savings opportunities and improve efficiency.', category: 'consulting' },
            { _id: 's2', title: 'Water Audit', description: 'Detailed water usage analysis and conservation strategies.', category: 'consulting' },
            { _id: 's3', title: 'Productivity Consulting', description: 'Motion and time studies, process optimization, and productivity improvement.', category: 'consulting' }
        ];

        const localTraining = [
            { _id: 't1', title: 'Energy Management Training', description: 'Best practices for energy management', pdfLink: '/videos/demo.pdf' },
            { _id: 't2', title: 'Water Conservation Workshop', description: 'Techniques for industrial water conservation', pdfLink: '/videos/demo.pdf' },
            { _id: 't3', title: 'Productivity Improvement Program', description: 'Lean manufacturing and productivity methods', pdfLink: '/videos/demo.pdf' }
        ];

        const localVideos = [
            { _id: 'v1', title: 'Service Video 1', videoUrl: '/videos/video1.mp4' },
            { _id: 'v2', title: 'Service Video 2', videoUrl: '/videos/video2.mp4' },
            { _id: 'v3', title: 'Service Video 3', videoUrl: '/videos/video3.mp4' }
        ];

        setServices(localServices);
        setTrainingPrograms(localTraining);
        setVideos(localVideos);
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
        
        // Separate observer for headings with different threshold
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

        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, [services, trainingPrograms, videos]);

    if (loading) {
        return (
            <div className="services-page section">
                <div className="container">
                    <div className="loading">Loading services...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="services-page section">
            <div className="container">
                <h1 className="section-title" data-heading-animate>Our Services</h1>
                <p className="section-subtitle" data-heading-animate data-delay="1">
                    Comprehensive consulting and training solutions for energy, environment, and productivity
                </p>

                {/* Services List */}
                <section className="services-section" data-scroll-reveal>
                    <h2 className="subsection-title" data-heading-animate>Consulting Services</h2>
                    <div className="services-grid">
                        {services.length > 0 ? (
                            services.map((service, idx) => (
                                <div key={service._id} className="service-card card" data-scroll-reveal style={{ transitionDelay: `${idx * 0.1}s` }}>
                                    {service.image && (
                                        <div className="service-image">
                                            <img src={service.image} alt={service.title} />
                                        </div>
                                    )}
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                </div>
                            ))
                        ) : (
                            <div className="no-data">No services available at the moment.</div>
                        )}
                    </div>
                </section>

                {/* Training Programs */}
                <section className="training-section" data-scroll-reveal>
                    <h2 className="subsection-title" data-heading-animate>In-House Training Programs</h2>
                    <div className="training-grid">
                        {trainingPrograms.length > 0 ? (
                            trainingPrograms.map((program, idx) => (
                                <div key={program._id} className="training-card card" data-scroll-reveal style={{ transitionDelay: `${idx * 0.1}s` }}>
                                    {program.thumbnail && (
                                        <div className="training-thumbnail">
                                            <img src={program.thumbnail} alt={program.title} />
                                        </div>
                                    )}
                                    <h3>{program.title}</h3>
                                    <p>{program.description}</p>
                                    {program.pdfLink && (
                                        <a
                                            href={program.pdfLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-primary"
                                        >
                                            Download PDF
                                        </a>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="no-data">No training programs available at the moment.</div>
                        )}
                    </div>
                </section>

                {/* Service Videos */}
                <section className="videos-section" data-scroll-reveal>
                    <h2 className="subsection-title" data-heading-animate>Service Videos</h2>
                    <div className="videos-grid">
                        {videos.length > 0 ? (
                            videos.map((video, idx) => (
                                <div key={video._id} className="video-card card" data-scroll-reveal style={{ transitionDelay: `${idx * 0.1}s` }}>
                                    <div className="video-container">
                                        <video
                                            className="video-media"
                                            controls
                                            playsInline
                                            src={video.videoUrl}
                                        >
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                    <h3>{video.title}</h3>
                                    {video.description && <p>{video.description}</p>}
                                </div>
                            ))
                        ) : (
                            <div className="no-data">No videos available at the moment.</div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Services;


