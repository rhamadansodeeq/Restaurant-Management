import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Login() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(form.username, form.password);
    if (result.success) {
      showToast(`Welcome back, ${result.user.name}!`, 'success');
      navigate(result.user.role === 'admin' ? '/admin' : '/');
    } else {
      setError(result.message);
      showToast(result.message, 'error');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="logo-icon">🍽️</div>
          <h3>Savory Bites</h3>
        </div>
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Sign in to your account to continue</p>

        {error && <div className="badge badge-danger" style={{ display: 'block', padding: '10px', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required placeholder="Enter your username" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required placeholder="Enter your password" />
          </div>
          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>Sign In</button>
        </form>

        <div className="auth-link">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </div>
      </div>
    </div>
  );
}
