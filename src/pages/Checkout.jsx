import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/validation';

export default function Checkout() {
  const { cartItems, subtotal, serviceCharge, deliveryFee, total, clearCart } = useCart();
  const { user } = useAuth();
  const { placeOrder } = useOrders();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    method: 'Home Delivery',
    payment: 'Cash on Delivery',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      showToast('Please log in to place an order', 'warning');
      navigate('/login');
      return;
    }
    try {
      const order = await placeOrder({
        userId: user.id,
        customerName: form.name,
        phone: form.phone,
        address: form.method === 'Pickup' ? 'Pickup at restaurant' : form.address,
        items: cartItems.map((i) => ({ name: i.name, qty: i.qty, price: i.price })),
        subtotal, serviceCharge, deliveryFee, total,
        method: form.method,
        payment: form.payment,
      });
      clearCart();
      showToast(`Order ${order.id} placed successfully!`, 'success');
      navigate('/orders');
    } catch (err) {
      showToast('Failed to place order: ' + err.message, 'error');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div>
        <PageHero title="Checkout" breadcrumb="Checkout" />
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <Link to="/menu" className="btn btn-primary" style={{ marginTop: '16px' }}>Browse Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHero title="Checkout" subtitle="Complete your order" breadcrumb="Checkout" />

      <section className="section-padding" style={{ background: 'var(--section-contact)' }}>
        <div className="container">
          <div className="cart-layout">
            <div className="card" style={{ padding: '32px' }}>
              <h3 style={{ marginBottom: '20px' }}>Delivery Details</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Customer Name</label>
                  <input type="text" name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="text" name="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Delivery Address</label>
                  <textarea name="address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} rows="3" required={form.method === 'Home Delivery'} disabled={form.method === 'Pickup'} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Delivery Method</label>
                    <select name="method" value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })}>
                      <option value="Home Delivery">Home Delivery</option>
                      <option value="Pickup">Pickup</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Payment Method</label>
                    <select name="payment" value={form.payment} onChange={(e) => setForm({ ...form, payment: e.target.value })}>
                      <option value="Cash on Delivery">Cash on Delivery</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>Place Order — {formatPrice(total)}</button>
              </form>
            </div>

            <div className="cart-summary">
              <h3 style={{ marginBottom: '16px' }}>Order Summary</h3>
              {cartItems.map((item) => (
                <div key={item.id} className="summary-row">
                  <span>{item.name} × {item.qty}</span>
                  <span>{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
              <div className="summary-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="summary-row"><span>Service Charge</span><span>{formatPrice(serviceCharge)}</span></div>
              <div className="summary-row"><span>Delivery Fee</span><span>{formatPrice(deliveryFee)}</span></div>
              <div className="summary-row total"><span>Total</span><span>{formatPrice(total)}</span></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
