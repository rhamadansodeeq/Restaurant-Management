import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('App crashed:', error, info);
  }

  handleReload = () => window.location.reload();

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', fontFamily: 'system-ui, sans-serif', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ color: '#e63946', marginBottom: '16px' }}>Something went wrong</h1>
          <p style={{ color: '#555', marginBottom: '20px' }}>The app hit an error while rendering.</p>
          <pre style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px', textAlign: 'left', fontSize: '0.85rem', overflow: 'auto', color: '#c1121f', marginBottom: '20px' }}>
            {this.state.error?.message || String(this.state.error)}
          </pre>
          <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '20px' }}>
            Check the browser console (F12) for full details.<br />
            Common fixes: run <code>npm install</code>, ensure your <code>.env</code> file exists with <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code>, and run the <code>supabase/setup.sql</code> in your Supabase SQL Editor.
          </p>
          <button onClick={this.handleReload} style={{ padding: '10px 24px', background: '#e63946', color: 'white', border: 'none', borderRadius: '9999px', cursor: 'pointer', fontWeight: '600' }}>
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
