import { useState, useEffect } from 'react';
import PageHero from '../components/PageHero';
import { fetchFaqs } from '../lib/data';

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    fetchFaqs().then(setFaqs).catch((err) => console.error(err.message));
  }, []);

  return (
    <div>
      <PageHero title="Frequently Asked Questions" subtitle="Find answers to common questions" breadcrumb="FAQ" />

      <section className="section-padding" style={{ background: 'var(--section-about)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          {faqs.map((faq) => (
            <div key={faq.id} className="faq-item">
              <div
                className={`faq-question ${open === faq.id ? 'open' : ''}`}
                onClick={() => setOpen(open === faq.id ? null : faq.id)}
              >
                <span>{faq.question}</span>
                <span className="arrow">▼</span>
              </div>
              <div className={`faq-answer ${open === faq.id ? 'open' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <p style={{ marginBottom: '16px' }}>Still have questions?</p>
            <a href="/contact" className="btn btn-primary">Contact Us</a>
          </div>
        </div>
      </section>
    </div>
  );
}
