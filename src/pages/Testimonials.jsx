import { useState, useEffect } from 'react';
import PageHero from '../components/PageHero';
import { fetchTestimonials } from '../lib/data';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchTestimonials().then(setTestimonials).catch((err) => console.error(err.message));
  }, []);

  return (
    <div>
      <PageHero title="Testimonials" subtitle="What our valued customers say about us" breadcrumb="Testimonials" />

      <section className="section-padding" style={{ background: 'var(--section-testimonials)' }}>
        <div className="container">
          <div className="grid-3">
            {testimonials.map((t) => (
              <div key={t.id} className="card testimonial-card">
                <div className="quote-icon">❝</div>
                <p className="comment">"{t.comment}"</p>
                <div className="rating" style={{ marginBottom: '16px' }}>
                  <span style={{ color: '#f4a261' }}>{ '★'.repeat(t.rating)}{ '☆'.repeat(5 - t.rating)}</span>
                </div>
                <div className="testimonial-author">
                  <img src={t.image} alt={t.name} />
                  <div>
                    <div className="name">{t.name}</div>
                    <div className="role">{t.role}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.post_date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
