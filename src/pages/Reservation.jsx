import { useState } from 'react';
import PageHero from '../components/PageHero';
import { useReservations } from '../context/ReservationContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Reservation() {
  const { addReservation } = useReservations();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    customerName: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    date: '',
    time: '',
    guests: '2',
    preference: 'Indoor',
    requests: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const reservation = addReservation(form);
    showToast(`Reservation ${reservation.id} confirmed! We'll see you on ${form.date}.`, 'success');
    setForm({ ...form, date: '', time: '', requests: '' });
  };

  return (
    <div>
      <PageHero title="Table Reservation" subtitle="Book your table for a memorable dining experience" breadcrumb="Reservation" />

      <section className="section-padding reservation-section">
        <div className="container">
          <div className="reservation-form">
            <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Reserve a Table</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Customer Name</label>
                  <input type="text" value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                </div>
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Reservation Date</label>
                  <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Reservation Time</label>
                  <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Number of Guests</label>
                  <select value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })}>
                    {[1,2,3,4,5,6,7,8,9,10].map((n) => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Table Preference</label>
                  <select value={form.preference} onChange={(e) => setForm({ ...form, preference: e.target.value })}>
                    <option value="Indoor">Indoor</option>
                    <option value="Outdoor">Outdoor</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Special Requests</label>
                <textarea value={form.requests} onChange={(e) => setForm({ ...form, requests: e.target.value })} rows="3" placeholder="Any special requests? (birthday, allergies, etc.)" />
              </div>
              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>Confirm Reservation</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
