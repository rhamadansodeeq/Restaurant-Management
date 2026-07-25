import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import supabase from '../lib/supabase';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const data = await supabase.from('orders').select('*');
      // Normalize jsonb items array
      const normalized = (data || []).map((o) => ({
        ...o,
        items: Array.isArray(o.items) ? o.items : JSON.parse(o.items || '[]'),
      }));
      setOrders(normalized);
    } catch (err) {
      console.error('Failed to fetch orders:', err.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const placeOrder = async (orderData) => {
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    const payload = {
      id: orderId,
      customer_id: orderData.userId,
      customer_name: orderData.customerName,
      phone: orderData.phone,
      address: orderData.address,
      items: JSON.stringify(orderData.items),
      subtotal: orderData.subtotal,
      service_charge: orderData.serviceCharge,
      delivery_fee: orderData.deliveryFee,
      total: orderData.total,
      method: orderData.method,
      payment: orderData.payment,
      status: 'pending',
    };
    try {
      const inserted = await supabase.from('orders').insert(payload);
      const newOrder = Array.isArray(inserted) ? inserted[0] : null;
      if (newOrder) {
        newOrder.items = Array.isArray(newOrder.items) ? newOrder.items : JSON.parse(newOrder.items || '[]');
        setOrders((prev) => [newOrder, ...prev]);
        return newOrder;
      }
      // Fallback if representation not returned
      const fallback = { ...orderData, id: orderId, status: 'pending', items: orderData.items };
      setOrders((prev) => [fallback, ...prev]);
      return fallback;
    } catch (err) {
      console.error('Place order failed:', err.message);
      throw err;
    }
  };

  const cancelOrder = async (id) => {
    await supabase.from('orders').update({ status: 'cancelled' }, { filter: supabase.filter.eq('id', id) });
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: 'cancelled' } : o)));
  };

  const updateOrderStatus = async (id, status) => {
    await supabase.from('orders').update({ status }, { filter: supabase.filter.eq('id', id) });
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const getUserOrders = (userId) => orders.filter((o) => o.customer_id === userId || o.customerName === userId);

  return (
    <OrderContext.Provider value={{ orders, loading, fetchOrders, placeOrder, cancelOrder, updateOrderStatus, getUserOrders }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}
