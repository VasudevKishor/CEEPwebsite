import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./HeroScrollSequence.css";

gsap.registerPlugin(ScrollTrigger);

/* ─── Config ─── */
const FRAME_COUNT = 300;
const currentFrame = (index) =>
    `/images/hero/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;

const HeroScrollSequence = () => {
    const sectionRef = useRef(null);
    const canvasRef = useRef(null);
    const overlayRef = useRef(null);

    const heroContentRef = useRef(null);
    const brandRef = useRef(null);
    const aboutRef = useRef(null);
    const imagesRef = useRef([]);
    const frameIndexRef = useRef({ value: 0 });
    const rafIdRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    /* ─── Handle Contact Us button - scroll to footer ─── */
    const handleContactClick = useCallback((e) => {
        e.preventDefault();
        const footer = document.querySelector('.footer');
        if (footer) {
            const footerTop = footer.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: footerTop,
                behavior: 'smooth'
            });
        }
    }, []);

    /* ─── Draw a frame onto the canvas (cover-fit) ─── */
    const renderFrame = useCallback((index) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const img = imagesRef.current[index];
        if (!img || !img.complete || !img.naturalWidth) return;

        const cw = canvas.width;
        const ch = canvas.height;
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;

        const scale = Math.max(cw / iw, ch / ih);
        const sw = iw * scale;
        const sh = ih * scale;
        const sx = (cw - sw) / 2;
        const sy = (ch - sh) / 2;

        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, sx, sy, sw, sh);
    }, []);

    /* ─── Resize canvas to fill viewport ─── */
    const handleResize = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        renderFrame(Math.round(frameIndexRef.current.value));
    }, [renderFrame]);

    /* ─── Preload all images ─── */
    useEffect(() => {
        let loaded = 0;
        const images = [];

        const handleImageEvent = () => {
            loaded++;
            setProgress(Math.round((loaded / FRAME_COUNT) * 100));
            if (loaded === FRAME_COUNT) {
                setLoading(false);
            }
        };

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            img.onload = handleImageEvent;
            img.onerror = handleImageEvent;
            images.push(img);
        }

        imagesRef.current = images;
    }, []);

    /* ─── RAF render loop ─── */
    useEffect(() => {
        if (loading) return;

        let lastRenderedFrame = -1;

        const tick = () => {
            const frameIdx = Math.round(frameIndexRef.current.value);
            if (frameIdx !== lastRenderedFrame) {
                renderFrame(frameIdx);
                lastRenderedFrame = frameIdx;
            }
            rafIdRef.current = requestAnimationFrame(tick);
        };

        rafIdRef.current = requestAnimationFrame(tick);

        return () => {
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        };
    }, [loading, renderFrame]);

    /* ─── GSAP ScrollTrigger + text animations ─── */
    useEffect(() => {
        if (loading) return;

        handleResize();
        window.addEventListener("resize", handleResize);
        renderFrame(0);

        const ctx = gsap.context(() => {
            // Frame scrub animation
            gsap.to(frameIndexRef.current, {
                value: FRAME_COUNT - 1,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.5,
                },
            });

            // Pin the canvas wrapper
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom bottom",
                pin: canvasRef.current?.parentElement,
                pinSpacing: false,
            });

            // Text animation timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.8,
                },
            });

            // Brand text — visible at start, fades out on scroll
            tl.fromTo(
                brandRef.current,
                { opacity: 1, y: 0 },
                { opacity: 0, y: -20, duration: 0.2 },
                0
            );

            // Hero content (slogan, description, CTAs) — visible by default, fades out on scroll
            tl.fromTo(
                heroContentRef.current,
                { opacity: 1, y: 0 },
                { opacity: 0, y: -40, duration: 0.25 },
                0.1
            );

            // About / Who We Are — fades in during second half of scroll
            tl.fromTo(
                aboutRef.current,
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 0.25 },
                0.45
            )
                .to(aboutRef.current, { opacity: 1, duration: 0.25 }, 0.7)
                .to(aboutRef.current, { opacity: 0, y: -30, duration: 0.15 }, 0.88);

            // Overlay gradient — darken for about section readability
            tl.fromTo(
                overlayRef.current,
                { opacity: 0.7 },
                { opacity: 0.1, duration: 0.3 },
                0.1
            ).to(overlayRef.current, { opacity: 0.65, duration: 0.25 }, 0.4);
        }, sectionRef);

        return () => {
            window.removeEventListener("resize", handleResize);
            ctx.revert();
        };
    }, [loading, handleResize, renderFrame]);

    return (
        <section className="hero-scroll-section" ref={sectionRef}>
            {/* Loading screen */}
            {loading && (
                <div className="hero-scroll-loader">
                    <div className="hero-scroll-loader-inner">
                        <div className="hero-scroll-loader-bar">
                            <div
                                className="hero-scroll-loader-fill"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <span className="hero-scroll-loader-text">
                            Loading experience... {progress}%
                        </span>
                    </div>
                </div>
            )}

            {/* Sticky canvas wrapper */}
            <div className="hero-scroll-sticky">
                <canvas ref={canvasRef} className="hero-scroll-canvas" />

                {/* Dark gradient overlay */}
                <div className="hero-scroll-overlay" ref={overlayRef} />

                {/* Company branding — top left */}
                <div className="hero-scroll-brand" ref={brandRef}>
                    <span className="hero-scroll-brand-name">
                        Centre for Energy, Environment and Productivity
                    </span>
                </div>



                {/* Hero content — slogan, description, CTAs */}
                <div className="hero-scroll-content" ref={heroContentRef}>
                    <h2 className="hero-scroll-slogan">
                        Measure What Matters. Improve What Counts
                    </h2>
                    <p className="hero-scroll-description">
                        Transforming operational performance through data-driven insight,
                        engineering depth, and practical implementation.
                    </p>
                    <div className="hero-scroll-ctas">
                        <Link to="/services" className="btn btn-primary">Learn more</Link>
                        <button onClick={handleContactClick} className="btn btn-ghost">Contact us</button>
                    </div>
                </div>

                {/* About / Who We Are — fades in during second half */}
                <div className="hero-scroll-about" ref={aboutRef}>
                    <h2 className="hero-scroll-about-title">
                        Engineering Sustainability with Industry Precision
                    </h2>
                    <p className="hero-scroll-about-text">
                        At the Centre for Energy, Environment and Productivity (CEEP) we collaborate and strive to assist organisations in improved use of resources be it energy, water, human resources, time and anything to do with productivity.
                    </p>
                    <p className="hero-scroll-about-text">
                        Our consulting and training services leverage our deep industry expertise and use analytical rigor to help organisations unveil improvement opportunities, make informed decisions rapidly and solve their critical business problems.
                    </p>
                    <div className="hero-scroll-about-cta">
                        <a href="/company" className="btn btn-primary">Meet the team</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroScrollSequence;
