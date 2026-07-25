import { useState } from 'react';
import PageHero from '../components/PageHero';
import { useToast } from '../context/ToastContext';

export default function Contact() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Your message has been sent! We will get back to you soon.', 'success');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <PageHero title="Contact Us" subtitle="We'd love to hear from you" breadcrumb="Contact" />

      <section className="section-padding" style={{ background: 'var(--section-contact)' }}>
        <div className="container">
          <div className="grid-2">
            {/* Contact Form */}
            <div className="card" style={{ padding: '32px' }}>
              <h3 style={{ marginBottom: '20px' }}>Send a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="john@email.com" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input type="text" name="subject" value={form.subject} onChange={handleChange} required placeholder="How can we help?" />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows="5" placeholder="Your message..." />
                </div>
                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>Send Message</button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <div className="card" style={{ padding: '32px', marginBottom: '20px' }}>
                <h3 style={{ marginBottom: '20px' }}>Get in Touch</h3>
                <div className="contact-info-item">
                  <div className="icon">📍</div>
                  <div>
                    <h4>Address</h4>
                    <p>123 Gourmet Street, Food City, FC 12345</p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="icon">📞</div>
                  <div>
                    <h4>Phone</h4>
                    <p>+1 (555) 123-4567<br />+1 (555) 987-6543</p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="icon">✉️</div>
                  <div>
                    <h4>Email</h4>
                    <p>info@savorybites.com<br />support@savorybites.com</p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="icon">🕐</div>
                  <div>
                    <h4>Business Hours</h4>
                    <p>Mon-Thu: 11:00 AM - 10:00 PM<br />Fri-Sun: 10:00 AM - 11:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="card" style={{ padding: '32px' }}>
                <h4 style={{ marginBottom: '16px' }}>Follow Us</h4>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <a href="#" className="nav-icon-btn" style={{ width: '44px', height: '44px' }}>📘</a>
                  <a href="#" className="nav-icon-btn" style={{ width: '44px', height: '44px' }}>🐦</a>
                  <a href="#" className="nav-icon-btn" style={{ width: '44px', height: '44px' }}>📷</a>
                  <a href="#" className="nav-icon-btn" style={{ width: '44px', height: '44px' }}>📺</a>
                </div>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="card" style={{ marginTop: '32px', overflow: 'hidden' }}>
            <div style={{
              height: '300px', background: 'var(--gray-100)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', color: 'var(--text-muted)',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🗺️</div>
              <p>Google Maps Integration Placeholder</p>
              <p style={{ fontSize: '0.85rem' }}>123 Gourmet Street, Food City</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
