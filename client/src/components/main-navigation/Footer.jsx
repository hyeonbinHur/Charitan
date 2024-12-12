// src/components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto text-center">
      {/* Copyright Section */}
      <p>&copy; 2024 Charitan. All rights reserved.</p>
      
      {/* Links Section */}
      <div className="mt-4">
        <a href="/about" className="footer-link hover:text-gray-400 mx-4">About Us</a>
        <a href="/contact" className="footer-link hover:text-gray-400 mx-4">Contact</a>
        <a href="/privacy" className="footer-link hover:text-gray-400 mx-4">Privacy Policy</a>
      </div>

      {/* Social Links Section */}
      <div className="social-links mt-6">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-link facebook-icon mx-4">
          Facebook
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-link twitter-icon mx-4">
          Twitter
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-link instagram-icon mx-4">
          Instagram
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
