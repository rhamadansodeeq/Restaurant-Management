import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatPrice, renderStars } from '../utils/validation';

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const moveToCart = (food) => {
    addToCart(food, 1);
    removeFromWishlist(food.id);
    showToast(`${food.name} moved to cart!`, 'success');
  };

  return (
    <div>
      <PageHero title="My Wishlist" subtitle="Your favorite dishes saved for later" breadcrumb="Wishlist" />

      <section className="section-padding" style={{ background: 'var(--section-reservation)' }}>
        <div className="container">
          {wishlist.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">❤️</div>
              <h3>Your wishlist is empty</h3>
              <p>Save your favorite dishes here for easy access.</p>
              <Link to="/menu" className="btn btn-primary" style={{ marginTop: '16px' }}>Browse Menu</Link>
            </div>
          ) : (
            <div className="grid-4">
              {wishlist.map((food) => (
                <div key={food.id} className="card" style={{ padding: '16px' }}>
                  <Link to={`/food/${food.id}`}>
                    <img src={food.image} alt={food.name} style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '12px' }} />
                  </Link>
                  <Link to={`/food/${food.id}`}>
                    <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>{food.name}</h4>
                  </Link>
                  <div style={{ color: '#f4a261', fontSize: '0.8rem', marginBottom: '4px' }}>{renderStars(food.rating)}</div>
                  <div className="price" style={{ marginBottom: '12px' }}>{formatPrice(food.price)}</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => moveToCart(food)}>Add to Cart</button>
                    <button className="btn btn-danger btn-sm" onClick={() => { removeFromWishlist(food.id); showToast('Removed from wishlist', 'info'); }}>×</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
