import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import SearchBar from '../components/SearchBar';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/menu', label: 'Food Menu' },
    { to: '/categories', label: 'Categories' },
    { to: '/services', label: 'Services' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <nav className="navbar" style={{ boxShadow: scrolled ? 'var(--shadow-md)' : 'var(--shadow-sm)' }}>
        <div className="navbar-inner">
          <Link to="/" className="nav-logo">
            <span className="logo-icon">🍽️</span>
            <span>Savory Bites</span>
          </Link>

          <div className="nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={location.pathname === link.to ? 'active' : ''}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="nav-right">
            <SearchBar />
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <Link to="/wishlist" className="nav-icon-btn" aria-label="Wishlist">
              ❤️
              {wishlistCount > 0 && <span className="badge-count">{wishlistCount}</span>}
            </Link>
            <Link to="/cart" className="nav-icon-btn" aria-label="Cart">
              🛒
              {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
            </Link>
            {user ? (
              <div style={{ position: 'relative' }}>
                <button className="nav-icon-btn" onClick={() => setProfileOpen(!profileOpen)} aria-label="Profile">
                  👤
                </button>
                {profileOpen && (
                  <div style={{
                    position: 'absolute', top: '100%', right: 0, marginTop: '8px',
                    background: 'var(--card-bg)', borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-lg)', minWidth: '160px', zIndex: 1001,
                    overflow: 'hidden',
                  }}>
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-color)' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{user.email}</div>
                    </div>
                    {user.role === 'admin' ? (
                      <Link to="/admin" style={{ display: 'block', padding: '10px 16px', fontSize: '0.9rem' }}>Admin Dashboard</Link>
                    ) : (
                      <Link to="/profile" style={{ display: 'block', padding: '10px 16px', fontSize: '0.9rem' }}>My Profile</Link>
                    )}
                    <Link to="/orders" style={{ display: 'block', padding: '10px 16px', fontSize: '0.9rem' }}>Order History</Link>
                    <Link to="/reservation" style={{ display: 'block', padding: '10px 16px', fontSize: '0.9rem' }}>Reservations</Link>
                    <button onClick={handleLogout} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px', fontSize: '0.9rem', background: 'none', color: 'var(--error)' }}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="nav-icon-btn" aria-label="Login">👤</Link>
            )}
            <Link to="/reservation" className="btn btn-primary btn-sm">Book a Table</Link>
            <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>☰</button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mobile-menu open" style={{ position: 'fixed', top: '72px', left: 0, right: 0, zIndex: 999 }}>
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className={location.pathname === link.to ? 'active' : ''}>
              {link.label}
            </Link>
          ))}
          <Link to="/wishlist">❤️ Wishlist</Link>
          <Link to="/cart">🛒 Cart</Link>
          {user ? (
            <>
              {user.role === 'admin' ? <Link to="/admin">Admin Dashboard</Link> : <Link to="/profile">My Profile</Link>}
              <Link to="/orders">Order History</Link>
              <Link to="/reservation">Book a Table</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </>
  );
}
