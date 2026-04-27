import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
        { name: 'Energy management and audit', file: 'EnergyManagementAudit.pdf' },
        { name: 'Boilers and efficient use of steam', file: 'Boilers.pdf' },
        { name: 'Furnaces and heat recovery', file: 'Furnace.pdf' },
        { name: 'Steam distribution and utilization', file: 'steam.pdf' },
        { name: 'Energy conservation in electrical systems', file: 'EnergyConservation.pdf' },
        { name: 'Energy efficiency in compressed air systems', file: 'CompressedAirSystems.pdf' },
        { name: 'Energy efficiency in pumps and pumping systems', file: 'PumpingSystem.pdf' },
        { name: 'Energy conservation in fans and blowers', file: 'FansBlowers.pdf' },
        { name: 'Energy conservation in refrigeration and air conditioning systems', file: 'ACFridge.pdf' },
        { name: 'Energy efficiency practices for buildings', file: 'EnergyEfficiencyPractices.pdf' },
        { name: 'ISO 50001: Energy Management Systems', file: 'ISO50001.pdf' }
    ];

    return (
        <div
            className="services-page"
            data-scroll-reveal
            style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/service2.jpg)` }}
        >
            {/* Dark overlay with blur effect */}
            <div className="services-overlay" />

            <div className="container svc-main-container">
                <div className="svc-header-section services-hero-block">
                    <h1 className="section-title svc-page-title" data-heading-animate>Our Services</h1>
                    <p className="section-subtitle svc-page-subtitle" data-heading-animate data-delay="1">
                        Precision in Energy. Excellence in Productivity.
                    </p>
                    <p className="services-hero-support" data-heading-animate data-delay="2">
                        Engineering-led consultancy for industrial efficiency and regulatory mastery.
                    </p>
                </div>

                <div className="services-pillars-grid">
                    <article className="service-pillar-card" data-heading-animate data-delay="2">
                        <div className="pillar-icon">EA</div>
                        <h2>Energy Auditing &amp; Diagnostics</h2>
                        <p>
                            Comprehensive thermal and electrical utility mapping. We identify invisible inefficiencies
                            across boiler systems, HVAC, and process equipment.
                        </p>
                    </article>

                    <article className="service-pillar-card" data-heading-animate data-delay="3">
                        <div className="pillar-icon">TI</div>
                        <h2>Training &amp; Institutional Excellence</h2>
                        <p>
                            Specialized capacity-building programs for Energy Managers and Auditors. Bridging the gap
                            between theory and industrial application.
                        </p>
                    </article>

                    <article className="service-pillar-card" data-heading-animate data-delay="4">
                        <div className="pillar-icon">SC</div>
                        <h2>Strategic Compliance &amp; Advisory</h2>
                        <p>
                            Navigating PAT (Perform, Achieve, Trade) frameworks, ISO 50001 implementation, and
                            national BEE certification standards.
                        </p>
                    </article>
                </div>

                <div className="services-download-gate" data-heading-animate data-delay="5">
                    <h3>Download Training Modules</h3>
                    <p>
                        To access any program PDF, please register first. This helps us share relevant content and stay in touch.
                    </p>
                    <div className="services-download-list">
                        {trainingPrograms.map((prog, idx) => (
                            <Link
                                key={prog.file}
                                to={`/register?file=${encodeURIComponent(prog.file)}&name=${encodeURIComponent(prog.name)}`}
                                className="services-download-link"
                            >
                                <span>{idx + 1}. {prog.name}</span>
                                <span>Register to Download</span>
                            </Link>
                        ))}
                    </div>
                </div>

                <section className="services-engagement-section" data-heading-animate data-delay="6">
                    <h3>What a Typical Engagement Looks Like</h3>

                    <div className="engagement-rows">
                        <div className="engagement-row" data-scroll-reveal>
                            <div className="engagement-row-image">
                                <img src="/images/manufacturing.jpg" alt="On-site immersion walkthrough" loading="lazy" />
                            </div>
                            <article className="engagement-phase-card engagement-row-content">
                                <h4>Phase 01 - On-Site Immersion</h4>
                                <p>We begin with a structured walkthrough of your plant to understand systems, utilities, and operational challenges.</p>
                                <ul>
                                    <li>Identification of high-impact areas</li>
                                    <li>Interaction with plant teams and operators</li>
                                    <li>Mapping of real-time inefficiencies</li>
                                </ul>
                            </article>
                        </div>

                        <div className="engagement-row reverse" data-scroll-reveal>
                            <div className="engagement-row-image">
                                <img src="/images/service3.jpg" alt="Guided learning session" loading="lazy" />
                            </div>
                            <article className="engagement-phase-card engagement-row-content">
                                <h4>Phase 02 - Guided Learning</h4>
                                <p>Core concepts are delivered in a focused format directly linked to your plant operations.</p>
                                <ul>
                                    <li>Energy systems (Steam, Air, Electrical, HVAC)</li>
                                    <li>Process efficiency and loss identification</li>
                                    <li>Practical frameworks for audits and analysis</li>
                                </ul>
                            </article>
                        </div>

                        <div className="engagement-row" data-scroll-reveal>
                            <div className="engagement-row-image">
                                <img src="/images/work_hero_bg.png" alt="Field application and analysis" loading="lazy" />
                            </div>
                            <article className="engagement-phase-card engagement-row-content">
                                <h4>Phase 03 - Field Application</h4>
                                <p>This is where most programs fail and where we focus the most.</p>
                                <ul>
                                    <li>Measurement and data collection</li>
                                    <li>System-level analysis</li>
                                    <li>Identification of actionable opportunities</li>
                                </ul>
                            </article>
                        </div>

                        <div className="engagement-row reverse" data-scroll-reveal>
                            <div className="engagement-row-image">
                                <img src="/images/power.jpg" alt="Implementation roadmap planning" loading="lazy" />
                            </div>
                            <article className="engagement-phase-card engagement-row-content">
                                <h4>Phase 04 - Problem Solving &amp; Opportunity Development</h4>
                                <p>Your team works in groups to convert observations into real projects.</p>
                                <ul>
                                    <li>Quantification of energy and resource savings</li>
                                    <li>Root cause analysis</li>
                                    <li>Prioritization based on feasibility and ROI</li>
                                </ul>
                            </article>
                        </div>

                        <div className="engagement-row" data-scroll-reveal>
                            <div className="engagement-row-image">
                                <img src="/images/service2.jpg" alt="Implementation roadmap execution" loading="lazy" />
                            </div>
                            <article className="engagement-phase-card engagement-row-content">
                                <h4>Phase 05 - Implementation Roadmap</h4>
                                <p>We close the loop by translating ideas into execution-ready plans.</p>
                                <ul>
                                    <li>Defined action plans</li>
                                    <li>Responsibility mapping</li>
                                    <li>Implementation methodology</li>
                                </ul>
                            </article>
                        </div>

                        <div className="engagement-row reverse" data-scroll-reveal>
                            <div className="engagement-row-image">
                                <img src="/images/sector_civil.png" alt="Team outcomes and capability building" loading="lazy" />
                            </div>
                            <article className="engagement-outcomes-card engagement-row-content">
                                <h4>What Your Team Walks Away With</h4>
                                <ul>
                                    <li>The ability to independently identify inefficiencies</li>
                                    <li>Practical tools for measurement and analysis</li>
                                    <li>A pipeline of implementable projects</li>
                                    <li>Improved ownership of energy and resource performance</li>
                                </ul>
                            </article>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Services;
