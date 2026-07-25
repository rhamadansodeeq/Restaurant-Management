import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import supabase from '../lib/supabase';

const ReservationContext = createContext();

export function ReservationProvider({ children }) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = useCallback(async () => {
    try {
      setLoading(true);
      const data = await supabase.from('reservations').select('*');
      setReservations(data || []);
    } catch (err) {
      console.error('Failed to fetch reservations:', err.message);
      setReservations([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const addReservation = async (data) => {
    const reservationId = `RES-${Date.now().toString().slice(-6)}`;
    const payload = {
      id: reservationId,
      customer_name: data.customerName,
      phone: data.phone,
      email: data.email,
      reservation_date: data.date,
      reservation_time: data.time,
      guests: parseInt(data.guests),
      preference: data.preference,
      requests: data.requests,
      status: 'pending',
    };
    try {
      const inserted = await supabase.from('reservations').insert(payload);
      const newRes = Array.isArray(inserted) ? inserted[0] : null;
      if (newRes) {
        setReservations((prev) => [newRes, ...prev]);
        return newRes;
      }
      const fallback = { ...payload, id: reservationId };
      setReservations((prev) => [fallback, ...prev]);
      return fallback;
    } catch (err) {
      console.error('Add reservation failed:', err.message);
      throw err;
    }
  };

  const updateReservationStatus = async (id, status) => {
    await supabase.from('reservations').update({ status }, { filter: supabase.filter.eq('id', id) });
    setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const updateReservation = async (id, updates) => {
    const updated = await supabase.from('reservations').update(updates, { filter: supabase.filter.eq('id', id) });
    const row = Array.isArray(updated) ? updated[0] : null;
    if (row) setReservations((prev) => prev.map((r) => (r.id === id ? row : r)));
    return row;
  };

  const deleteReservation = async (id) => {
    await supabase.from('reservations').delete({ filter: supabase.filter.eq('id', id) });
    setReservations((prev) => prev.filter((r) => r.id !== id));
  };

  const getUserReservations = (email) => reservations.filter((r) => r.email === email);

  return (
    <ReservationContext.Provider value={{ reservations, loading, fetchReservations, addReservation, updateReservationStatus, updateReservation, deleteReservation, getUserReservations }}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservations() {
  return useContext(ReservationContext);
}
