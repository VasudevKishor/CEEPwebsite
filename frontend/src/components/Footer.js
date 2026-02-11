import React from 'react';
import { FaLinkedin, FaYoutube, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-section footer-section-left">
                        <h3>Centre for Energy, Environment and Productivity</h3>
                        <p className="footer-quote">
                            "The world has enough for everyone's need, but not enough for everyone's greed."
                        </p>
                        <p className="footer-author">- M.K. Gandhi</p>
                    </div>

                    <div className="footer-section footer-section-right">
                        <h4>Contact Information</h4>
                        <p>1039, 26th St, H Block,</p>
                        <p>Ponni Colony,Anna Nagar , Chennai 600040</p>
                        <p>Mobile: 9444882553, 8668115663</p>
                        <p>Email: <a href="mailto:info@ceepenergy.com" style={{ color: 'inherit', textDecoration: 'underline' }}>info@ceepenergy.com</a></p>
                        <div className="footer-social" aria-label="Social media links">
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
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


