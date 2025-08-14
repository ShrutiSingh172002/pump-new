import React from "react";
import "./SalesContainer.css";
import machineImage from "./machineImage.png";
import wrenchIcon from "./icons/wrench.png";
import boxIcon from "./icons/box.png";
import boltIcon from "./icons/bolt.png";
import gearIcon from "./icons/gear.png";
import pumpIcon from "./icons/pump.png";
import auditIcon from "./icons/audit.png";
import logoImage from "./logo.jpg";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import {
  FaYoutube,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";

const SalesContainer = () => {
  const navigate = useNavigate();
  return (
    <div className="sales-container">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <div className="sales-header-section">
        <div className="sales-text-block">
          <h1>
            Engineering Reliability.
            <br />
            Minimizing Inventory.
            <br />
            Maximizing Efficiency.
          </h1>
          <p>
            Shaft & Seal helps industries unlock energy savings
            <br></br>
            Restore pump performance, and eliminate downtime.
          </p>
        </div>
        <div className="sales-image-block">
          <img src={machineImage} alt="Pump Machine" />
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="sales-why-choose">
        <h2>Why Choose Shaft & Seal?</h2>
        <div className="sales-features">
          <div
            className="sales-feature"
            onClick={() => navigate("/reliable-rebuilds")}
          >
            <img src={wrenchIcon} alt="Wrench Icon" className="icon" />
            <button className="sales-feature-btn">Reliable Rebuilds</button>
            <p>
              Reverse engineered to OEM Standards or better - ensuring long-term
              performance.
            </p>
          </div>
          <div
            className="sales-feature"
            onClick={() => navigate("/inventory-minimization")}
          >
            <img src={boxIcon} alt="Box Icon" className="icon" />
            <button className="sales-feature-btn">
              Inventory Minimization
            </button>
            <p>
              We help reduce spare parts holding by custom engineering
              interchangeable components.
            </p>
          </div>
          <div
            className="sales-feature"
            onClick={() => navigate("/energy-saving-expertise")}
          >
            <img src={boltIcon} alt="Energy Icon" className="icon" />
            <button className="sales-feature-btn">
              Energy-Saving Expertise
            </button>
            <p>
              Optimized hydraulics for reduced power bids – especially on boiler
              food-systems.
            </p>
          </div>
        </div>
      </div>

      

      {/* Strategy Section */}
      <div className="sales-strategy-section">
        <div className="sales-strategy-left">
          <h2>From Downtime to Uptime: Our Reliability Strategy</h2>
        </div>
        <div className="sales-strategy-container-three-columns">
          {/* Left: Heading */}

          {/* Middle: Points + Button */}

          {/* Right: Triangle */}
          <div className="sales-strategy-right">
            <svg viewBox="0 0 200 200" className="sales-triangle-svg">
              <polygon
                points="100,0 0,180 200,180"
                className="triangle-outline"
              />
              <line x1="60" y1="70" x2="140" y2="70" className="divider" />
              <line x1="25" y1="125" x2="175" y2="125" className="divider" />
              <text x="100" y="55" className="triangle-label">
                Re-build
              </text>
              <text x="100" y="105" className="triangle-label">
                Redesign
              </text>
              <text x="100" y="160" className="triangle-label">
                Root Cause Analysis
              </text>
            </svg>
          </div>
          <div className="sales-strategy-middle">
            <ul className="sales-strategy-points">
              <li>MTBF (Incremental TM)</li>
              <li>Interchangeable spares to cover multiple pump types</li>
              <li>Modular design for on-demand manufacturing</li>
            </ul>
            <button className="sales-case-studies-btn">See Case Studies</button>
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

export default SalesContainer;
