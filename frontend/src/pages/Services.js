import React, { useEffect } from 'react';
import './Services.css';

const Services = () => {
    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        // Unified observer for all revealed elements
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const target = entry.target;

                        // Handle standard scroll reveal
                        if (target.hasAttribute('data-scroll-reveal')) {
                            target.classList.add('revealed');
                        }

                        // Handle heading/title animations with delay
                        if (target.hasAttribute('data-heading-animate')) {
                            const delay = target.getAttribute('data-delay') || '0';
                            const delayMs = parseFloat(delay) * 100;
                            setTimeout(() => {
                                target.classList.add('heading-animated');
                            }, delayMs);
                        }

                        observer.unobserve(target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
        );

        // Batch observe all elements
        const elements = document.querySelectorAll('[data-scroll-reveal], [data-heading-animate]');
        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    const trainingPrograms = [
        { name: "Energy management and audit", file: "EnergyManagementAudit.pdf" },
        { name: "Boilers and efficient use of steam", file: "Boilers.pdf" },
        { name: "Furnaces and heat recovery", file: "Furnace.pdf" },
        { name: "Steam distribution and utilization", file: "steam.pdf" },
        { name: "Energy conservation in electrical systems", file: "EnergyConservation.pdf" },
        { name: "Energy efficiency in compressed air systems", file: "CompressedAirSystems.pdf" },
        { name: "Energy efficiency in pumps and pumping systems", file: "PumpingSystem.pdf" },
        { name: "Energy conservation in fans and blowers", file: "FansBlowers.pdf" },
        { name: "Energy conservation in refrigeration and air conditioning systems", file: "ACFridge.pdf" },
        { name: "Energy efficiency practices for buildings", file: "EnergyEfficiencyPractices.pdf" },
        { name: "ISO 50001: Energy Management Systems", file: "ISO50001.pdf" }
    ];

    const curriculum = [
        { day: "DAY 1", task: "Walk through of the plant by CEEP experts" },
        { day: "DAY 2", task: "Conduct of training program" },
        { day: "DAY 3", task: "Conduct of training program" },
        { day: "DAY 4", task: "Discussions, brain storming and site visit to identify energy saving measures" },
        { day: "DAY 5", task: "Finalizing methodology and approach to implementation" }
    ];

    return (
        <div
            className="services-page"
            data-scroll-reveal
            style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/services-hero-bg.png)` }}
        >
            {/* Dark overlay */}
            <div className="services-overlay" />

            <div className="container svc-main-container">
                <div className="svc-header-section">
                    <h1 className="section-title svc-page-title" data-heading-animate>Services</h1>
                    <p className="section-subtitle svc-page-subtitle" data-heading-animate data-delay="1">
                        Comprehensive solutions for optimizing Energy, Environment, and Productivity across industrial sectors.
                    </p>
                </div>

                <div className="svc-cards-wrapper">
                    {/* Consulting Card — Responsive 3-Column Grid */}
                    <div className="svc-card-side svc-card-left" data-heading-animate data-delay="2">
                        <div className="svc-card-header-main">
                            <span className="svc-card-label-main">Consulting</span>
                        </div>

                        <div className="svc-card-expanded-content">
                            <div className="svc-content-stack consulting-grid">
                                <div className="svc-item-row no-icon">
                                    <div className="svc-item-text">
                                        <h4 className="svc-item-title">Energy Audit</h4>
                                        <p className="svc-item-desc">
                                            Comprehensive energy audits to identify savings opportunities and improve efficiency.
                                        </p>
                                    </div>
                                </div>

                                <div className="svc-item-row no-icon">
                                    <div className="svc-item-text">
                                        <h4 className="svc-item-title">Water Audit</h4>
                                        <p className="svc-item-desc">
                                            Detailed water usage analysis and conservation strategies.
                                        </p>
                                    </div>
                                </div>

                                <div className="svc-item-row no-icon">
                                    <div className="svc-item-text">
                                        <h4 className="svc-item-title">Productivity Consulting</h4>
                                        <p className="svc-item-desc">
                                            Motion and time studies, process optimization, and productivity improvement.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Training Card — Side-by-Side In-house (Links) vs Five Day */}
                    <div className="svc-card-side svc-card-right" data-heading-animate data-delay="3">
                        <div className="svc-card-header-main">
                            <span className="svc-card-label-main">Training</span>
                        </div>

                        <div className="svc-card-expanded-content">
                            <div className="svc-training-grid">
                                {/* Two Day Programs List */}
                                <div className="svc-training-col left">
                                    <h3 className="svc-training-subtitle">In-house Training Programs Offered</h3>
                                    <div className="svc-program-list">
                                        {trainingPrograms.map((prog, idx) => (
                                            <div key={idx} className="svc-program-item">
                                                <span className="svc-program-num">{idx + 1}.</span>
                                                <a
                                                    href={`${process.env.PUBLIC_URL}/pdfs/${prog.file}`}
                                                    className="svc-program-link"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {prog.name}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="svc-training-note">All programs are of <strong>TWO DAY</strong> duration</p>
                                </div>

                                {/* Five Day Curriculum */}
                                <div className="svc-training-col right">
                                    <h3 className="svc-training-subtitle">Five Day Course Curriculum</h3>
                                    <p className="svc-training-desc">
                                        CEEP also offers custom based <strong>FIVE DAY</strong> course focusing on not only absorption of knowledge but also identification of implementable energy saving measures by participants through team work.
                                    </p>
                                    <div className="svc-curriculum-list">
                                        {curriculum.map((item, idx) => (
                                            <div key={idx} className="svc-curriculum-item">
                                                <span className="svc-day-label">{item.day}:</span>
                                                <span className="svc-day-task">{item.task}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
