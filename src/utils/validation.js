// Password validation: 8+ chars, starts uppercase, has number, has special char
export function validatePassword(password) {
  const errors = [];
  if (!password || password.length < 8) errors.push('Password must be at least 8 characters long');
  if (password && !/^[A-Z]/.test(password)) errors.push('Password must start with an uppercase letter');
  if (password && !/\d/.test(password)) errors.push('Password must contain at least one number');
  if (password && !/[@#$%&!]/.test(password)) errors.push('Password must contain at least one special character (@, #, $, %, &, !)');
  return { valid: errors.length === 0, errors };
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone) {
  return /^[0-9+\-\s()]{7,15}$/.test(phone);
}

export function formatPrice(num) {
  return `$${Number(num).toFixed(2)}`;
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function generateOrderId() {
  return `ORD-${Date.now().toString().slice(-6)}`;
}

export function renderStars(rating) {
  const full = Math.floor(rating);
  const empty = 5 - full;
  return '★'.repeat(full) + '☆'.repeat(empty);
}
