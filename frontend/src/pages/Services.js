import React, { useState, useEffect } from 'react';
// Data for services stored in frontend now
import './Services.css';

const Services = () => {
    const [services, setServices] = useState([]);
    const [trainingPrograms, setTrainingPrograms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const localServices = [
            { _id: 's1', title: 'Energy Audit', description: 'Comprehensive energy audits to identify savings opportunities and improve efficiency.', category: 'consulting' },
            { _id: 's2', title: 'Water Audit', description: 'Detailed water usage analysis and conservation strategies.', category: 'consulting' },
            { _id: 's3', title: 'Productivity Consulting', description: 'Motion and time studies, process optimization, and productivity improvement.', category: 'consulting' }
        ];

        const localTraining = [
            { _id: 't1', title: 'Energy management and audit', description: 'In-depth training on energy management principles and auditing techniques.', pdfLink: '/pdfs/EnergyManagementAudit.pdf' },
            { _id: 't2', title: 'Boilers and efficient use of steam', description: 'A course on boiler operations and maximizing steam efficiency.', pdfLink: '/pdfs/Boilers.pdf' },
            { _id: 't3', title: 'Furnaces and heat recovery', description: 'Learn about furnace efficiency and waste heat recovery methods.', pdfLink: '/pdfs/Furnace.pdf' },
            { _id: 't4', title: 'Steam distribution and utilization', description: 'Best practices for efficient steam distribution and utilization in industrial plants.', pdfLink: '/pdfs/steam.pdf' },
            { _id: 't5', title: 'Energy conservation in electrical systems', description: 'Strategies for reducing energy consumption in electrical systems.', pdfLink: '/pdfs/EnergyConservation.pdf' },
            { _id: 't6', title: 'Energy efficiency in compressed air systems', description: 'A program on optimizing compressed air systems for energy savings.', pdfLink: '/pdfs/CompressedAirSystems.pdf' },
            { _id: 't7', title: 'Energy efficiency in pumps and pumping systems', description: 'Learn to improve the energy efficiency of pumps and pumping systems.', pdfLink: '/pdfs/PumpingSystem.pdf' },
            { _id: 't8', title: 'Energy conservation in fans and blowers', description: 'Techniques for energy conservation in fans and blower systems.', pdfLink: '/pdfs/FansBlowers.pdf' },
            { _id: 't9', title: 'Energy conservation in refrigeration and air conditioning systems', description: 'A course on improving the energy efficiency of refrigeration and AC systems.', pdfLink: '/pdfs/ACFridge.pdf' },
            { _id: 't10', title: 'Energy efficiency practices for buildings', description: 'Best practices for designing and maintaining energy-efficient buildings.', pdfLink: '/pdfs/EnergyEfficiencyPractices.pdf' },
            { _id: 't11', title: 'ISO 50001: Energy Management Systems', description: 'A comprehensive guide to implementing ISO 50001 Energy Management Systems.', pdfLink: '/pdfs/ISO50001.pdf' }
        ];

        setServices(localServices);
        setTrainingPrograms(localTraining);
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
    }, [services, trainingPrograms]);

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
            </div>
        </div>
    );
};

export default Services;


