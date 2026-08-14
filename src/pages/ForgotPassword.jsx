import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { validatePassword, validateEmail, validatePhone } from '../utils/validation';

const EyeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
);
const EyeOffIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" y1="2" x2="22" y2="22" /></svg>
);

export default function ForgotPassword() {
  const { requestPasswordReset, verifyResetCode, setNewPassword: resetPassword } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [method, setMethod] = useState('email');
  const [contactValue, setContactValue] = useState('');
  const [code, setCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [customerId, setCustomerId] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pwChecks, setPwChecks] = useState({ length: false, upper: false, number: false, special: false });

  const checkPassword = (pw) => {
    setPwChecks({
      length: pw.length >= 8,
      upper: /^[A-Z]/.test(pw),
      number: /\d/.test(pw),
      special: /[@#$%&!]/.test(pw),
    });
  };

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setError('');
    if (method === 'email' && !validateEmail(contactValue)) {
      setError('Please enter a valid email address');
      return;
    }
    if (method === 'phone' && !validatePhone(contactValue)) {
      setError('Please enter a valid phone number');
      return;
    }
    setLoading(true);
    const result = await requestPasswordReset(method, contactValue);
    setLoading(false);
    if (result.success) {
      setGeneratedCode(result.code);
      setStep(2);
      showToast('Verification code sent!', 'success');
    } else {
      setError(result.message);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError('');
    if (code.length !== 6) {
      setError('Please enter the 6-digit code');
      return;
    }
    setLoading(true);
    const result = await verifyResetCode(contactValue, code);
    setLoading(false);
    if (result.success) {
      setCustomerId(result.customerId);
      setStep(3);
      showToast('Code verified! Set your new password.', 'success');
    } else {
      setError(result.message);
    }
  };

  const handleSetNewPassword = async (e) => {
    e.preventDefault();
    setError('');
    const pwResult = validatePassword(newPassword);
    if (!pwResult.valid) {
      setError(pwResult.errors[0]);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    const result = await resetPassword(customerId, code, newPassword);
    setLoading(false);
    if (result.success) {
      showToast('Password reset successfully! Please log in.', 'success');
      navigate('/login');
    } else {
      setError(result.message);
    }
  };

  const handleResend = async () => {
    setError('');
    setLoading(true);
    const result = await requestPasswordReset(method, contactValue);
    setLoading(false);
    if (result.success) {
      setGeneratedCode(result.code);
      showToast('A new code has been sent!', 'success');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="logo-icon">🍽️</div>
          <h3>Savory Bites</h3>
        </div>

        <div className="reset-progress">
          <div className={`reset-step ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className={`reset-step-line ${step >= 2 ? 'active' : ''}`} />
          <div className={`reset-step ${step >= 2 ? 'active' : ''}`}>2</div>
          <div className={`reset-step-line ${step >= 3 ? 'active' : ''}`} />
          <div className={`reset-step ${step >= 3 ? 'active' : ''}`}>3</div>
        </div>

        {step === 1 && (
          <>
            <h2>Forgot Password</h2>
            <p className="auth-subtitle">Choose how you'd like to reset your password</p>

            {error && <div className="badge badge-danger" style={{ display: 'block', padding: '10px', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}

            <div className="reset-method-toggle">
              <button type="button" className={method === 'email' ? 'active' : ''} onClick={() => { setMethod('email'); setContactValue(''); setError(''); }}>
                ✉️ Email
              </button>
              <button type="button" className={method === 'phone' ? 'active' : ''} onClick={() => { setMethod('phone'); setContactValue(''); setError(''); }}>
                📱 Phone
              </button>
            </div>

            <form onSubmit={handleRequestReset}>
              <div className="form-group">
                <label>{method === 'email' ? 'Email Address' : 'Phone Number'}</label>
                <input
                  type={method === 'email' ? 'email' : 'tel'}
                  value={contactValue}
                  onChange={(e) => setContactValue(e.target.value)}
                  required
                  placeholder={method === 'email' ? 'Enter your email' : 'Enter your phone number'}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Code'}
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Enter Verification Code</h2>
            <p className="auth-subtitle">
              We sent a 6-digit code to<br />
              <strong>{contactValue}</strong>
            </p>

            {generatedCode && (
              <div className="reset-code-display">
                <p className="reset-code-label">Your verification code (demo mode):</p>
                <div className="reset-code-box">{generatedCode}</div>
              </div>
            )}

            {error && <div className="badge badge-danger" style={{ display: 'block', padding: '10px', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}

            <form onSubmit={handleVerifyCode}>
              <div className="form-group">
                <label>6-Digit Code</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  required
                  placeholder="000000"
                  className="reset-code-input"
                  inputMode="numeric"
                  maxLength={6}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Verifying...' : 'Verify Code'}
              </button>
            </form>

            <button type="button" onClick={handleResend} className="reset-resend-btn" disabled={loading}>
              Didn't receive it? Resend code
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h2>Set New Password</h2>
            <p className="auth-subtitle">Create a new password for your account</p>

            {error && <div className="badge badge-danger" style={{ display: 'block', padding: '10px', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}

            <form onSubmit={handleSetNewPassword}>
              <div className="form-group">
                <label>New Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => { setNewPassword(e.target.value); checkPassword(e.target.value); }}
                    required
                    placeholder="••••••••"
                    style={{ paddingRight: '44px' }}
                  />
                  <button type="button" onClick={() => setShowPassword((s) => !s)} aria-label={showPassword ? 'Hide password' : 'Show password'} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px', display: 'flex', alignItems: 'center' }}>
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    style={{ paddingRight: '44px' }}
                  />
                  <button type="button" onClick={() => setShowConfirm((s) => !s)} aria-label={showConfirm ? 'Hide password' : 'Show password'} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px', display: 'flex', alignItems: 'center' }}>
                    {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '20px', padding: '12px 16px', background: 'var(--gray-100)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}>
                <div style={{ fontWeight: '600', marginBottom: '8px' }}>Password Requirements:</div>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <span style={{ color: pwChecks.length ? 'var(--success)' : 'var(--text-muted)' }}>{pwChecks.length ? '✓' : '✗'} 8+ characters</span>
                  <span style={{ color: pwChecks.upper ? 'var(--success)' : 'var(--text-muted)' }}>{pwChecks.upper ? '✓' : '✗'} Starts uppercase</span>
                  <span style={{ color: pwChecks.number ? 'var(--success)' : 'var(--text-muted)' }}>{pwChecks.number ? '✓' : '✗'} Has number</span>
                  <span style={{ color: pwChecks.special ? 'var(--success)' : 'var(--text-muted)' }}>{pwChecks.special ? '✓' : '✗'} Has special char</span>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Saving...' : 'Reset Password'}
              </button>
            </form>
          </>
        )}

        <div className="auth-link">
          Remember your password? <Link to="/login">Sign in here</Link>
        </div>
      </div>
    </div>
  );
}
