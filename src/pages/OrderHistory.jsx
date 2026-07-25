import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice, formatDate } from '../utils/validation';

export default function OrderHistory() {
  const { orders, cancelOrder } = useOrders();
  const { user } = useAuth();

  const userOrders = user ? orders.filter((o) => o.customer_id === user.id || o.customer_name === user.name) : [];

  return (
    <div>
      <PageHero title="Order History" subtitle="Track and manage your orders" breadcrumb="Orders" />

      <section className="section-padding" style={{ background: 'var(--section-contact)' }}>
        <div className="container">
          {userOrders.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <h3>No orders yet</h3>
              <p>Place your first order and it will appear here.</p>
              <Link to="/menu" className="btn btn-primary" style={{ marginTop: '16px' }}>Order Now</Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {userOrders.map((order) => (
                <div key={order.id} className="card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <h4 style={{ marginBottom: '4px' }}>{order.id}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{formatDate(order.created_at)} • {order.method}</p>
                    </div>
                    <span className={`status-${order.status}`}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    {(order.items || []).map((item, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '0.9rem' }}>
                        <span>{item.name} × {item.qty}</span>
                        <span>{formatPrice(item.price * item.qty)}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <span style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--primary)' }}>Total: {formatPrice(order.total)}</span>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>📍 {order.address}</p>
                    </div>
                    {order.status === 'pending' && (
                      <button className="btn btn-danger btn-sm" onClick={() => cancelOrder(order.id)}>Cancel Order</button>
                    )}
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
