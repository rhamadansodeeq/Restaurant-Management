import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useReservations } from '../context/ReservationContext';
import { useToast } from '../context/ToastContext';
import { formatDate, formatPrice } from '../utils/validation';

export default function Profile() {
  const { user, updateProfile, changePassword, logout } = useAuth();
  const { orders } = useOrders();
  const { reservations } = useReservations();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [tab, setTab] = useState('profile');
  const [editForm, setEditForm] = useState({
    name: user?.name || '', email: user?.email || '', phone: user?.phone || '', address: user?.address || '',
  });
  const [pwForm, setPwForm] = useState({ old: '', new: '', confirm: '' });

  if (!user) {
    return (
      <div style={{ paddingTop: '100px', minHeight: '60vh' }}>
        <div className="empty-state">
          <h3>Please log in to view your profile</h3>
          <Link to="/login" className="btn btn-primary" style={{ marginTop: '16px' }}>Login</Link>
        </div>
      </div>
    );
  }

  const userOrders = orders.filter((o) => o.customer_id === user.id || o.customer_name === user.name);
  const userReservations = reservations.filter((r) => r.email === user.email);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(editForm).then(() => {
      showToast('Profile updated successfully!', 'success');
      setTab('profile');
    });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (pwForm.new !== pwForm.confirm) {
      showToast('New passwords do not match', 'error');
      return;
    }
    const result = await changePassword(pwForm.old, pwForm.new);
    if (result.success) {
      showToast('Password changed successfully!', 'success');
      setPwForm({ old: '', new: '', confirm: '' });
    } else {
      showToast(result.message, 'error');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: '👤' },
    { id: 'edit', label: 'Edit Profile', icon: '✏️' },
    { id: 'password', label: 'Change Password', icon: '🔒' },
    { id: 'orders', label: 'Order History', icon: '📦' },
    { id: 'reservations', label: 'Reservations', icon: '📅' },
  ];

  return (
    <div>
      <PageHero title="My Profile" subtitle="Manage your account" breadcrumb="Profile" />

      <section className="section-padding" style={{ background: 'var(--section-contact)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '24px', alignItems: 'start' }}>
            <div className="profile-sidebar">
              <div className="avatar">{user.name?.charAt(0).toUpperCase()}</div>
              <h4 style={{ textAlign: 'center', marginBottom: '4px' }}>{user.name}</h4>
              <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>{user.email}</p>
              {menuItems.map((item) => (
                <div key={item.id} className={`profile-menu-item ${tab === item.id ? 'active' : ''}`} onClick={() => setTab(item.id)}>
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
              <div className="profile-menu-item" onClick={handleLogout} style={{ color: 'var(--error)' }}>
                <span>🚪</span>
                <span>Logout</span>
              </div>
            </div>

            <div>
              {tab === 'profile' && (
                <div className="card" style={{ padding: '32px' }}>
                  <h3 style={{ marginBottom: '20px' }}>Account Information</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div><strong>Full Name:</strong> <p>{user.name}</p></div>
                    <div><strong>Username:</strong> <p>{user.username}</p></div>
                    <div><strong>Email:</strong> <p>{user.email}</p></div>
                    <div><strong>Phone:</strong> <p>{user.phone || 'N/A'}</p></div>
                    <div><strong>Gender:</strong> <p>{user.gender || 'N/A'}</p></div>
                    <div><strong>Address:</strong> <p>{user.address || 'N/A'}</p></div>
                    <div><strong>Member Since:</strong> <p>{user.joined || 'N/A'}</p></div>
                    <div><strong>Total Orders:</strong> <p>{userOrders.length}</p></div>
                  </div>
                </div>
              )}

              {tab === 'edit' && (
                <div className="card" style={{ padding: '32px' }}>
                  <h3 style={{ marginBottom: '20px' }}>Edit Profile</h3>
                  <form onSubmit={handleSaveProfile}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Phone</label>
                        <input type="text" value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label>Address</label>
                        <input type="text" value={editForm.address} onChange={(e) => setEditForm({ ...editForm, address: e.target.value })} />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                  </form>
                </div>
              )}

              {tab === 'password' && (
                <div className="card" style={{ padding: '32px' }}>
                  <h3 style={{ marginBottom: '20px' }}>Change Password</h3>
                  <form onSubmit={handleChangePassword}>
                    <div className="form-group">
                      <label>Current Password</label>
                      <input type="password" value={pwForm.old} onChange={(e) => setPwForm({ ...pwForm, old: e.target.value })} required />
                    </div>
                    <div className="form-group">
                      <label>New Password</label>
                      <input type="password" value={pwForm.new} onChange={(e) => setPwForm({ ...pwForm, new: e.target.value })} required />
                    </div>
                    <div className="form-group">
                      <label>Confirm New Password</label>
                      <input type="password" value={pwForm.confirm} onChange={(e) => setPwForm({ ...pwForm, confirm: e.target.value })} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Change Password</button>
                  </form>
                </div>
              )}

              {tab === 'orders' && (
                <div>
                  <h3 style={{ marginBottom: '20px' }}>Order History</h3>
                  {userOrders.length === 0 ? (
                    <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
                      <p>No orders yet. <Link to="/menu">Start ordering!</Link></p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {userOrders.map((order) => (
                        <div key={order.id} className="card" style={{ padding: '20px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <strong>{order.id}</strong>
                            <span className={`status-${order.status}`}>{order.status}</span>
                          </div>
                          <p style={{ fontSize: '0.85rem' }}>{formatDate(order.created_at)} • {formatPrice(order.total)}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {tab === 'reservations' && (
                <div>
                  <h3 style={{ marginBottom: '20px' }}>Reservation History</h3>
                  {userReservations.length === 0 ? (
                    <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
                      <p>No reservations yet. <Link to="/reservation">Book a table!</Link></p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {userReservations.map((res) => (
                        <div key={res.id} className="card" style={{ padding: '20px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <strong>{res.id}</strong>
                            <span className={`status-${res.status}`}>{res.status}</span>
                          </div>
                          <p style={{ fontSize: '0.85rem' }}>{res.reservation_date} at {res.reservation_time} • {res.guests} guests • {res.preference}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
