import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import supabase from '../lib/supabase';
import { useAuth } from './AuthContext';
import { useFoods } from './FoodContext';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const { foods } = useFoods();
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = useCallback(async () => {
    if (!user) {
      // Fall back to localStorage for guests
      const saved = localStorage.getItem('wishlist');
      setWishlist(saved ? JSON.parse(saved) : []);
      return;
    }
    try {
      const rows = await supabase.from('wishlist_items').select('*', { filter: supabase.filter.eq('customer_id', user.id) });
      // Join with foods to get full food objects
      const items = (rows || []).map((row) => foods.find((f) => f.id === row.food_id)).filter(Boolean);
      setWishlist(items);
    } catch (err) {
      console.error('Failed to fetch wishlist:', err.message);
      setWishlist([]);
    }
  }, [user, foods]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  // Persist guest wishlist to localStorage
  useEffect(() => {
    if (!user) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  const addToWishlist = async (food) => {
    if (user) {
      try {
        await supabase.from('wishlist_items').insert({ customer_id: user.id, food_id: food.id });
      } catch (err) {
        // ignore duplicate errors
      }
    }
    setWishlist((prev) => {
      if (prev.find((item) => item.id === food.id)) return prev;
      return [...prev, food];
    });
  };

  const removeFromWishlist = async (foodOrId) => {
    const id = typeof foodOrId === 'object' ? foodOrId.id : foodOrId;
    if (user) {
      try {
        await supabase.from('wishlist_items').delete({ filter: `${supabase.filter.eq('customer_id', user.id)}&${supabase.filter.eq('food_id', id)}` });
      } catch (err) {
        console.error('Remove wishlist failed:', err.message);
      }
    }
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  const toggleWishlist = (food) => {
    if (isInWishlist(food.id)) removeFromWishlist(food);
    else addToWishlist(food);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist, wishlistCount: wishlist.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
