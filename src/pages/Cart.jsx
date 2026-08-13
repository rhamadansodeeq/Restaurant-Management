import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/validation';

export default function Cart() {
  const { cartItems, updateQty, removeFromCart, clearCart, subtotal, serviceCharge, deliveryFee, total } = useCart();

  return (
    <div>
      <PageHero title="Shopping Cart" subtitle="Review your items before checkout" breadcrumb="Cart" />

      <section className="section-padding" style={{ background: 'var(--section-contact)' }}>
        <div className="container">
          {cartItems.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Looks like you haven't added anything yet.</p>
              <Link to="/menu" className="btn btn-primary" style={{ marginTop: '16px' }}>Browse Menu</Link>
            </div>
          ) : (
            <div className="cart-layout">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h3>Cart Items ({cartItems.length})</h3>
                  <button className="btn btn-danger btn-sm" onClick={clearCart}>Clear Cart</button>
                </div>
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.category} • {item.prepTime}</p>
                      <div className="item-price">{formatPrice(item.price)}</div>
                    </div>
                    <div className="qty-control">
                      <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '1.1rem' }}>{formatPrice(item.price * item.qty)}</div>
                      <button onClick={() => removeFromCart(item.id)} className="btn btn-danger btn-sm" style={{ marginTop: '8px' }}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <h3 style={{ marginBottom: '16px' }}>Order Summary</h3>
                <div className="summary-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                <div className="summary-row"><span>Service Charge (5%)</span><span>{formatPrice(serviceCharge)}</span></div>
                <div className="summary-row"><span>Delivery Fee</span><span>{formatPrice(deliveryFee)}</span></div>
                <div className="summary-row total"><span>Total</span><span>{formatPrice(total)}</span></div>
                <Link to="/checkout" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '20px' }}>Proceed to Checkout</Link>
                <Link to="/menu" className="btn btn-outline" style={{ width: '100%', marginTop: '10px' }}>Continue Shopping</Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
