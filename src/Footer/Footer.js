import "./Footer.css"; // Make sure to create and import the CSS file
import instagramLogo from "../assets/instagram.png"; // Adjust the path as needed
import facebookLogo from "../assets/facebook.png"; // Adjust the path as needed

import youtubeLogo from "../assets/youtube.png"; // Adjust the path as needed

const Footer = () => {
  return (
    <div id="footer" className="footer">
      <footer className="main-footer">
        <div className="container">
          <div className="social-media">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={instagramLogo}
                alt="Instagram"
                className="social-logo"
              />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebookLogo} alt="Facebook" className="social-logo" />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={youtubeLogo} alt="YouTube" className="social-logo" />
            </a>
          </div>
          <div className="contact-info">
            <p>Contact us: support@splitup.com</p>
            <p>Phone: +1 234 567 890</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

Footer.displayName = "Footer";

export default Footer;
