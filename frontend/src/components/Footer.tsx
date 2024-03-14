import { Link } from "react-router-dom";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = (): JSX.Element => {
  return (
    <footer className="footer container">
      <div className="footer__container">
        <span>&copy; Copyright 2024 DodaDesign</span>
        <nav className="footer__nav">
          <ul className="footer__nav-socials">
            <li className="footer__nav-item">
              <Link to="https://twitter.com/" target="_blank" rel="noreferrer">
                <FaTwitter size={28} color="#525151" />
              </Link>
            </li>
            <li className="footer__nav-item">
              <Link
                to="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram size={28} color="#525151" />
              </Link>
            </li>
            <li className="footer__nav-item">
              <Link
                to="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebook size={28} color="#525151" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
