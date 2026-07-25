import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import FoodCard from '../components/FoodCard';
import { useFoods } from '../context/FoodContext';
import { fetchCategories } from '../lib/data';

export default function Menu() {
  const { foods, loading } = useFoods();
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [sortBy, setSortBy] = useState('popularity');
  const [priceRange, setPriceRange] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then(setCategories).catch((err) => console.error(err.message));
  }, []);

  useEffect(() => {
    const s = searchParams.get('search');
    const c = searchParams.get('category');
    if (s) setSearch(s);
    if (c) setCategory(c);
  }, [searchParams]);

  const filteredFoods = foods
    .filter((f) => f.name.toLowerCase().includes(search.toLowerCase()))
    .filter((f) => category === 'All' || f.category === category)
    .filter((f) => {
      if (priceRange === 'low') return f.price < 10;
      if (priceRange === 'mid') return f.price >= 10 && f.price < 20;
      if (priceRange === 'high') return f.price >= 20;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.popularity - a.popularity;
    });

  return (
    <div>
      <PageHero title="Food Menu" subtitle="Explore our delicious selection of dishes" breadcrumb="Menu" />

      <section className="section-padding" style={{ background: 'var(--section-popular)' }}>
        <div className="container">
          <div className="filter-bar">
            <input
              type="text"
              placeholder="🔍 Search dishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: '1', minWidth: '200px', padding: '10px 16px', border: '1.5px solid var(--input-border)', borderRadius: 'var(--radius-full)', background: 'var(--input-bg)', color: 'var(--text-primary)' }}
            />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '10px 16px', border: '1.5px solid var(--input-border)', borderRadius: 'var(--radius-full)', background: 'var(--input-bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>
              <option value="popularity">Sort: Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
            <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} style={{ padding: '10px 16px', border: '1.5px solid var(--input-border)', borderRadius: 'var(--radius-full)', background: 'var(--input-bg)', color: 'var(--text-primary)', cursor: 'pointer' }}>
              <option value="all">All Prices</option>
              <option value="low">Under $10</option>
              <option value="mid">$10 - $20</option>
              <option value="high">$20+</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <button className={`filter-chip ${category === 'All' ? 'active' : ''}`} onClick={() => setCategory('All')}>All</button>
            {categories.map((cat) => (
              <button key={cat.id} className={`filter-chip ${category === cat.name ? 'active' : ''}`} onClick={() => setCategory(cat.name)}>
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          <p style={{ marginBottom: '20px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Showing {filteredFoods.length} {filteredFoods.length === 1 ? 'dish' : 'dishes'}
          </p>

          {loading ? (
            <p style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Loading dishes...</p>
          ) : filteredFoods.length > 0 ? (
            <div className="grid-4">
              {filteredFoods.map((food) => (
                <FoodCard key={food.id} food={food} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🍽️</div>
              <h3>No dishes found</h3>
              <p>Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
