export const sampleOrders = [
  { id: 'ORD-1001', customerName: 'Jennifer Adams', items: [{ name: 'Margherita Pizza', qty: 2 }], total: 29.98, date: '2024-10-15', address: '123 Main St, Springfield', status: 'delivered', method: 'Home Delivery' },
  { id: 'ORD-1002', customerName: 'Michael Roberts', items: [{ name: 'Ribeye Steak', qty: 1 }], total: 28.99, date: '2024-10-16', address: '456 Oak Ave, Riverside', status: 'preparing', method: 'Home Delivery' },
  { id: 'ORD-1003', customerName: 'Linda Martinez', items: [{ name: 'Classic Beef Burger', qty: 2 }, { name: 'Chocolate Lava Cake', qty: 1 }], total: 35.97, date: '2024-10-16', address: '789 Elm St, Lakeside', status: 'pending', method: 'Pickup' },
  { id: 'ORD-1004', customerName: 'Robert Wilson', items: [{ name: 'Spaghetti Carbonara', qty: 3 }], total: 41.97, date: '2024-10-17', address: '321 Pine Rd, Hill Valley', status: 'pending', method: 'Home Delivery' },
  { id: 'ORD-1005', customerName: 'Patricia Taylor', items: [{ name: 'Grilled Salmon', qty: 2 }], total: 45.98, date: '2024-10-17', address: '654 Maple Dr, Westwood', status: 'delivered', method: 'Home Delivery' },
];

export const sampleReservations = [
  { id: 'RES-501', customerName: 'Jennifer Adams', phone: '555-0101', email: 'jennifer@email.com', date: '2024-10-20', time: '19:00', guests: 4, preference: 'Indoor', requests: 'Window table preferred', status: 'pending' },
  { id: 'RES-502', customerName: 'Michael Roberts', phone: '555-0102', email: 'michael@email.com', date: '2024-10-21', time: '20:00', guests: 2, preference: 'Outdoor', requests: 'Anniversary dinner', status: 'approved' },
  { id: 'RES-503', customerName: 'Linda Martinez', phone: '555-0103', email: 'linda@email.com', date: '2024-10-22', time: '18:30', guests: 6, preference: 'Indoor', requests: 'Birthday celebration', status: 'approved' },
  { id: 'RES-504', customerName: 'Robert Wilson', phone: '555-0104', email: 'robert@email.com', date: '2024-10-23', time: '12:00', guests: 8, preference: 'Indoor', requests: 'Business lunch', status: 'pending' },
];

export const sampleCustomers = [
  { id: 1, name: 'Jennifer Adams', username: 'jadams', email: 'jennifer@email.com', phone: '555-0101', gender: 'Female', address: '123 Main St, Springfield', orders: 12, joined: '2024-01-15' },
  { id: 2, name: 'Michael Roberts', username: 'mroberts', email: 'michael@email.com', phone: '555-0102', gender: 'Male', address: '456 Oak Ave, Riverside', orders: 24, joined: '2024-02-20' },
  { id: 3, name: 'Linda Martinez', username: 'lmartinez', email: 'linda@email.com', phone: '555-0103', gender: 'Female', address: '789 Elm St, Lakeside', orders: 8, joined: '2024-03-10' },
  { id: 4, name: 'Robert Wilson', username: 'rwilson', email: 'robert@email.com', phone: '555-0104', gender: 'Male', address: '321 Pine Rd, Hill Valley', orders: 15, joined: '2024-04-05' },
  { id: 5, name: 'Patricia Taylor', username: 'ptaylor', email: 'patricia@email.com', phone: '555-0105', gender: 'Female', address: '654 Maple Dr, Westwood', orders: 19, joined: '2024-05-12' },
];

export const dailySales = [
  { day: 'Mon', sales: 1200 }, { day: 'Tue', sales: 1500 }, { day: 'Wed', sales: 1800 },
  { day: 'Thu', sales: 1400 }, { day: 'Fri', sales: 2200 }, { day: 'Sat', sales: 2800 }, { day: 'Sun', sales: 2500 },
];

export const monthlySales = [
  { month: 'Jan', sales: 32000 }, { month: 'Feb', sales: 28000 }, { month: 'Mar', sales: 35000 },
  { month: 'Apr', sales: 42000 }, { month: 'May', sales: 38000 }, { month: 'Jun', sales: 45000 },
  { month: 'Jul', sales: 52000 }, { month: 'Aug', sales: 48000 }, { month: 'Sep', sales: 55000 },
  { month: 'Oct', sales: 58000 }, { month: 'Nov', sales: 61000 }, { month: 'Dec', sales: 68000 },
];

export const bestSellingFoods = [
  { name: 'Classic Beef Burger', orders: 312 },
  { name: 'Margherita Pizza', orders: 245 },
  { name: 'Chocolate Lava Cake', orders: 287 },
  { name: 'Ribeye Steak', orders: 234 },
  { name: 'Grilled Salmon', orders: 189 },
];
