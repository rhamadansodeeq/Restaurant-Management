import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { fetchBlogPosts } from '../lib/data';

export default function Blog() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchBlogPosts().then(setPosts).catch((err) => console.error(err.message));
  }, []);

  const post = id ? posts.find((p) => p.id === parseInt(id)) : null;

  if (post) {
    return (
      <div style={{ paddingTop: '72px' }}>
        <article style={{ background: 'var(--section-blog)' }} className="section-padding">
          <div className="container" style={{ maxWidth: '800px' }}>
            <Link to="/blog" style={{ color: 'var(--primary)', marginBottom: '16px', display: 'inline-block' }}>← Back to Blog</Link>
            <img src={post.image} alt={post.title} style={{ width: '100%', borderRadius: 'var(--radius-xl)', marginBottom: '24px' }} />
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span className="badge badge-primary">{post.category}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>📅 {post.post_date}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>⏱️ {post.read_time}</span>
            </div>
            <h1 style={{ marginBottom: '16px' }}>{post.title}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <img src={post.author_image} alt={post.author} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <div style={{ fontWeight: '600' }}>{post.author}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Author</div>
              </div>
            </div>
            <p style={{ fontSize: '1.05rem', marginBottom: '20px' }}>{post.excerpt}</p>
            <p style={{ fontSize: '1rem', lineHeight: 1.8 }}>{post.content}</p>
            <div style={{ marginTop: '24px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {post.tags.map((tag, i) => (
                <span key={i} className="badge badge-info">#{tag}</span>
              ))}
            </div>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div>
      <PageHero title="Our Blog" subtitle="Tips, recipes, and stories from our kitchen" breadcrumb="Blog" />

      <section className="section-padding" style={{ background: 'var(--section-blog)' }}>
        <div className="container">
          <div className="grid-3">
            {posts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="card blog-card">
                <img src={post.image} alt={post.title} />
                <div className="blog-card-body">
                  <div className="blog-meta">
                    <span>📅 {post.post_date}</span>
                    <span>⏱️ {post.read_time}</span>
                  </div>
                  <span className="badge badge-primary" style={{ marginBottom: '8px' }}>{post.category}</span>
                  <h4>{post.title}</h4>
                  <p>{post.excerpt}</p>
                  <span className="read-more">Read More →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
