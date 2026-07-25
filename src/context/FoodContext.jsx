import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import supabase from '../lib/supabase';

const FoodContext = createContext();

export function FoodProvider({ children }) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFoods = useCallback(async () => {
    try {
      setLoading(true);
      const data = await supabase.from('foods').select('*');
      // Normalize jsonb fields (already parsed by PostgREST, but ensure arrays)
      const normalized = (data || []).map((f) => ({
        ...f,
        ingredients: Array.isArray(f.ingredients) ? f.ingredients : JSON.parse(f.ingredients || '[]'),
        gallery: Array.isArray(f.gallery) ? f.gallery : JSON.parse(f.gallery || '[]'),
        nutrition: f.nutrition && typeof f.nutrition === 'object' ? f.nutrition : JSON.parse(f.nutrition || '{}'),
      }));
      setFoods(normalized);
    } catch (err) {
      console.error('Failed to fetch foods:', err.message);
      setFoods([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

  const addFood = async (food) => {
    const payload = {
      id: Date.now(),
      ...food,
      ingredients: JSON.stringify(food.ingredients || []),
      gallery: JSON.stringify(food.gallery || []),
      nutrition: JSON.stringify(food.nutrition || {}),
    };
    const inserted = await supabase.from('foods').insert(payload);
    const newFood = Array.isArray(inserted) ? inserted[0] : null;
    if (newFood) {
      setFoods((prev) => [...prev, {
        ...newFood,
        ingredients: Array.isArray(newFood.ingredients) ? newFood.ingredients : JSON.parse(newFood.ingredients || '[]'),
        gallery: Array.isArray(newFood.gallery) ? newFood.gallery : JSON.parse(newFood.gallery || '[]'),
        nutrition: newFood.nutrition && typeof newFood.nutrition === 'object' ? newFood.nutrition : JSON.parse(newFood.nutrition || '{}'),
      }]);
    }
    return newFood;
  };

  const updateFood = async (id, updates) => {
    const payload = { ...updates };
    if (updates.ingredients) payload.ingredients = JSON.stringify(updates.ingredients);
    if (updates.gallery) payload.gallery = JSON.stringify(updates.gallery);
    if (updates.nutrition) payload.nutrition = JSON.stringify(updates.nutrition);
    const updated = await supabase.from('foods').update(payload, { filter: supabase.filter.eq('id', id) });
    const row = Array.isArray(updated) ? updated[0] : null;
    if (row) setFoods((prev) => prev.map((f) => (f.id === id ? row : f)));
    return row;
  };

  const deleteFood = async (id) => {
    await supabase.from('foods').delete({ filter: supabase.filter.eq('id', id) });
    setFoods((prev) => prev.filter((f) => f.id !== id));
  };

  const getFoodById = (id) => foods.find((f) => f.id === parseInt(id));

  return (
    <FoodContext.Provider value={{ foods, loading, fetchFoods, addFood, updateFood, deleteFood, getFoodById }}>
      {children}
    </FoodContext.Provider>
  );
}

export function useFoods() {
  return useContext(FoodContext);
}
