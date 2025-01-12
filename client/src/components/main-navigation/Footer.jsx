// src/components/Footer.js
import "./Footer.css";

const Footer = () => (
  <footer className="bg-gray-800 text-white py-3 bottom-0 w-full ">
    <div className="container mx-auto text-center">
      {/* Copyright Section */}
      <p>&copy; 2024 Charitan. All rights reserved.</p>

      {/* Links Section */}
      <div className="mt-4">
        <a href="/about" className="footer-link hover:text-gray-400 mx-4">
          About Us
        </a>
        <a href="/contact" className="footer-link hover:text-gray-400 mx-4">
          Contact
        </a>
        <a href="/privacy" className="footer-link hover:text-gray-400 mx-4">
          Privacy Policy
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
