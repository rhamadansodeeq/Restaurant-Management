import supabase from './supabase';

// Fetch all the "static" content tables from Supabase.
// These are read-only collections (categories, chefs, blog, etc.)
// that the app loads once on demand.

export async function fetchCategories() {
  const data = await supabase.from('categories').select('*');
  return data || [];
}

export async function fetchChefs() {
  const data = await supabase.from('chefs').select('*');
  return (data || []).map((c) => ({
    ...c,
    social: c.social && typeof c.social === 'object' ? c.social : JSON.parse(c.social || '{}'),
  }));
}

export async function fetchBlogPosts() {
  const data = await supabase.from('blog_posts').select('*');
  return (data || []).map((p) => ({
    ...p,
    tags: Array.isArray(p.tags) ? p.tags : JSON.parse(p.tags || '[]'),
  }));
}

export async function fetchTestimonials() {
  const data = await supabase.from('testimonials').select('*');
  return data || [];
}

export async function fetchServices() {
  const data = await supabase.from('services').select('*');
  return data || [];
}

export async function fetchGalleryImages() {
  const data = await supabase.from('gallery_images').select('*');
  return data || [];
}

export async function fetchFaqs() {
  const data = await supabase.from('faqs').select('*');
  return data || [];
}

export async function fetchFoodReviews(foodId) {
  const data = await supabase
    .from('food_reviews')
    .select('*', { filter: supabase.filter.eq('food_id', foodId) });
  return data || [];
}
