import React, { useState } from 'react';
import { FaLinkedin, FaYoutube, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: ''
    });
    const [status, setStatus] = useState(''); // 'sending', 'success', 'error'

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Helper to encode form data for Netlify
    const encode = (data) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');

        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "contact", ...formData })
        })
            .then(() => {
                setStatus('success');
                setFormData({ name: '', mobile: '', email: '' });
                setTimeout(() => setStatus(''), 6000);
            })
            .catch((error) => {
                console.error('Netlify Error:', error);
                setStatus('error');
            });
    };

    return (
        <footer id="contact" className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-section footer-section-left">
                        <h3>Quick Inquiry</h3>
                        <form
                            className="footer-form-minimal"
                            name="contact"
                            method="POST"
                            data-netlify="true"
                            onSubmit={handleSubmit}
                        >
                            {/* Hidden field required for Netlify + React */}
                            <input type="hidden" name="form-name" value="contact" />

                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="tel"
                                name="mobile"
                                placeholder="Mobile Number"
                                value={formData.mobile}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            <button
                                type="submit"
                                className="footer-form-submit-minimal"
                                disabled={status === 'sending'}
                            >
                                {status === 'sending' ? 'Sending...' : 'Send Request'}
                            </button>
                            {status === 'success' && <p className="form-status success">Sent successfully! We will contact you soon.</p>}
                            {status === 'error' && <p className="form-status error">Something went wrong. Please try again.</p>}
                        </form>
                    </div>

                    <div className="footer-section footer-section-right">
                        <h4>Contact Information</h4>
                        <p>1039, 26th St, H Block,</p>
                        <p>Ponni Colony,Anna Nagar , Chennai 600040</p>
                        <p>Mobile: 9444882553, 8668115663</p>
                        <p>Email: <a href="mailto:admin@ceepenergy.in" className="footer-email-link">admin@ceepenergy.in</a></p>
                        <div className="footer-social" aria-label="Social media links">
                            <a href="https://www.linkedin.com/company/ceep-audit/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <FaLinkedin />
                            </a>
                            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                <FaYoutube />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <FaInstagram />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <FaTwitter />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} by CEEP Creative team. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;