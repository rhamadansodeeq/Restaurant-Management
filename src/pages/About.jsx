import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import { stats, whyChooseUs } from '../data/misc';

export default function About() {
  return (
    <div>
      <PageHero title="About Us" subtitle="Discover the story behind Savory Bites" breadcrumb="About" />

      <section className="section-padding" style={{ background: 'var(--section-about)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <img src="https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg" alt="Restaurant" className="about-img" />
            </div>
            <div>
              <SectionHeader subtitle="Our Story" title="A Passion for Great Food" />
              <p style={{ marginBottom: '16px' }}>
                Founded in 2010, Savory Bites began as a small family-owned restaurant with a big dream: to bring exceptional food and warm hospitality to our community. Over the years, we've grown into a beloved dining destination, but our values remain the same — quality, creativity, and care in every dish.
              </p>
              <p style={{ marginBottom: '16px' }}>
                Our team of award-winning chefs combines traditional recipes with modern techniques, using only the freshest locally-sourced ingredients. From our wood-fired pizzas to our perfectly grilled steaks, every dish is crafted with passion and precision.
              </p>
              <p>
                Whether you're joining us for a casual lunch, a romantic dinner, or a special celebration, we promise an experience that will delight your senses and leave you craving more.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ background: 'var(--section-popular)' }}>
        <div className="container">
          <SectionHeader subtitle="Our Values" title="What We Stand For" />
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

      <section className="section-padding" style={{ background: 'var(--section-services)' }}>
        <div className="container">
          <SectionHeader subtitle="Our Achievements" title="Numbers That Speak" />
          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.id} className="stat-item card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-num">{stat.value}{stat.suffix}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ background: 'var(--section-chef)' }}>
        <div className="container">
          <SectionHeader subtitle="Our Mission" title="Bringing People Together" />
          <p style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', fontSize: '1.1rem' }}>
            "Our mission is to create memorable dining experiences that bring people together. We believe that every meal should be a celebration — of flavor, of community, and of life's beautiful moments."
          </p>
          <p style={{ textAlign: 'center', marginTop: '16px', fontWeight: '600', color: 'var(--primary)' }}>— Marco Rossi, Executive Chef & Founder</p>
        </div>
      </section>
    </div>
  );
}
