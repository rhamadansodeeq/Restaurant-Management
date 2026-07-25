import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFoods } from '../context/FoodContext';
import { useOrders } from '../context/OrderContext';
import { useReservations } from '../context/ReservationContext';
import { useToast } from '../context/ToastContext';
import { fetchCategories } from '../lib/data';
import { dailySales, monthlySales, bestSellingFoods } from '../data/admin';
import { formatPrice, formatDate } from '../utils/validation';

export default function AdminDashboard() {
  const { user, users, deleteUser, updateUser } = useAuth();
  const { foods, addFood, updateFood, deleteFood } = useFoods();
  const { orders, updateOrderStatus, cancelOrder } = useOrders();
  const { reservations, updateReservationStatus, deleteReservation } = useReservations();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [tab, setTab] = useState('overview');
  const [search, setSearch] = useState('');
  const [foodModal, setFoodModal] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [categories, setCategories] = useState([]);

  // Fetch categories when food modal opens
  if (foodModal && categories.length === 0) {
    fetchCategories().then(setCategories).catch((err) => console.error(err.message));
  }

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: '📊' },
    { id: 'foods', label: 'Food Management', icon: '🍽️' },
    { id: 'orders', label: 'Order Management', icon: '📦' },
    { id: 'reservations', label: 'Reservations', icon: '📅' },
    { id: 'customers', label: 'Customers', icon: '👥' },
    { id: 'reports', label: 'Reports', icon: '📈' },
  ];

  const maxDaily = Math.max(...dailySales.map((d) => d.sales));
  const maxMonthly = Math.max(...monthlySales.map((m) => m.sales));
  const maxBest = Math.max(...bestSellingFoods.map((f) => f.orders));

  const filteredOrders = orders.filter((o) =>
    o.id.toLowerCase().includes(search.toLowerCase()) ||
    (o.customer_name || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleSaveFood = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const catName = formData.get('category');
    const foodData = {
      name: formData.get('name'),
      description: formData.get('description'),
      category: catName,
      category_id: categories.find((c) => c.name === catName)?.id || 1,
      ingredients: formData.get('ingredients').split(',').map((i) => i.trim()).filter(Boolean),
      prep_time: formData.get('prepTime'),
      price: parseFloat(formData.get('price')),
      old_price: formData.get('oldPrice') ? parseFloat(formData.get('oldPrice')) : null,
      image: formData.get('image') || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      gallery: [formData.get('image') || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'],
      nutrition: { calories: parseInt(formData.get('calories')) || 0, protein: '0g', carbs: '0g', fat: '0g' },
      rating: 0, reviews_count: 0, popularity: 0, availability: true,
      featured: formData.get('featured') === 'on',
      popular: formData.get('popular') === 'on',
      special_offer: formData.get('specialOffer') === 'on',
    };
    try {
      if (foodModal.id) {
        await updateFood(foodModal.id, foodData);
        showToast('Food updated successfully!', 'success');
      } else {
        await addFood(foodData);
        showToast('Food added successfully!', 'success');
      }
      setFoodModal(null);
    } catch (err) {
      showToast('Error saving food: ' + err.message, 'error');
    }
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h3>🍽️ Admin Panel</h3>
        <div style={{ padding: '16px 24px', fontSize: '0.85rem', color: '#888', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          Welcome, {user?.name}
        </div>
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`admin-menu-item ${tab === item.id ? 'active' : ''}`}
            onClick={() => setTab(item.id)}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
        <div className="admin-menu-item" onClick={() => navigate('/')} style={{ marginTop: '20px' }}>
          <span>🏠</span><span>Back to Site</span>
        </div>
      </aside>

      <div className="admin-content">
        <div className="admin-header">
          <h2>{menuItems.find((m) => m.id === tab)?.label}</h2>
        </div>

        {tab === 'overview' && (
          <div>
            <div className="grid-4" style={{ marginBottom: '32px' }}>
              <div className="admin-stat-card"><div className="stat-icon">👥</div><div className="stat-value">{users.length}</div><div className="stat-label">Total Customers</div></div>
              <div className="admin-stat-card"><div className="stat-icon">📦</div><div className="stat-value">{orders.length}</div><div className="stat-label">Total Orders</div></div>
              <div className="admin-stat-card"><div className="stat-icon">📅</div><div className="stat-value">{reservations.length}</div><div className="stat-label">Reservations</div></div>
              <div className="admin-stat-card"><div className="stat-icon">🍽️</div><div className="stat-value">{foods.length}</div><div className="stat-label">Food Items</div></div>
            </div>

            <div className="grid-2">
              <div className="card" style={{ padding: '24px' }}>
                <h4 style={{ marginBottom: '16px' }}>Daily Sales (This Week)</h4>
                <div className="bar-chart">
                  {dailySales.map((d) => (
                    <div key={d.day} className="bar" style={{ height: `${(d.sales / maxDaily) * 100}%` }}>
                      <span className="bar-value">${(d.sales / 1000).toFixed(1)}k</span>
                      <span className="bar-label">{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card" style={{ padding: '24px' }}>
                <h4 style={{ marginBottom: '16px' }}>Monthly Sales (This Year)</h4>
                <div className="bar-chart">
                  {monthlySales.map((m) => (
                    <div key={m.month} className="bar" style={{ height: `${(m.sales / maxMonthly) * 100}%` }}>
                      <span className="bar-value">${(m.sales / 1000).toFixed(0)}k</span>
                      <span className="bar-label">{m.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: '24px', marginTop: '24px' }}>
              <h4 style={{ marginBottom: '16px' }}>Best-Selling Meals</h4>
              {bestSellingFoods.map((f, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.9rem' }}>
                    <span>{f.name}</span>
                    <span style={{ fontWeight: '600' }}>{f.orders} orders</span>
                  </div>
                  <div style={{ height: '8px', background: 'var(--gray-100)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(f.orders / maxBest) * 100}%`, background: 'var(--primary-gradient)', borderRadius: '4px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'foods' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <p style={{ color: 'var(--text-muted)' }}>{foods.length} food items</p>
              <button className="btn btn-primary" onClick={() => setFoodModal({})}>+ Add Food</button>
            </div>
            <div className="table-wrapper">
              <table>
                <thead><tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Rating</th><th>Available</th><th>Actions</th></tr></thead>
                <tbody>
                  {foods.map((f) => (
                    <tr key={f.id}>
                      <td><img src={f.image} alt={f.name} style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} /></td>
                      <td>{f.name}</td>
                      <td><span className="badge badge-primary">{f.category}</span></td>
                      <td>{formatPrice(f.price)}</td>
                      <td>{'★'.repeat(Math.floor(f.rating))} ({f.reviews_count})</td>
                      <td>{f.availability ? <span className="badge badge-success">Yes</span> : <span className="badge badge-danger">No</span>}</td>
                      <td>
                        <button className="btn btn-sm btn-secondary" onClick={() => setFoodModal(f)}>Edit</button>
                        <button className="btn btn-sm btn-danger" style={{ marginLeft: '6px' }} onClick={async () => { await deleteFood(f.id); showToast('Food deleted', 'success'); }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'orders' && (
          <div>
            <input type="text" placeholder="🔍 Search by order ID or customer name..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: '100%', maxWidth: '400px', padding: '10px 16px', border: '1.5px solid var(--input-border)', borderRadius: 'var(--radius-full)', background: 'var(--input-bg)', color: 'var(--text-primary)', marginBottom: '20px' }} />
            <div className="table-wrapper">
              <table>
                <thead><tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {filteredOrders.map((o) => (
                    <tr key={o.id}>
                      <td><strong>{o.id}</strong></td>
                      <td>{o.customer_name}</td>
                      <td>{(o.items || []).map((i) => `${i.name}×${i.qty}`).join(', ')}</td>
                      <td>{formatPrice(o.total)}</td>
                      <td>{formatDate(o.created_at)}</td>
                      <td><span className={`status-${o.status}`}>{o.status}</span></td>
                      <td>
                        {o.status === 'pending' && <button className="btn btn-sm btn-success" style={{ marginBottom: '4px' }} onClick={async () => { await updateOrderStatus(o.id, 'preparing'); showToast('Order approved', 'success'); }}>Approve</button>}
                        {o.status === 'preparing' && <button className="btn btn-sm btn-secondary" style={{ marginBottom: '4px' }} onClick={async () => { await updateOrderStatus(o.id, 'delivered'); showToast('Order delivered', 'success'); }}>Deliver</button>}
                        {o.status !== 'delivered' && o.status !== 'cancelled' && <button className="btn btn-sm btn-danger" onClick={async () => { await cancelOrder(o.id); showToast('Order cancelled', 'warning'); }}>Cancel</button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'reservations' && (
          <div>
            <div className="table-wrapper">
              <table>
                <thead><tr><th>ID</th><th>Customer</th><th>Date</th><th>Time</th><th>Guests</th><th>Preference</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {reservations.map((r) => (
                    <tr key={r.id}>
                      <td><strong>{r.id}</strong></td>
                      <td>{r.customer_name}<br /><span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{r.phone}</span></td>
                      <td>{r.reservation_date}</td>
                      <td>{r.reservation_time}</td>
                      <td>{r.guests}</td>
                      <td>{r.preference}</td>
                      <td><span className={`status-${r.status}`}>{r.status}</span></td>
                      <td>
                        {r.status === 'pending' && (
                          <>
                            <button className="btn btn-sm btn-success" style={{ marginBottom: '4px' }} onClick={async () => { await updateReservationStatus(r.id, 'approved'); showToast('Reservation approved', 'success'); }}>Approve</button>
                            <button className="btn btn-sm btn-danger" onClick={async () => { await updateReservationStatus(r.id, 'rejected'); showToast('Reservation rejected', 'warning'); }}>Reject</button>
                          </>
                        )}
                        <button className="btn btn-sm btn-danger" style={{ marginLeft: '4px' }} onClick={async () => { await deleteReservation(r.id); showToast('Reservation deleted', 'success'); }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'customers' && (
          <div>
            <div className="table-wrapper">
              <table>
                <thead><tr><th>Name</th><th>Username</th><th>Email</th><th>Phone</th><th>Orders</th><th>Joined</th><th>Actions</th></tr></thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.name}</td>
                      <td>{u.username}</td>
                      <td>{u.email}</td>
                      <td>{u.phone}</td>
                      <td>{u.orders || 0}</td>
                      <td>{u.joined}</td>
                      <td>
                        <button className="btn btn-sm btn-secondary" onClick={() => setEditUser(u)}>Edit</button>
                        <button className="btn btn-sm btn-danger" style={{ marginLeft: '6px' }} onClick={async () => { await deleteUser(u.id); showToast('Customer deleted', 'success'); }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'reports' && (
          <div>
            <div className="grid-2" style={{ marginBottom: '24px' }}>
              <div className="card" style={{ padding: '24px' }}>
                <h4 style={{ marginBottom: '16px' }}>Daily Orders</h4>
                <div className="bar-chart">
                  {dailySales.map((d) => (
                    <div key={d.day} className="bar" style={{ height: `${(d.sales / maxDaily) * 100}%` }}>
                      <span className="bar-value">{d.sales}</span>
                      <span className="bar-label">{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card" style={{ padding: '24px' }}>
                <h4 style={{ marginBottom: '16px' }}>Monthly Revenue</h4>
                <div className="bar-chart">
                  {monthlySales.map((m) => (
                    <div key={m.month} className="bar" style={{ height: `${(m.sales / maxMonthly) * 100}%` }}>
                      <span className="bar-value">${(m.sales / 1000).toFixed(0)}k</span>
                      <span className="bar-label">{m.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid-2">
              <div className="card" style={{ padding: '24px' }}>
                <h4 style={{ marginBottom: '16px' }}>Customer Statistics</h4>
                <div style={{ marginBottom: '12px' }}><strong>Total Customers:</strong> {users.length}</div>
                <div style={{ marginBottom: '12px' }}><strong>Male:</strong> {users.filter((u) => u.gender === 'Male').length}</div>
                <div style={{ marginBottom: '12px' }}><strong>Female:</strong> {users.filter((u) => u.gender === 'Female').length}</div>
                <div><strong>Avg Orders per Customer:</strong> {users.length > 0 ? (users.reduce((s, u) => s + (u.orders || 0), 0) / users.length).toFixed(1) : 0}</div>
              </div>
              <div className="card" style={{ padding: '24px' }}>
                <h4 style={{ marginBottom: '16px' }}>Reservation Statistics</h4>
                <div style={{ marginBottom: '12px' }}><strong>Total Reservations:</strong> {reservations.length}</div>
                <div style={{ marginBottom: '12px' }}><strong>Pending:</strong> {reservations.filter((r) => r.status === 'pending').length}</div>
                <div style={{ marginBottom: '12px' }}><strong>Approved:</strong> {reservations.filter((r) => r.status === 'approved').length}</div>
                <div><strong>Rejected:</strong> {reservations.filter((r) => r.status === 'rejected').length}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {foodModal && (
        <div className="modal-overlay" onClick={() => setFoodModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{foodModal.id ? 'Edit Food' : 'Add Food'}</h3>
              <button className="modal-close" onClick={() => setFoodModal(null)}>×</button>
            </div>
            <form onSubmit={handleSaveFood}>
              <div className="form-group"><label>Name</label><input type="text" name="name" defaultValue={foodModal.name || ''} required /></div>
              <div className="form-group"><label>Description</label><textarea name="description" defaultValue={foodModal.description || ''} required rows="2" /></div>
              <div className="form-row">
                <div className="form-group"><label>Category</label>
                  <select name="category" defaultValue={foodModal.category || 'Pizza'}>
                    {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div className="form-group"><label>Price</label><input type="number" name="price" step="0.01" defaultValue={foodModal.price || ''} required /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label>Old Price (optional)</label><input type="number" name="oldPrice" step="0.01" defaultValue={foodModal.old_price || ''} /></div>
                <div className="form-group"><label>Prep Time</label><input type="text" name="prepTime" defaultValue={foodModal.prep_time || ''} placeholder="20 min" required /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label>Calories</label><input type="number" name="calories" defaultValue={foodModal.nutrition?.calories || ''} /></div>
                <div className="form-group"><label>Image URL</label><input type="text" name="image" defaultValue={foodModal.image || ''} placeholder="https://..." /></div>
              </div>
              <div className="form-group"><label>Ingredients (comma-separated)</label><input type="text" name="ingredients" defaultValue={Array.isArray(foodModal.ingredients) ? foodModal.ingredients.join(', ') : ''} /></div>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <label><input type="checkbox" name="featured" defaultChecked={foodModal.featured} /> Featured</label>
                <label><input type="checkbox" name="popular" defaultChecked={foodModal.popular} /> Popular</label>
                <label><input type="checkbox" name="specialOffer" defaultChecked={foodModal.special_offer} /> Special Offer</label>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>{foodModal.id ? 'Update' : 'Add'} Food</button>
            </form>
          </div>
        </div>
      )}

      {editUser && (
        <div className="modal-overlay" onClick={() => setEditUser(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Customer</h3>
              <button className="modal-close" onClick={() => setEditUser(null)}>×</button>
            </div>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const fd = new FormData(e.target);
              await updateUser(editUser.id, { name: fd.get('name'), email: fd.get('email'), phone: fd.get('phone'), address: fd.get('address') });
              showToast('Customer updated', 'success');
              setEditUser(null);
            }}>
              <div className="form-group"><label>Name</label><input type="text" name="name" defaultValue={editUser.name} required /></div>
              <div className="form-group"><label>Email</label><input type="email" name="email" defaultValue={editUser.email} required /></div>
              <div className="form-group"><label>Phone</label><input type="text" name="phone" defaultValue={editUser.phone} /></div>
              <div className="form-group"><label>Address</label><input type="text" name="address" defaultValue={editUser.address} /></div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
