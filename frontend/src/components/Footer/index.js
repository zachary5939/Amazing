import React from "react";
import logo from "../../img/amazinglogo.png";  // Assuming the logo is the same as the one used in the navbar
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "./footer.css";
library.add(faGithub, faLinkedin);

function Footer() {
  return (
    <footer className="footer-bar">
      <ul className="footer-list">
        <li>
          <a href="https://github.com/zachary5939" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={["fa-brands", "fa-github"]} className="footer-icon" />
          </a>
        </li>
        <li>
          <img src={logo} alt="Amazing Logo" className="footer-logo-image" />
          <p className="footer-disclaimer">This project uses likeness and images from Amazon. No copyright intended.</p>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/zachary-stallings-11434b266/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={["fa-brands", "fa-linkedin"]} className="footer-icon" style={{ color: "#ffffff" }} />
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
