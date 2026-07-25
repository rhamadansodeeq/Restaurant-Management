import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useFoods } from '../context/FoodContext';
import { fetchCategories, fetchChefs, fetchTestimonials, fetchBlogPosts, fetchGalleryImages } from '../lib/data';
import { stats, whyChooseUs } from '../data/misc';
import SectionHeader from '../components/SectionHeader';
import FoodCard from '../components/FoodCard';
import { useCountUp } from '../hooks/useCountUp';
import { useToast } from '../context/ToastContext';

function StatItem({ stat }) {
  const { count, ref } = useCountUp(stat.value);
  return (
    <div className="stat-item card" ref={ref}>
      <div className="stat-icon">{stat.icon}</div>
      <div className="stat-num">{count}{stat.suffix}</div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
}

export default function Home() {
  const { foods } = useFoods();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');

  const [categories, setCategories] = useState([]);
  const [chefs, setChefs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    Promise.all([
      fetchCategories(),
      fetchChefs(),
      fetchTestimonials(),
      fetchBlogPosts(),
      fetchGalleryImages(),
    ]).then(([c, ch, t, b, g]) => {
      setCategories(c);
      setChefs(ch);
      setTestimonials(t);
      setBlogPosts(b);
      setGalleryImages(g);
    }).catch((err) => console.error('Home data fetch failed:', err.message));
  }, []);

  const featuredFoods = foods.filter((f) => f.featured).slice(0, 4);
  const popularFoods = foods.filter((f) => f.popular).slice(0, 8);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email) {
      showToast('Successfully subscribed to our newsletter!', 'success');
      setEmail('');
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="hero-content animate-fadeInLeft">
          <h1>Welcome to <br />Savory Bites</h1>
          <p>Experience the finest dining with freshly crafted dishes, premium ingredients, and flavors that tell a story. Your table is waiting.</p>
          <div className="hero-buttons">
            <Link to="/menu" className="btn btn-dark btn-lg">Explore Menu</Link>
            <Link to="/reservation" className="btn btn-outline btn-lg" style={{ borderColor: 'white', color: 'white' }}>Book a Table</Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><div className="num">15K+</div><div className="label">Orders Served</div></div>
            <div className="hero-stat"><div className="num">8.5K+</div><div className="label">Happy Customers</div></div>
            <div className="hero-stat"><div className="num">4.9★</div><div className="label">Average Rating</div></div>
          </div>
        </div>
        <div className="hero-image-wrap animate-fadeInRight">
          <img src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg" alt="Delicious food" />
        </div>
      </section>

      {/* About / Intro */}
      <section className="section-padding" style={{ background: 'var(--section-about)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <img src="https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg" alt="Restaurant interior" className="about-img" />
            </div>
            <div>
              <SectionHeader subtitle="About Us" title="A Culinary Journey Like No Other" />
              <p style={{ marginBottom: '20px' }}>
                At Savory Bites, we believe that great food is more than just a meal — it's an experience. Since 2010, we've been serving our community with passion, creativity, and an unwavering commitment to quality. Our chefs combine traditional techniques with modern innovation to create dishes that delight the senses.
              </p>
              <div className="about-feature"><span className="check">✓</span><span>Fresh, locally-sourced ingredients</span></div>
              <div className="about-feature"><span className="check">✓</span><span>Award-winning master chefs</span></div>
              <div className="about-feature"><span className="check">✓</span><span>Cozy and elegant atmosphere</span></div>
              <div className="about-feature"><span className="check">✓</span><span>Fast and reliable delivery service</span></div>
              <Link to="/about" className="btn btn-primary" style={{ marginTop: '20px' }}>Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Meals */}
      <section className="section-padding" style={{ background: 'var(--section-popular)' }}>
        <div className="container">
          <SectionHeader subtitle="Chef's Picks" title="Featured Meals" description="Discover our most beloved dishes, carefully selected by our executive chef." />
          <div className="grid-4">
            {featuredFoods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Dishes */}
      <section className="section-padding" style={{ background: 'var(--section-categories)' }}>
        <div className="container">
          <SectionHeader subtitle="Most Loved" title="Popular Dishes" description="The crowd favorites that keep our customers coming back for more." />
          <div className="grid-4">
            {popularFoods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link to="/menu" className="btn btn-outline">View Full Menu</Link>
          </div>
        </div>
      </section>

      {/* Food Categories */}
      <section className="section-padding" style={{ background: 'var(--section-why)' }}>
        <div className="container">
          <SectionHeader subtitle="Browse by Type" title="Food Categories" description="Explore our diverse menu categories to find exactly what you're craving." />
          <div className="grid-4">
            {categories.map((cat) => (
              <Link key={cat.id} to={`/menu?category=${cat.name}`} className="card category-card">
                <div className="cat-icon">{cat.icon}</div>
                <h4>{cat.name}</h4>
                <p>{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding" style={{ background: 'var(--section-services)' }}>
        <div className="container">
          <SectionHeader subtitle="Why Us" title="Why Choose Savory Bites" description="We go above and beyond to make every dining experience memorable." />
          <div className="grid-3">
            {whyChooseUs.map((item) => (
              <div key={item.id} className="card why-card">
                <div className="why-icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding" style={{ background: 'var(--section-chef)' }}>
        <div className="container">
          <SectionHeader subtitle="Our Numbers" title="Trusted by Thousands" />
          <div className="stats-grid">
            {stats.map((stat) => (
              <StatItem key={stat.id} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Chefs */}
      <section className="section-padding" style={{ background: 'var(--section-testimonials)' }}>
        <div className="container">
          <SectionHeader subtitle="Meet the Team" title="Our Professional Chefs" description="Talented culinary artists who pour their hearts into every dish." />
          <div className="grid-4">
            {chefs.map((chef) => (
              <div key={chef.id} className="card chef-card">
                <img src={chef.image} alt={chef.name} />
                <div className="chef-card-body">
                  <h4>{chef.name}</h4>
                  <div className="role">{chef.role}</div>
                  <p style={{ fontSize: '0.85rem' }}>{chef.bio}</p>
                  <div className="chef-social">
                    <a href={chef.social?.twitter || '#'}>𝕏</a>
                    <a href={chef.social?.instagram || '#'}>📷</a>
                    <a href={chef.social?.facebook || '#'}>📘</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding" style={{ background: 'var(--section-reservation)' }}>
        <div className="container">
          <SectionHeader subtitle="Testimonials" title="What Our Customers Say" description="Real stories from real food lovers who dine with us." />
          <div className="grid-3">
            {testimonials.slice(0, 3).map((t) => (
              <div key={t.id} className="card testimonial-card">
                <div className="quote-icon">❝</div>
                <p className="comment">"{t.comment}"</p>
                <div className="rating" style={{ marginBottom: '12px' }}>
                  {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                </div>
                <div className="testimonial-author">
                  <img src={t.image} alt={t.name} />
                  <div>
                    <div className="name">{t.name}</div>
                    <div className="role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="section-padding" style={{ background: 'var(--section-blog)' }}>
        <div className="container">
          <SectionHeader subtitle="Visual Feast" title="Gallery Preview" description="A glimpse into our world of culinary artistry." />
          <div className="gallery-grid">
            {galleryImages.slice(0, 8).map((img) => (
              <div key={img.id} className="gallery-item">
                <img src={img.image} alt={img.title} />
                <div className="overlay">{img.title}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link to="/gallery" className="btn btn-outline">View Full Gallery</Link>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="section-padding" style={{ background: 'var(--section-contact)' }}>
        <div className="container">
          <SectionHeader subtitle="From Our Blog" title="Latest Articles" description="Tips, recipes, and stories from our kitchen to yours." />
          <div className="grid-3">
            {blogPosts.slice(0, 3).map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="card blog-card">
                <img src={post.image} alt={post.title} />
                <div className="blog-card-body">
                  <div className="blog-meta">
                    <span>📅 {post.post_date}</span>
                    <span>⏱️ {post.read_time}</span>
                  </div>
                  <h4>{post.title}</h4>
                  <p>{post.excerpt}</p>
                  <span className="read-more">Read More →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="section-padding" style={{ background: 'var(--section-about)' }}>
        <div className="container text-center">
          <SectionHeader subtitle="Reserve Your Spot" title="Book a Table" description="Secure your table for an unforgettable dining experience." />
          <Link to="/reservation" className="btn btn-primary btn-lg">Make a Reservation</Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding newsletter-section">
        <div className="container">
          <SectionHeader subtitle="Stay Updated" title="Subscribe to Our Newsletter" />
          <p>Get the latest updates on special offers, new menu items, and exclusive events delivered straight to your inbox.</p>
          <form className="newsletter-form" onSubmit={handleNewsletter}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
