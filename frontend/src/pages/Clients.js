import React, { useState, useEffect } from 'react';
// Clients data moved to frontend
import './Clients.css';

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const localClients = [
            { _id: 'c1', name: 'Sample Client 1', description: 'Leading manufacturing company in Chennai', industry: 'Manufacturing', logo: '/images/clients/client1.svg' },
            { _id: 'c2', name: 'Green Industries', description: 'Partner in sustainability projects', industry: 'Environment', logo: '/images/clients/client2.svg' },
            { _id: 'c3', name: 'Metro Water', description: 'Water management and consultancy', industry: 'Utilities', logo: '/images/clients/client3.svg' },
            { _id: 'c4', name: 'SolarTech Pvt Ltd', description: 'Renewable energy solutions provider', industry: 'Energy', logo: '/images/clients/client4.svg' },
            { _id: 'c5', name: 'Precision Manufacturing', description: 'Industrial efficiency projects', industry: 'Manufacturing', logo: '/images/clients/client5.svg' },
            { _id: 'c6', name: 'Urban Planning Co', description: 'Consulting on urban sustainability and energy', industry: 'Consulting', logo: '/images/clients/client6.svg' }
        ];
        setClients(localClients);
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
    }, [clients]);

    if (loading) {
        return (
            <div className="clients-page section">
                <div className="container">
                    <div className="loading">Loading clients...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="clients-page section">
            <div className="container">
                <h1 className="section-title" data-heading-animate>Our Clients</h1>
                <p className="section-subtitle" data-heading-animate data-delay="1">
                    We are proud to work with organizations across various industries
                </p>

                <div className="clients-grid">
                    {clients.length > 0 ? (
                        clients.map((client, idx) => (
                            <div key={client._id} className="client-card card" data-scroll-reveal style={{ transitionDelay: `${idx * 0.08}s` }}>
                                {client.logo && (
                                    <div className="client-logo">
                                        <img src={client.logo} alt={client.name} loading="lazy" />
                                    </div>
                                )}
                                <div className="client-info">
                                    <h3>{client.name}</h3>
                                    {client.industry && (
                                        <p className="client-industry">{client.industry}</p>
                                    )}
                                    <p className="client-description">{client.description}</p>
                                    {client.website && (
                                        <a
                                            href={client.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="client-website"
                                        >
                                            Visit Website →
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-data">
                            <p>No clients listed at the moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Clients;


