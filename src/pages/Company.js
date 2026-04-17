import React, { useState, useEffect } from 'react';
import { FaLinkedin } from 'react-icons/fa';
// Team data is stored in the frontend now
import './Company.css';

const Company = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Add two team members directly in the frontend
    useEffect(() => {
        const members = [
            {
                _id: 'team-1',
                name: 'Dr. Nagesh Kumar',
                position: 'Founder & Director',
                bio: 'Expert in energy management, environmental consulting, and productivity improvement with decades of industry experience.',
                image: '/images/team/nagesh.jpg',
                email: 'nageshkumar@ceepenergy.in',
                linkedin: '#'
            },
            {
                _id: 'team-2',
                name: 'Mr. Sakthi Aadharsh Azhagar',
                position: 'Senior Energy Analyst',
                bio: 'Specialized in resource optimization, process improvement, and organizational efficiency with extensive experience in industrial consulting.',
                image: '/images/team/sakthi.jpeg',
                email: 'sakthiaadharshazhagar@ceepenergy.in',
                linkedin: '#'
            }
        ];
        setTeamMembers(members);
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
    }, [teamMembers]);

    if (loading) {
        return (
            <div className="company-page section">
                <div className="container">
                    <div className="loading">Loading company information...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="company-page section">
            <div className="container">
                <section className="philosophy-minimal" data-scroll-reveal>
                    <div className="philosophy-split">
                        <div className="philosophy-portrait">
                            <div className="artistic-portrait-frame">
                                <img src="/images/gandhi.png" alt="M.K. Gandhi" />
                                <div className="portrait-overlay-accent"></div>
                            </div>
                        </div>
                        <div className="philosophy-text">
                            <span className="philosophy-tag">Our Philosophy</span>
                            <blockquote className="philosophy-quote-raw">
                                "The world has enough for everyone's need, but not enough for everyone's greed."
                            </blockquote>
                            <cite className="philosophy-author-raw">- M.K. Gandhi</cite>
                        </div>
                    </div>
                </section>

                <h1 className="section-title" data-heading-animate>Our Team</h1>
                <p className="section-subtitle" data-heading-animate data-delay="1">
                    Meet the experts who drive our mission to improve energy, environment, and productivity
                </p>

                <div className="team-grid">
                    {teamMembers.length > 0 ? (
                        teamMembers.slice(0, 2).map((member, index) => (
                            <div key={member._id} className="team-card" data-scroll-reveal style={{ transitionDelay: `${index * 0.2}s` }}>
                                <div className="team-card-inner">
                                    <div
                                        className="team-image"
                                        style={{
                                            backgroundImage: member.image ? `url(${member.image})` : 'none',
                                            backgroundSize: '100% 100%',
                                            backgroundPosition: 'center'
                                        }}
                                    >
                                        {member.image ? (
                                            <img src={member.image} alt={member.name} loading="lazy" />
                                        ) : (
                                            <div className="team-placeholder">
                                                <span>{member.name.charAt(0)}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="team-info">
                                        <h3 className="team-name">{member.name}</h3>
                                        <p className="team-position">{member.position}</p>
                                        <div className="team-expanded-content">
                                            {member.bio && (
                                                <p className="team-bio">{member.bio}</p>
                                            )}
                                            <div className="team-contact-row">
                                                {member.email && (
                                                    <a href={`mailto:${member.email}`} className="team-email">
                                                        {member.email}
                                                    </a>
                                                )}
                                                {member.linkedin && (
                                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="team-linkedin-stylized" aria-label={`${member.name} LinkedIn`}>
                                                        <FaLinkedin />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-data">
                            <p>No team members found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Company;
