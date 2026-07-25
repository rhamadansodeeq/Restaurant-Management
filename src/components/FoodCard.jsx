import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { renderStars, formatPrice } from '../utils/validation';

export default function FoodCard({ food }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(food, 1);
    showToast(`${food.name} added to cart!`, 'success');
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(food);
    showToast(
      isInWishlist(food.id) ? `${food.name} removed from wishlist` : `${food.name} added to wishlist!`,
      'info'
    );
  };

  return (
    <div className="food-card card">
      <Link to={`/food/${food.id}`}>
        <div className="food-card-img">
          <img src={food.image} alt={food.name} />
          {food.specialOffer && (
            <span className="badge badge-danger" style={{ position: 'absolute', top: '10px', left: '10px' }}>
              Special Offer
            </span>
          )}
          <button className="wishlist-btn" onClick={handleWishlist}>
            {isInWishlist(food.id) ? '❤️' : '🤍'}
          </button>
        </div>
      </Link>
      <div className="food-card-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
          <Link to={`/food/${food.id}`}>
            <h4 style={{ margin: 0, fontSize: '1.05rem' }}>{food.name}</h4>
          </Link>
          <span className="badge badge-primary">{food.category}</span>
        </div>
        <p style={{ fontSize: '0.85rem', marginBottom: '8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {food.description}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <span style={{ color: '#f4a261', fontSize: '0.85rem' }}>{renderStars(food.rating)}</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({food.reviewsCount})</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>• {food.prepTime}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="price">{formatPrice(food.price)}</span>
            {food.oldPrice && <span className="price-old" style={{ marginLeft: '6px' }}>{formatPrice(food.oldPrice)}</span>}
          </div>
          <button onClick={handleAddToCart} className="btn btn-primary btn-sm" disabled={!food.availability}>
            Add +
          </button>
        </div>
        {!food.availability && (
          <p style={{ color: 'var(--error)', fontSize: '0.8rem', marginTop: '8px', fontWeight: '600' }}>Currently Unavailable</p>
        )}
      </div>
    </div>
  );
}
