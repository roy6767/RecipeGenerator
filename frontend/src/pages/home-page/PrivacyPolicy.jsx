import React from 'react';
import { ArrowLeft, ChefHat, Shield, Cookie, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './style/HomePage.css';
import './style/PrivacyPolicy.css';

const PrivacyPolicy = () => {
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

            {/* Main Content - Privacy Policy */}
            <main className="main-content">
                <div className="content-container">
                    <h1 className="main-title">Privacy Policy</h1>
                    
                    <div className="privacy-content">
                        <div className="privacy-section">
                            <h2>1. Information We Collect</h2>
                            <p>We collect information that you provide directly to us, including:</p>
                            <ul>
                                <li>Account information (username, email address)</li>
                                <li>Recipe preferences and saved recipes</li>
                                <li>Cookies and usage data</li>
                                <li>Device and log information</li>
                            </ul>
                        </div>

                        <div className="privacy-section">
                            <h2>2. How We Use Your Information</h2>
                            <p>We use the information we collect to:</p>
                            <ul>
                                <li>Provide, maintain, and improve our services</li>
                                <li>Personalize your experience</li>
                                <li>Communicate with you about products, services, and offers</li>
                                <li>Monitor and analyze trends, usage, and activities</li>
                            </ul>
                        </div>

                        <div className="privacy-section">
                            <h2>3. Information Sharing</h2>
                            <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:</p>
                            <ul>
                                <li>With service providers who assist in our operations</li>
                                <li>To comply with legal obligations</li>
                                <li>To protect our rights and safety</li>
                                <li>In connection with a business transfer</li>
                            </ul>
                        </div>

                        <div className="privacy-section">
                            <h2>4. Data Security</h2>
                            <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>
                        </div>

                        <div className="privacy-section">
                            <h2>5. Your Rights</h2>
                            <p>You have the right to:</p>
                            <ul>
                                <li>Access and receive a copy of your personal data</li>
                                <li>Rectify inaccurate personal data</li>
                                <li>Request deletion of your personal data</li>
                                <li>Restrict or object to processing of your data</li>
                                <li>Data portability</li>
                            </ul>
                        </div>

                        <div className="privacy-section">
                            <h2>6. Cookies</h2>
                            <p>We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
                        </div>

                        <div className="privacy-section">
                            <h2>7. Changes to This Policy</h2>
                            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "effective date" at the top.</p>
                        </div>

                        <div className="privacy-section">
                            <h2>8. Contact Us</h2>
                            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                            <p>Email: info@jensen.utbildning.com<br />
                             Address: Medborgarplatsen 25, 118 26, Stockholm</p>
                        </div>

                        <div className="privacy-footer">
                            <p><strong>Effective Date:</strong> January 1, 2024</p>
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
                                <button className="footer-link active">
                                    <Shield size={16} />
                                    <span>Privacy Policy</span>
                                </button>
                                <a href="#" className="footer-link">
                                    <Cookie size={16} />
                                    <span>Cookies</span>
                                </a>
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

export default PrivacyPolicy;