import { useState, useEffect } from 'react';
import PageHero from '../components/PageHero';
import { fetchChefs } from '../lib/data';

export default function Chefs() {
  const [chefs, setChefs] = useState([]);

  useEffect(() => {
    fetchChefs().then(setChefs).catch((err) => console.error(err.message));
  }, []);

  return (
    <div>
      <PageHero title="Our Chefs" subtitle="Meet the culinary artists behind our dishes" breadcrumb="Chefs" />

      <section className="section-padding" style={{ background: 'var(--section-chef)' }}>
        <div className="container">
          <div className="grid-4">
            {chefs.map((chef) => (
              <div key={chef.id} className="card chef-card">
                <img src={chef.image} alt={chef.name} />
                <div className="chef-card-body">
                  <h4>{chef.name}</h4>
                  <div className="role">{chef.role}</div>
                  <p style={{ fontSize: '0.85rem', marginBottom: '8px' }}><strong>Specialty:</strong> {chef.specialty}</p>
                  <p style={{ fontSize: '0.85rem' }}>{chef.bio}</p>
                  <div className="chef-social">
                    <a href={chef.social?.twitter || '#'}>𝕏</a>
                    <a href={chef.social?.instagram || '#'}>📷</a>
                    <a href={chef.social?.facebook || '#'}>📘</a>
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
