import { useState, useEffect } from 'react';
import PageHero from '../components/PageHero';
import { fetchGalleryImages } from '../lib/data';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    fetchGalleryImages().then(setImages).catch((err) => console.error(err.message));
  }, []);

  const categories = ['All', 'Food', 'Interior', 'Chef'];
  const filtered = filter === 'All' ? images : images.filter((g) => g.category === filter);

  return (
    <div>
      <PageHero title="Gallery" subtitle="A visual journey through our restaurant" breadcrumb="Gallery" />

      <section className="section-padding" style={{ background: 'var(--section-blog)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '32px' }}>
            {categories.map((cat) => (
              <button key={cat} className={`filter-chip ${filter === cat ? 'active' : ''}`} onClick={() => setFilter(cat)}>
                {cat}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {filtered.map((img) => (
              <div key={img.id} className="gallery-item" onClick={() => setLightbox(img)}>
                <img src={img.image} alt={img.title} />
                <div className="overlay">{img.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="modal-overlay" onClick={() => setLightbox(null)}>
          <div style={{ maxWidth: '700px', position: 'relative' }}>
            <button className="modal-close" onClick={() => setLightbox(null)} style={{ position: 'absolute', top: '-40px', right: '0' }}>×</button>
            <img src={lightbox.image} alt={lightbox.title} style={{ width: '100%', borderRadius: 'var(--radius-lg)' }} />
            <p style={{ color: 'white', textAlign: 'center', marginTop: '12px', fontSize: '1.1rem' }}>{lightbox.title}</p>
          </div>
        </div>
      )}
    </div>
  );
}
