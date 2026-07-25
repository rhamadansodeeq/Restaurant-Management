import { foods } from '../data/foods';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useFoods } from '../context/FoodContext';

export default function SearchBar() {
  const { foods: dbFoods } = useFoods();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const allFoods = dbFoods.length > 0 ? dbFoods : foods;

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 1) {
      const matches = allFoods
        .filter((f) => f.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);
      setSuggestions(matches);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/menu?search=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search dishes..."
          value={query}
          onChange={handleChange}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onFocus={() => query.length > 1 && setShowSuggestions(true)}
        />
      </form>
      {showSuggestions && suggestions.length > 0 && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'var(--card-bg)', borderRadius: '0 0 8px 8px',
          boxShadow: 'var(--shadow-lg)', zIndex: 1000, overflow: 'hidden',
        }}>
          {suggestions.map((food) => (
            <Link
              key={food.id}
              to={`/food/${food.id}`}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', borderBottom: '1px solid var(--border-color)' }}
              onClick={() => { setShowSuggestions(false); setQuery(''); }}
            >
              <img src={food.image} alt={food.name} style={{ width: '32px', height: '32px', borderRadius: '4px', objectFit: 'cover' }} />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{food.name}</span>
              <span className="price" style={{ marginLeft: 'auto', fontSize: '0.85rem' }}>${food.price}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
