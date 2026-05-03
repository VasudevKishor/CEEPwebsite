import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoLoop from '../components/LogoLoop/LogoLoop';
import { useTheme } from '../contexts/ThemeContext';
import HeroScene from '../components/HeroScene/HeroScene';
import FAQ from '../components/FAQ/FAQ';
import "./Home.css";

const Home = () => {
  useTheme();
  const [logoSpeed, setLogoSpeed] = useState(25);
  const keyDrivers = [
    {
      id: "01",
      heading: "Cost is No Longer Predictable",
      image: "/images/pattern_compressed_air.png",
      detail:
        "Energy and resource costs are increasingly volatile, directly impacting operating margins. Organizations must actively manage consumption to maintain financial stability and competitiveness.",
    },
    {
      id: "02",
      heading: "Hidden Inefficiencies Limit Performance",
      image: "/images/pattern_hvac.png",
      detail:
        "Most facilities operate with unnoticed losses across systems-whether in utilities, processes, or workflows. Identifying and addressing these inefficiencies unlocks significant improvement potential.",
    },
    {
      id: "03",
      heading: "Reliability is Business-Critical",
      image: "/images/pattern_pumps_motors.png",
      detail:
        "Operations today cannot afford disruptions. Systems must deliver consistent performance while meeting productivity demands and operational continuity requirements.",
    },
    {
      id: "04",
      heading: "Sustainability is Now a Requirement",
      image: "/images/pattern_steam.png",
      detail:
        "Carbon reduction targets, ESG expectations, and regulatory frameworks are becoming central to business strategy. Organizations must align operational performance with measurable sustainability outcomes.",
    },
  ];


  // small hack: add `app-loaded` class to trigger gallery stagger after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      document.documentElement.classList.add("app-loaded");
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Keep logo speed constant regardless of scroll velocity
  useEffect(() => {
    setLogoSpeed(25);
  }, []);

  // Scroll reveal animations for sections
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
  }, []);

  const clientLogoSrcs = [
    '/images/clients/Godrejconsumerproducts.jpg',
    '/images/clients/BharatPetroleum.png',
    '/images/clients/dalmia.jpg',
    '/images/clients/jktyre.jpg',
    '/images/clients/arvindmills.png',
    '/images/clients/Raymond.png',
    '/images/clients/ReliancePower.jpg',
    '/images/clients/mahindra.png',
    '/images/clients/volvo.png',
    '/images/clients/NLC.jpg',
    '/images/clients/ICF.jpg',
    '/images/clients/IFC.png',
    '/images/clients/UNIDO.png',
    '/images/clients/giz.png',
    '/images/clients/Concorde Textiles.jpg',
    '/images/clients/KG fabrics.jpg',
    '/images/clients/Varroc polymers.jpg',
  ];

  const clientNodes = clientLogoSrcs.map((src, i) => ({
    src,
    alt: `Client ${i + 1}`
  }));

  return (
    <div className="home-page">
      {/* CINEMATIC VIDEO HERO */}
      <HeroScene />

      {/* ABOUT CEEP SECTION */}
      <section className="home-about-section" data-scroll-reveal>
        <div className="section-container">
          <div className="home-about-content">
            <h2 className="section-slogan text-center" data-heading-animate>
              Engineering Sustainability with Industry Precision
            </h2>
            <div className="about-description-wrapper">
              <p className="section-content-center" data-heading-animate data-delay="1">
                At the Centre for Energy, Environment and Productivity (CEEP) we collaborate and strive to assist organisations in improved use of resources be it energy, water, human resources, time and anything to do with productivity.
              </p>
              <p className="section-content-center" data-heading-animate data-delay="2">
                Our consulting and training services leverage our deep industry expertise and use analytical rigor to help organisations unveil improvement opportunities, make informed decisions rapidly and solve their critical business problems.
              </p>
            </div>
            <div className="section-cta-center" data-heading-animate data-delay="3">
              <Link to="/company" className="btn btn-primary">Meet the team</Link>
            </div>
          </div>
        </div>
      </section>




      {/* WHY IT MATTERS SECTION */}
      <section className="why-matters-section" data-scroll-reveal>
        <div className="section-container">
          <h2 className="section-slogan" data-heading-animate>Why it Matters</h2>
          <p className="section-content-center" data-heading-animate data-delay="1">
            Energy and resource performance now directly influence profitability, compliance, and long-term competitiveness. Organisations must manage cost pressures and sustainability expectations without disrupting operations or compromising user experience.
          </p>

          <div className="key-drivers">
            <h3 className="key-drivers-title" data-heading-animate data-delay="2">Key Drivers</h3>
            <div className="drivers-simple-grid" data-scroll-reveal>
              {keyDrivers.map((driver) => (
                <article key={driver.id} className="driver-simple-card">
                  <span className="driver-simple-id">{driver.id}</span>
                  <h4>{driver.heading}</h4>
                  <p>{driver.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CLIENTS SECTION */}
      <section className="clients-section" data-scroll-reveal>
        <div className="section-container">
          <h2 className="section-slogan" data-heading-animate>Engineered Solutions. Enduring Relationships.</h2>

          <div className="clients-content">
            <div className="client-highlights">
              <div
                className="highlight-card highlight-card-muzn"
                data-heading-animate
                data-delay="1"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.7)), url(${process.env.PUBLIC_URL}/images/muzn.jpg)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="highlight-header">
                  <span className="highlight-number">20%</span>
                  <span className="highlight-label">Reduction</span>
                </div>
                <p className="highlight-description">
                  CEEP conducted a comprehensive energy audit for <strong>Al Muzn Mall, Muscat</strong>, where practical and innovative measures were implemented, resulting in a 20% reduction in air-conditioning energy consumption.
                </p>
              </div>

              <div
                className="highlight-card highlight-card-dell"
                data-heading-animate
                data-delay="2"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.7)), url(${process.env.PUBLIC_URL}/images/dell.jpg)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="highlight-header">
                  <span className="highlight-number">25%</span>
                  <span className="highlight-label">Efficiency</span>
                </div>
                <p className="highlight-description">
                  At the <strong>DELL R&D Center, Bangalore</strong>, our structured assessment led to a 25% reduction in cooling energy requirements through straightforward, low-investment interventions.
                </p>
              </div>
            </div>

            <p className="clients-paragraph" data-heading-animate data-delay="3">
              CEEP has also served as a professional trainer and consultant to leading corporates including <strong>Gujarat Alkalies and Chemicals Limited, Manali Petrochemicals Limited, JK Tyre, Dalmia Cement, Arvind Mills, Raymonds</strong> and many more, supporting multiple facilities across India in strengthening energy performance.
            </p>

            <div className="sectors-grid" data-heading-animate data-delay="4">
              <h3 className="sectors-title">Our experience spans diverse sectors:</h3>
              <div className="sectors-cards">
                <div
                  className="sector-card sector-card-bg"
                  style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.75)), url(${process.env.PUBLIC_URL}/images/power.jpg)` }}
                >
                  <h4>Power and Utilities</h4>
                </div>
                <div
                  className="sector-card sector-card-bg"
                  style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.75)), url(${process.env.PUBLIC_URL}/images/sector_civil.png)` }}
                >
                  <h4>Civil and Commercial Infrastructures</h4>
                </div>
                <div
                  className="sector-card sector-card-bg"
                  style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.75)), url(${process.env.PUBLIC_URL}/images/manufacturing.jpg)` }}
                >
                  <h4>Manufacturing and Process Industries</h4>
                </div>
                <div
                  className="sector-card sector-card-bg"
                  style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.75)), url(${process.env.PUBLIC_URL}/images/sector_oil_gas.png)` }}
                >
                  <h4>Oil, Gas and Energy Sector</h4>
                </div>
              </div>
            </div>

            <p className="clients-paragraph" data-heading-animate data-delay="5">
              We have also conducted energy audits for Government institutions, reinforcing our credibility across both public and private domains.
            </p>
          </div>

          {/* Logo Carousels - Split logos between two ribbons */}
          <div className="logo-carousels" data-heading-animate data-delay="6">
            <div className="logo-carousel-row">
              <LogoLoop
                logos={clientNodes.slice(0, Math.ceil(clientNodes.length / 2))}
                speed={logoSpeed}
                direction="left"
                logoHeight={80}
                gap={60}
                hoverSpeed={0}
                scaleOnHover
                ariaLabel="Clients carousel moving left"
              />
            </div>
            <div className="logo-carousel-row">
              <LogoLoop
                logos={clientNodes.slice(Math.ceil(clientNodes.length / 2))}
                speed={logoSpeed}
                direction="right"
                logoHeight={80}
                gap={60}
                hoverSpeed={0}
                scaleOnHover
                ariaLabel="Clients carousel moving right"
              />
            </div>
          </div>
        </div>
      </section>

      <FAQ />

      {/* lightbox removed; clients carousel is used instead */}
    </div>
  );
};

export default Home;
