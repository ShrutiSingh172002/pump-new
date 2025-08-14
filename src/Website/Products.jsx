import React from "react";
import "./Products.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import {
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaCogs,
  FaIndustry,
  FaTools,
  FaCog,
  FaWater,
} from "react-icons/fa";
import { 
  GiGears, 
  GiMechanicalArm 
} from "react-icons/gi";
import { 
  MdPrecisionManufacturing, 
  MdEngineering, 
  MdBuild 
} from "react-icons/md";

const Products = () => {
  const navigate = useNavigate();

  return (
    <div className="products-container">
      <Navbar />

      {/* Hero Section */}
      <div className="products-hero">
        <div className="products-hero-content">
          <h1>Our Products</h1>
          <p>High-quality engineered components and solutions for industrial pump systems</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="products-main-content">
        <div className="products-grid">
          
          {/* Pump Spares */}
          <div className="product-card">
            <div className="product-icon">
              <GiGears className="icon-svg" />
            </div>
            <h3>Pump Spares</h3>
            <p>Precision-engineered pump spares including impellers, wear rings, shaft sleeves, and casings for various industrial applications.</p>
            <div className="product-features">
              <div className="feature">✓ OEM Standard Quality</div>
              <div className="feature">✓ Custom Specifications</div>
              <div className="feature">✓ Fast Turnaround</div>
            </div>
            <button className="product-btn" onClick={() => navigate("/pump-spares")}>
              Learn More
            </button>
          </div>

          {/* Centrifugal Pumps */}
          <div className="product-card">
            <div className="product-icon">
              <FaWater className="icon-svg" />
            </div>
            <h3>Centrifugal Pumps</h3>
            <p>Specialized components for high-pressure boiler feed pumps, designed for optimal performance and efficiency in power plants.</p>
            <div className="product-features">
              <div className="feature">✓ High-Pressure Rating</div>
              <div className="feature">✓ Energy Efficient</div>
              <div className="feature">✓ Corrosion Resistant</div>
            </div>
            <button className="product-btn" onClick={() => navigate("/contact")}>
              Learn More
            </button>
          </div>

          {/* Allied Products */}
          <div className="product-card">
            <div className="product-icon">
              <MdPrecisionManufacturing className="icon-svg" />
            </div>
            <h3>Allied Products</h3>
            <p>Reliable condensate pump components for steam power systems, ensuring efficient condensate return and system reliability.</p>
            <div className="product-features">
              <div className="feature">✓ Steam Resistant</div>
              <div className="feature">✓ Long Service Life</div>
              <div className="feature">✓ Maintenance Friendly</div>
            </div>
            <button className="product-btn" onClick={() => navigate("/contact")}>
              Learn More
            </button>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="footer-audit-paragraph">
        <div className="footer-content">
          <div className="footer-copyright-left">
            <p className="footer-copyright-text">
              © 2025 Shaft & Seal. All rights reserved.
            </p>
          </div>
          
          <div className="footer-social-section">
            <h3 className="footer-heading">Connect With Us</h3>
            <div className="social-icons">
              <a href="https://youtube.com/@shaftnseal?si=rdVfDZ7qPpfzzHxS" target="_blank" rel="noopener noreferrer" title="YouTube">
                <FaYoutube />
              </a>
              <a href="https://www.youtube.com/@shaftnseal" target="_blank" rel="noopener noreferrer" title="Instagram">
                <FaInstagram />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61578595061965" target="_blank" rel="noopener noreferrer" title="Facebook">
                <FaFacebook />
              </a>
              <a href="https://x.com/ShaftnSeal" target="_blank" rel="noopener noreferrer" title="Twitter" className="x-link-text">
                x
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Products;