import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import supabase from '../lib/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await supabase.from('customers').select('*');
      setUsers(data || []);
    } catch (err) {
      console.error('Failed to fetch customers:', err.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    if (user) localStorage.setItem('currentUser', JSON.stringify(user));
    else localStorage.removeItem('currentUser');
  }, [user]);

  const signup = async (userData) => {
    const newId = Date.now();
    const payload = {
      id: newId,
      name: userData.fullName,
      username: userData.username,
      email: userData.email,
      phone: userData.phone,
      gender: userData.gender,
      address: userData.address,
      password: userData.password,
      role: 'customer',
      orders: 0,
      joined: new Date().toISOString().split('T')[0],
    };
    try {
      const inserted = await supabase.from('customers').insert(payload);
      const newUser = Array.isArray(inserted) ? inserted[0] : null;
      if (newUser) setUsers((prev) => [...prev, newUser]);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const login = async (username, password) => {
    try {
      if (username === 'admin' && password === 'Admin123!') {
        const adminUser = {
          id: 1, name: 'Administrator', username: 'admin',
          email: 'admin@savorybites.com', role: 'admin',
        };
        setUser(adminUser);
        return { success: true, user: adminUser };
      }
      const filterStr = `${supabase.filter.eq('username', username)}&${supabase.filter.eq('password', password)}`;
      const rows = await supabase.from('customers').select('*', { filter: filterStr });
      const found = (rows || [])[0];
      if (found) {
        setUser(found);
        return { success: true, user: found };
      }
      return { success: false, message: 'Invalid username or password' };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const logout = () => setUser(null);

  const requestPasswordReset = async (contactMethod, contactValue) => {
    try {
      const filterStr = supabase.filter.eq(contactMethod, contactValue);
      const rows = await supabase.from('customers').select('id, name, username, email, phone', { filter: filterStr });
      const found = (rows || [])[0];
      if (!found) {
        return { success: false, message: 'No account found with that information' };
      }
      const code = String(Math.floor(100000 + Math.random() * 900000));
      await supabase.from('password_reset_codes').insert({
        customer_id: found.id,
        code,
        contact_method: contactMethod,
        contact_value: contactValue,
        expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
        used: false,
      });
      return { success: true, code };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const verifyResetCode = async (contactValue, code) => {
    try {
      const filterStr = `${supabase.filter.eq('contact_value', contactValue)}&${supabase.filter.eq('code', code)}&${supabase.filter.eq('used', 'false')}`;
      const rows = await supabase.from('password_reset_codes').select('id, customer_id, expires_at', { filter: filterStr });
      const found = (rows || [])[0];
      if (!found) {
        return { success: false, message: 'Invalid verification code' };
      }
      if (new Date() > new Date(found.expires_at)) {
        return { success: false, message: 'This code has expired. Please request a new one.' };
      }
      return { success: true, customerId: found.customer_id };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const setNewPassword = async (customerId, code, newPassword) => {
    try {
      const filterStr = `${supabase.filter.eq('customer_id', customerId)}&${supabase.filter.eq('code', code)}&${supabase.filter.eq('used', 'false')}`;
      const rows = await supabase.from('password_reset_codes').select('id, expires_at', { filter: filterStr });
      const found = (rows || [])[0];
      if (!found) {
        return { success: false, message: 'Invalid or expired reset session' };
      }
      if (new Date() > new Date(found.expires_at)) {
        return { success: false, message: 'This reset session has expired' };
      }
      await supabase.from('customers').update({ password: newPassword }, { filter: supabase.filter.eq('id', customerId) });
      await supabase.from('password_reset_codes').update({ used: true }, { filter: supabase.filter.eq('id', found.id) });
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const updateProfile = async (updates) => {
    if (!user) return;
    try {
      const updated = await supabase
        .from('customers')
        .update(updates, { filter: supabase.filter.eq('id', user.id) });
      const row = Array.isArray(updated) ? updated[0] : null;
      if (row) {
        setUser(row);
        setUsers((prev) => prev.map((u) => (u.id === row.id ? row : u)));
      }
      return row;
    } catch (err) {
      console.error('Update profile failed:', err.message);
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    if (user.password !== oldPassword) {
      return { success: false, message: 'Current password is incorrect' };
    }
    await updateProfile({ password: newPassword });
    return { success: true };
  };

  const deleteUser = async (id) => {
    await supabase.from('customers').delete({ filter: supabase.filter.eq('id', id) });
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const updateUser = async (id, updates) => {
    const updated = await supabase.from('customers').update(updates, { filter: supabase.filter.eq('id', id) });
    const row = Array.isArray(updated) ? updated[0] : null;
    if (row) setUsers((prev) => prev.map((u) => (u.id === id ? row : u)));
    return row;
  };

  return (
    <AuthContext.Provider value={{ user, users, loading, fetchUsers, signup, login, logout, updateProfile, changePassword, deleteUser, updateUser, requestPasswordReset, verifyResetCode, setNewPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
