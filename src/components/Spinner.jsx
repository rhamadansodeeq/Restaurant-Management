export default function Spinner({ fullPage = false }) {
  const spinner = <div className="spinner" />;
  if (fullPage) return <div className="spinner-overlay">{spinner}</div>;
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px 0' }}>
      {spinner}
    </div>
  );
}
