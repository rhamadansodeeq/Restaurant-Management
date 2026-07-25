import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', textAlign: 'center', padding: '40px',
      background: 'var(--bg-primary)',
    }}>
      <div style={{ fontSize: '8rem', marginBottom: '20px' }}>🍽️</div>
      <h1 style={{ fontSize: '4rem', color: 'var(--primary)', marginBottom: '12px' }}>404</h1>
      <h2 style={{ marginBottom: '12px' }}>Page Not Found</h2>
      <p style={{ marginBottom: '24px', maxWidth: '400px' }}>
        Oops! The page you're looking for seems to have been eaten. Let's get you back to something delicious.
      </p>
      <div style={{ display: 'flex', gap: '12px' }}>
        <Link to="/" className="btn btn-primary">Go Home</Link>
        <Link to="/menu" className="btn btn-outline">Browse Menu</Link>
      </div>
    </div>
  );
}
