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

    const engagementPhases = [
        {
            num: '01',
            title: 'On-Site Immersion',
            image: '/images/manufacturing.jpg',
            alt: 'On-site immersion walkthrough',
            summary: 'We start with a structured walkthrough to understand your systems, utilities, and operational constraints.',
            points: ['Identification of high-impact areas', 'Interaction with plant teams and operators', 'Mapping of real-time inefficiencies'],
        },
        {
            num: '02',
            title: 'Guided Learning',
            image: '/images/service3.jpg',
            alt: 'Guided learning session',
            summary: 'Core concepts are delivered in a focused format directly linked to your plant operations.',
            points: ['Energy systems (Steam, Air, Electrical, HVAC)', 'Process efficiency and loss identification', 'Practical frameworks for audits and analysis'],
        },
        {
            num: '03',
            title: 'Field Application',
            image: '/images/work_hero_bg.png',
            alt: 'Field application and analysis',
            summary: 'This stage turns observation into measurable work with live measurement and system-level analysis.',
            points: ['Measurement and data collection', 'System-level analysis', 'Identification of actionable opportunities'],
        },
        {
            num: '04',
            title: 'Problem Solving & Opportunity Development',
            image: '/images/power.jpg',
            alt: 'Implementation roadmap planning',
            summary: 'Teams convert observations into practical projects with clear priorities and value signals.',
            points: ['Quantification of energy and resource savings', 'Root cause analysis', 'Prioritization based on feasibility and ROI'],
        },
        {
            num: '05',
            title: 'Implementation Roadmap',
            image: '/images/service2.jpg',
            alt: 'Implementation roadmap execution',
            summary: 'We close the loop by translating ideas into an execution-ready roadmap with ownership and timing.',
            points: ['Defined action plans', 'Responsibility mapping', 'Implementation methodology'],
        },
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
                    <h3>Registration Page - Register to Download</h3>
                    <p>
                        To access any program PDF, please register first. This helps us share relevant content and stay in touch.
                    </p>
                    <div className="services-download-list">
                        {trainingPrograms.map((prog, idx) => (
                            <Link
                                key={prog.file}
                                to={`/register?file=${encodeURIComponent(prog.file)}&name=${encodeURIComponent(prog.name)}`}
                                className="services-download-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span>{idx + 1}. {prog.name}</span>
                                <span>Register to Download</span>
                            </Link>
                        ))}
                    </div>
                </div>

                <section className="services-engagement-section" data-heading-animate data-delay="6">
                    <div className="engagement-overview" data-scroll-reveal>
                        <div>
                            <p className="engagement-overview-kicker">Delivery model</p>
                            <h3>What a Typical Engagement Looks Like</h3>
                            <p className="engagement-overview-copy">
                                A five-phase process that moves from immersion to execution with a clear focus on measurement,
                                alignment, and practical results.
                            </p>
                        </div>
                        <div className="engagement-overview-meta">
                            <span>5 phases</span>
                            <span>Clear ownership</span>
                            <span>Execution-ready output</span>
                        </div>
                    </div>

                    <div className="engagement-rows">
                        {engagementPhases.map((phase, index) => (
                            <article
                                key={phase.num}
                                className={`engagement-card ${index === 0 ? 'engagement-card-featured' : ''}`}
                                data-scroll-reveal
                            >
                                <div className="engagement-row-image">
                                    <img src={phase.image} alt={phase.alt} loading="lazy" />
                                </div>
                                <div className="engagement-card-body">
                                    <span className="engagement-card-step">{phase.num}</span>
                                    <h4>{phase.title}</h4>
                                    <p>{phase.summary}</p>
                                    <ul>
                                        {phase.points.map((point) => (
                                            <li key={point}>{point}</li>
                                        ))}
                                    </ul>
                                </div>
                            </article>
                        ))}
                    </div>

                    <article className="engagement-outcomes-card engagement-outcomes-standalone" data-scroll-reveal>
                        <h4>What Your Team Walks Away With</h4>
                        <p>A dedicated outcomes module to convert learning into sustained execution.</p>
                        <ul>
                            <li>The ability to independently identify inefficiencies</li>
                            <li>Practical tools for measurement and analysis</li>
                            <li>A pipeline of implementable projects</li>
                            <li>Improved ownership of energy and resource performance</li>
                        </ul>
                    </article>
                </section>
            </div>
        </div>
    );
};

export default Services;
