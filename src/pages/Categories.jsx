import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { useFoods } from '../context/FoodContext';
import { fetchCategories } from '../lib/data';

export default function Categories() {
  const { foods } = useFoods();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then(setCategories).catch((err) => console.error(err.message));
  }, []);

  return (
    <div>
      <PageHero title="Food Categories" subtitle="Browse our menu by category" breadcrumb="Categories" />

      <section className="section-padding" style={{ background: 'var(--section-categories)' }}>
        <div className="container">
          <div className="grid-3">
            {categories.map((cat) => {
              const count = foods.filter((f) => f.category === cat.name).length;
              return (
                <Link key={cat.id} to={`/menu?category=${cat.name}`} className="card category-card">
                  <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
                  <div style={{ padding: '20px' }}>
                    <div className="cat-icon">{cat.icon}</div>
                    <h4>{cat.name}</h4>
                    <p>{cat.description}</p>
                    <span className="badge badge-primary">{count} dishes</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
