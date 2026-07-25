export default function SectionHeader({ subtitle, title, description }) {
  return (
    <div className="section-header">
      {subtitle && <div className="subtitle">{subtitle}</div>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
