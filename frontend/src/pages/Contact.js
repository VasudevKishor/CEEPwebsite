import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import GoogleMap from '../components/GoogleMap/GoogleMap';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [submitting, setSubmitting] = useState(false);

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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await axios.post('https://ceepweb-backend.vercel.app/api/contact', formData);
            setStatus({
                type: 'success',
                message: response.data.message || 'Thank you for contacting us! We will get back to you soon.'
            });
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            setStatus({
                type: 'error',
                message: error.response?.data?.error || 'Something went wrong. Please try again later.'
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="contact-page section">
            <div className="container">
                <h1 className="section-title" data-heading-animate>Contact Us</h1>
                <p className="section-subtitle" data-heading-animate data-delay="1">
                    Get in touch with us. We'd love to hear from you and help with your energy, environment, and productivity needs.
                </p>
            </div>

            {/* Map Image Section */}
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <a
                    href="https://www.google.com/maps/search/?api=1&query=1039+26th+St+H+Block+Ponni+Colony+Anna+Nagar+Chennai+600040"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-link-wrapper"
                    aria-label="Open location in Google Maps"
                >
                    <div className="map-background-section" data-scroll-reveal>
                        <GoogleMap />
                        <div className="map-content-overlay">
                            <div className="map-address-card" data-scroll-reveal>
                                <div className="address-icon">
                                    <FaMapMarkerAlt />
                                </div>
                                <div className="address-content">
                                    <h3 data-heading-animate>Our Location</h3>
                                    <div className="address-details">
                                        <p>1039, 26th St</p>
                                        <p>H Block, Ponni Colony</p>
                                        <p>Anna Nagar, Chennai 600040</p>
                                        <p>INDIA</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="contact-content">
                    <div className="contact-info-wrapper">
                        <div className="contact-info-card" data-scroll-reveal>
                            <div className="info-card-header">
                                <h2 data-heading-animate>Contact Information</h2>
                                <p data-heading-animate data-delay="1">Reach out to us through any of these channels</p>
                            </div>

                            <div className="contact-methods">
                                <div className="contact-method">
                                    <div className="method-icon">
                                        <FaPhone />
                                    </div>
                                    <div className="method-content">
                                        <h3>Phone</h3>
                                        <a href="tel:+919444882553">+91 94448 82553</a>
                                        <a href="tel:+918668115663">+91 86681 15663</a>
                                    </div>
                                </div>

                                <div className="contact-method">
                                    <div className="method-icon">
                                        <FaEnvelope />
                                    </div>
                                    <div className="method-content">
                                        <h3>Email</h3>
                                        <a href="mailto:tallkumar@gmail.com">tallkumar@gmail.com</a>
                                    </div>
                                </div>

                                <div className="contact-method">
                                    <div className="method-icon">
                                        <FaClock />
                                    </div>
                                    <div className="method-content">
                                        <h3>Business Hours</h3>
                                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                                        <p>Saturday: 10:00 AM - 4:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-wrapper" data-scroll-reveal>
                        <div className="contact-form-container">
                            <div className="form-header">
                                <h2 data-heading-animate>Send us a Message</h2>
                                <p data-heading-animate data-delay="1">Fill out the form below and we'll get back to you</p>
                            </div>
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Message *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                {status.message && (
                                    <div className={`status-message ${status.type}`}>
                                        {status.message}
                                    </div>
                                )}

                                <button type="submit" className="btn btn-primary" disabled={submitting}>
                                    {submitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;