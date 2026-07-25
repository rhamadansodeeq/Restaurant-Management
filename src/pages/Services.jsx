import { useState, useEffect } from 'react';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import { fetchServices } from '../lib/data';
import { whyChooseUs } from '../data/misc';
import { Link } from 'react-router-dom';

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices().then(setServices).catch((err) => console.error(err.message));
  }, []);

  return (
    <div>
      <PageHero title="Our Services" subtitle="Everything we offer to make your dining experience perfect" breadcrumb="Services" />

      <section className="section-padding" style={{ background: 'var(--section-services)' }}>
        <div className="container">
          <SectionHeader subtitle="What We Offer" title="Comprehensive Dining Services" />
          <div className="grid-3">
            {services.map((svc) => (
              <div key={svc.id} className="card service-card">
                <div className="svc-icon">{svc.icon}</div>
                <h4>{svc.title}</h4>
                <p>{svc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ background: 'var(--section-why)' }}>
        <div className="container">
          <SectionHeader subtitle="Our Promise" title="Why Choose Our Services" />
          <div className="grid-3">
            {whyChooseUs.map((item) => (
              <div key={item.id} className="card why-card">
                <div className="why-icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ background: 'var(--section-reservation)' }}>
        <div className="container text-center">
          <SectionHeader subtitle="Get Started" title="Ready to Dine With Us?" />
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/reservation" className="btn btn-primary btn-lg">Book a Table</Link>
            <Link to="/menu" className="btn btn-outline btn-lg">Order Food</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
