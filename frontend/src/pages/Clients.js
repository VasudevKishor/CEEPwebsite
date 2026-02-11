import React, { useState, useEffect } from 'react';
// Clients data moved to frontend
import './Clients.css';

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const localClients = [
            { _id: 'bharat', name: 'Bharat Petroleum', description: 'Energy and petroleum company', industry: 'Energy', logo: '/images/clients/BharatPetroleum.png' },
            { _id: 'concorde', name: 'Concorde Textiles', description: 'Textile manufacturing and exports', industry: 'Textiles', logo: '/images/clients/Concorde Textiles.jpg' },
            { _id: 'godrej', name: 'Godrej Consumer Products', description: 'Consumer goods and household products', industry: 'Consumer Goods', logo: '/images/clients/Godrejconsumerproducts.jpg' },
            { _id: 'icf', name: 'ICF', description: 'Rail coach manufacturing', industry: 'Manufacturing', logo: '/images/clients/ICF.jpg' },
            { _id: 'ifc', name: 'IFC', description: 'International finance corporation', industry: 'Finance', logo: '/images/clients/IFC.png' },
            { _id: 'kg', name: 'KG Fabrics', description: 'Textile and fabric solutions', industry: 'Textiles', logo: '/images/clients/KG fabrics.jpg' },
            { _id: 'nlc', name: 'NLC', description: 'Energy and mining company', industry: 'Energy', logo: '/images/clients/NLC.jpg' },
            { _id: 'raymond', name: 'Raymond', description: 'Textiles and apparel', industry: 'Textiles', logo: '/images/clients/Raymond.png' },
            { _id: 'reliance', name: 'Reliance Power', description: 'Power generation and infrastructure', industry: 'Energy', logo: '/images/clients/ReliancePower.jpg' },
            { _id: 'unido', name: 'UNIDO', description: 'United Nations Industrial Development Organization', industry: 'NGO', logo: '/images/clients/UNIDO.png' },
            { _id: 'varroc', name: 'Varroc Polymers', description: 'Polymer and materials supplier', industry: 'Manufacturing', logo: '/images/clients/Varroc polymers.jpg' },
            { _id: 'arvind', name: 'Arvind Mills', description: 'Large textile manufacturer', industry: 'Textiles', logo: '/images/clients/arvindmills.png' }
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
                        clients.map((client, idx) => {
                            const resolvedLogo = client.logo
                                ? (client.logo.startsWith('/') ? `${process.env.PUBLIC_URL}${client.logo}` : client.logo)
                                : null;
                            const safeLogo = resolvedLogo ? encodeURI(resolvedLogo) : null;

                            return (
                                <div key={client._id} className="client-card card" data-scroll-reveal style={{ transitionDelay: `${idx * 0.08}s` }}>
                                    {safeLogo && (
                                        <div className="client-logo">
                                            <img
                                                src={safeLogo}
                                                alt={client.name}
                                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                            />
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
                            );
                        })
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


