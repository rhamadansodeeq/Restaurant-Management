import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useFoods } from '../context/FoodContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { fetchFoodReviews } from '../lib/data';
import { renderStars, formatPrice } from '../utils/validation';
import FoodCard from '../components/FoodCard';
import SectionHeader from '../components/SectionHeader';

export default function FoodDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getFoodById, foods } = useFoods();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const food = getFoodById(id);
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (id) {
      fetchFoodReviews(id).then(setReviews).catch((err) => console.error(err.message));
    }
  }, [id]);

  if (!food) {
    return (
      <div style={{ paddingTop: '100px', minHeight: '60vh' }}>
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>Dish not found</h3>
          <Link to="/menu" className="btn btn-primary" style={{ marginTop: '16px' }}>Back to Menu</Link>
        </div>
      </div>
    );
  }

  const relatedFoods = foods.filter((f) => f.category === food.category && f.id !== food.id).slice(0, 4);
  const gallery = food.gallery || [food.image];

  const handleAddToCart = () => {
    addToCart(food, qty);
    showToast(`${qty} × ${food.name} added to cart!`, 'success');
  };

  const handleOrderNow = () => {
    addToCart(food, qty);
    navigate('/checkout');
  };

  const handleWishlist = () => {
    toggleWishlist(food);
    showToast(isInWishlist(food.id) ? 'Removed from wishlist' : 'Added to wishlist!', 'info');
  };

  return (
    <div style={{ paddingTop: '72px' }}>
      <section className="section-padding" style={{ background: 'var(--section-about)' }}>
        <div className="container">
          <div className="breadcrumb" style={{ justifyContent: 'flex-start', marginBottom: '24px', color: 'var(--text-muted)' }}>
            <Link to="/" style={{ color: 'var(--text-secondary)' }}>Home</Link>
            <span>/</span>
            <Link to="/menu" style={{ color: 'var(--text-secondary)' }}>Menu</Link>
            <span>/</span>
            <span style={{ color: 'var(--text-primary)' }}>{food.name}</span>
          </div>

          <div className="grid-2" style={{ alignItems: 'start' }}>
            <div>
              <img src={gallery[activeImage]} alt={food.name} style={{ width: '100%', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', marginBottom: '16px' }} />
              {gallery.length > 1 && (
                <div style={{ display: 'flex', gap: '12px' }}>
                  {gallery.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${food.name} ${idx + 1}`}
                      onClick={() => setActiveImage(idx)}
                      style={{
                        width: '80px', height: '80px', borderRadius: 'var(--radius-md)', objectFit: 'cover', cursor: 'pointer',
                        border: activeImage === idx ? '3px solid var(--primary)' : '2px solid var(--border-color)',
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            <div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <span className="badge badge-primary">{food.category}</span>
                {food.special_offer && <span className="badge badge-danger">Special Offer</span>}
                {food.availability ? <span className="badge badge-success">Available</span> : <span className="badge badge-danger">Unavailable</span>}
              </div>
              <h1 style={{ marginBottom: '8px' }}>{food.name}</h1>
              <div className="rating" style={{ marginBottom: '16px' }}>
                <span style={{ color: '#f4a261' }}>{renderStars(food.rating)}</span>
                <span>{food.rating} ({food.reviews_count} reviews)</span>
                <span>•</span>
                <span>⏱️ {food.prep_time}</span>
              </div>
              <p style={{ marginBottom: '20px', fontSize: '1.05rem' }}>{food.description}</p>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ marginBottom: '10px' }}>Ingredients</h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {(food.ingredients || []).map((ing, i) => (
                    <span key={i} className="badge badge-info">{ing}</span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ marginBottom: '10px' }}>Nutritional Information</h4>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <span className="badge badge-warning">🔥 {food.nutrition?.calories} cal</span>
                  <span className="badge badge-success">Protein: {food.nutrition?.protein}</span>
                  <span className="badge badge-info">Carbs: {food.nutrition?.carbs}</span>
                  <span className="badge badge-primary">Fat: {food.nutrition?.fat}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <span className="price" style={{ fontSize: '2rem' }}>{formatPrice(food.price)}</span>
                {food.old_price && <span className="price-old" style={{ fontSize: '1.2rem' }}>{formatPrice(food.old_price)}</span>}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <div className="qty-control">
                  <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(qty + 1)}>+</button>
                </div>
                <button className="btn btn-primary" onClick={handleAddToCart} disabled={!food.availability}>🛒 Add to Cart</button>
                <button className="btn btn-secondary" onClick={handleOrderNow} disabled={!food.availability}>Order Now</button>
                <button className="nav-icon-btn" onClick={handleWishlist} style={{ width: '44px', height: '44px' }}>
                  {isInWishlist(food.id) ? '❤️' : '🤍'}
                </button>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '60px' }}>
            <SectionHeader title="Customer Reviews" subtitle={`${reviews.length} Reviews`} />
            {reviews.length > 0 ? (
              <div className="grid-2">
                {reviews.map((r) => (
                  <div key={r.id} className="card" style={{ padding: '20px' }}>
                    <div className="testimonial-author" style={{ marginBottom: '12px' }}>
                      <img src={r.avatar} alt={r.user_name} />
                      <div>
                        <div className="name">{r.user_name}</div>
                        <div className="role">{r.review_date}</div>
                      </div>
                      <div style={{ marginLeft: 'auto', color: '#f4a261' }}>{renderStars(r.rating)}</div>
                    </div>
                    <p style={{ fontSize: '0.9rem' }}>"{r.comment}"</p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No reviews yet. Be the first to review!</p>
            )}
          </div>

          {relatedFoods.length > 0 && (
            <div style={{ marginTop: '60px' }}>
              <SectionHeader title="Related Dishes" subtitle="You Might Also Like" />
              <div className="grid-4">
                {relatedFoods.map((f) => (
                  <FoodCard key={f.id} food={f} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
