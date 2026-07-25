import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { validatePassword, validateEmail, validatePhone } from '../utils/validation';

export default function Signup() {
  const { signup, users } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '', username: '', email: '', phone: '',
    gender: '', address: '', password: '', confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [pwChecks, setPwChecks] = useState({ length: false, upper: false, number: false, special: false });

  const checkPassword = (pw) => {
    setPwChecks({
      length: pw.length >= 8,
      upper: /^[A-Z]/.test(pw),
      number: /\d/.test(pw),
      special: /[@#$%&!]/.test(pw),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === 'password') checkPassword(value);
  };

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = 'Full name is required';
    if (!form.username.trim()) errs.username = 'Username is required';
    else if (users.find((u) => u.username === form.username)) errs.username = 'Username already taken';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!validateEmail(form.email)) errs.email = 'Invalid email format';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    else if (!validatePhone(form.phone)) errs.phone = 'Invalid phone number';
    if (!form.gender) errs.gender = 'Please select gender';
    if (!form.address.trim()) errs.address = 'Address is required';

    const pwResult = validatePassword(form.password);
    if (!pwResult.valid) errs.password = pwResult.errors[0];
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please fix the errors in the form', 'error');
      return;
    }
    const result = await signup(form);
    if (result.success) {
      showToast('Account created successfully! Please log in.', 'success');
      navigate('/login');
    } else {
      showToast(result.message || 'Signup failed. Please try again.', 'error');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card wide">
        <div className="auth-logo">
          <div className="logo-icon">🍽️</div>
          <h3>Savory Bites</h3>
        </div>
        <h2>Create an Account</h2>
        <p className="auth-subtitle">Join our community of food lovers</p>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder="John Doe" />
              {errors.fullName && <div className="error-msg">{errors.fullName}</div>}
            </div>
            <div className="form-group">
              <label>Username</label>
              <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="johndoe" />
              {errors.username && <div className="error-msg">{errors.username}</div>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@email.com" />
              {errors.email && <div className="error-msg">{errors.email}</div>}
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 555 123 4567" />
              {errors.phone && <div className="error-msg">{errors.phone}</div>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange}>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <div className="error-msg">{errors.gender}</div>}
            </div>
            <div className="form-group">
              <label>Residential Address</label>
              <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="123 Main St, City" />
              {errors.address && <div className="error-msg">{errors.address}</div>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" />
              {errors.password && <div className="error-msg">{errors.password}</div>}
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="••••••••" />
              {errors.confirmPassword && <div className="error-msg">{errors.confirmPassword}</div>}
            </div>
          </div>

          {/* Password validation checklist */}
          <div style={{ marginBottom: '20px', padding: '12px 16px', background: 'var(--gray-100)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}>
            <div style={{ fontWeight: '600', marginBottom: '8px' }}>Password Requirements:</div>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <span style={{ color: pwChecks.length ? 'var(--success)' : 'var(--text-muted)' }}>{pwChecks.length ? '✓' : '✗'} 8+ characters</span>
              <span style={{ color: pwChecks.upper ? 'var(--success)' : 'var(--text-muted)' }}>{pwChecks.upper ? '✓' : '✗'} Starts uppercase</span>
              <span style={{ color: pwChecks.number ? 'var(--success)' : 'var(--text-muted)' }}>{pwChecks.number ? '✓' : '✗'} Has number</span>
              <span style={{ color: pwChecks.special ? 'var(--success)' : 'var(--text-muted)' }}>{pwChecks.special ? '✓' : '✗'} Has special char</span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>Create Account</button>
        </form>

        <div className="auth-link">
          Already have an account? <Link to="/login">Sign in here</Link>
        </div>
      </div>
    </div>
  );
}
