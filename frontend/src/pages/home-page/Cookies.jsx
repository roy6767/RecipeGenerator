import React from 'react';
import { ArrowLeft, ChefHat, Shield, Cookie, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './style/HomePage.css';
import './style/Cookies.css';

const Cookies = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className="app-container">
            {/* Navigation Bar */}
            <nav className="nav-bar sticky-nav">
                <div className="nav-container">
                    <button 
                        className="primary-btn blue-btn"
                        onClick={handleBackToHome}
                    >
                        <ArrowLeft size={20} />
                        <span className="hidden sm-inline">Back to Home</span>
                    </button>
                </div>
            </nav>

            {/* Main Content - Cookies */}
            <main className="main-content">
                <div className="content-container">
                    <h1 className="main-title">Cookie Policy</h1>
                    
                    <div className="cookies-content">
                        <div className="cookies-section">
                            <h2>1. What Are Cookies</h2>
                            <p>Cookies are small text files that are placed on your computer or mobile device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.</p>
                        </div>

                        <div className="cookies-section">
                            <h2>2. How We Use Cookies</h2>
                            <p>We use cookies for the following purposes:</p>
                            <ul>
                                <li><strong>Essential Cookies:</strong> Required for the basic functionality of our website</li>
                                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
                            </ul>
                        </div>

                        <div className="cookies-section">
                            <h2>3. Types of Cookies We Use</h2>
                            <div className="cookies-table">
                                <div className="cookie-row header">
                                    <div className="cookie-type">Cookie Type</div>
                                    <div className="cookie-purpose">Purpose</div>
                                    <div className="cookie-duration">Duration</div>
                                </div>
                                <div className="cookie-row">
                                    <div className="cookie-type">Session Cookies</div>
                                    <div className="cookie-purpose">Maintain your login session</div>
                                    <div className="cookie-duration">Until browser closes</div>
                                </div>
                                <div className="cookie-row">
                                    <div className="cookie-type">Preference Cookies</div>
                                    <div className="cookie-purpose">Remember your recipe preferences</div>
                                    <div className="cookie-duration">30 days</div>
                                </div>
                                <div className="cookie-row">
                                    <div className="cookie-type">Analytics Cookies</div>
                                    <div className="cookie-purpose">Understand website usage</div>
                                    <div className="cookie-duration">2 years</div>
                                </div>
                            </div>
                        </div>

                        <div className="cookies-section">
                            <h2>4. Third-Party Cookies</h2>
                            <p>We may also use cookies from trusted third parties for the following services:</p>
                            <ul>
                                <li>Google Analytics for website traffic analysis</li>
                                <li>Social media platforms for sharing functionality</li>
                                <li>Payment processors for secure transactions</li>
                            </ul>
                        </div>

                        <div className="cookies-section">
                            <h2>5. Managing Your Cookies</h2>
                            <p>You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.</p>
                            <div className="browser-instructions">
                                <h3>Browser Settings:</h3>
                                <ul>
                                    <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                                    <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                                    <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                                    <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                                </ul>
                            </div>
                        </div>

                        <div className="cookies-section">
                            <h2>6. What Happens If You Disable Cookies</h2>
                            <p>If you disable cookies, some features of our website may not function properly:</p>
                            <ul>
                                <li>You may need to re-enter your preferences each time you visit</li>
                                <li>Some personalized features may not work</li>
                                <li>You may not be able to stay logged in</li>
                                <li>Certain content may not display correctly</li>
                            </ul>
                        </div>

                        <div className="cookies-section">
                            <h2>7. Updates to This Policy</h2>
                            <p>We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our services. We encourage you to check this page periodically for the latest information.</p>
                        </div>

                        <div className="cookies-section">
                            <h2>8. Contact Us</h2>
                            <p>If you have any questions about our use of cookies, please contact us at:</p>
                            <p>Email: info@jensen.utbildning.com<br />
                            Address: Medborgarplatsen 25, 118 26, Stockholm</p>
                        </div>

                        <div className="cookies-footer">
                            <p><strong>Last Updated:</strong> January 1, 2024</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="nav-bar footer-nav">
                <div className="nav-container">
                    <div id="footer-elements" className="footer-content">
                        <button className="primary-btn green-btn">
                            <ChefHat size={20} />
                            <span className="hidden sm-inline">Generate Recipe</span>
                        </button>
                        
                        <div className="footer-center">
                            <div className="footer-links">
                                <a href="/privacy-policy" className="footer-link">
                                    <Shield size={16} />
                                    <span>Privacy Policy</span>
                                </a>
                                <button className="footer-link active">
                                    <Cookie size={16} />
                                    <span>Cookies</span>
                                </button>
                            </div>
                            <p className="footer-text">
                                © All rights reserved by Jensen YH-AWS24
                            </p>
                        </div>
                        
                        <button className="primary-btn blue-btn">
                            <User size={20} />
                            <span className="hidden sm-inline">Profile</span>
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Cookies;