import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>🍽️ Savory Bites</h3>
            <p>Bringing you the finest dining experience with fresh ingredients, expert chefs, and exceptional service. Your satisfaction is our recipe for success.</p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="YouTube">📺</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/menu">Food Menu</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/services">Services</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/reservation">Reservations</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Info</h4>
            <div className="footer-contact-item">📍 123 Gourmet Street, Food City, FC 12345</div>
            <div className="footer-contact-item">📞 +234 8104-9430-92</div>
            <div className="footer-contact-item">✉️ sodeeqrhamadan@gmail.com</div>
            <div className="footer-contact-item">🕐 Mon-Sat: 10:00 AM - 11:00 PM</div>
            <div className="footer-contact-item">🕐 Sun: 11:00 AM - 09:00 PM</div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 Savory Bites Restaurant. All rights reserved. | Designed for Final Year Project</p>
        </div>
      </div>
    </footer>
  );
}
