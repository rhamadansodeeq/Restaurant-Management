import { Link } from 'react-router-dom';

export default function PageHero({ title, subtitle, breadcrumb }) {
  return (
    <section className="page-hero">
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
        {breadcrumb && (
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>{breadcrumb}</span>
          </div>
        )}
      </div>
    </section>
  );
}
