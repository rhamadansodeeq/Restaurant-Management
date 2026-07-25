// ============================================================
// Supabase fetch-based client (no library needed)
// ============================================================
// Just add your Supabase URL and anon key to the .env file:
//   VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
//   VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
// ============================================================

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const REST_URL = `${SUPABASE_URL}/rest/v1`;

function headers(extra = {}) {
  return {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    ...extra,
  };
}

// Build a PostgREST query string from a params object
function buildQuery(params = {}) {
  const parts = [];
  if (params.select) parts.push(`select=${encodeURIComponent(params.select)}`);
  if (params.filter) parts.push(params.filter); // already encoded like "id=eq.1"
  if (params.order) parts.push(`order=${encodeURIComponent(params.order)}`);
  if (params.limit) parts.push(`limit=${params.limit}`);
  if (params.offset) parts.push(`offset=${params.offset}`);
  return parts.length ? `?${parts.join('&')}` : '';
}

// Generic REST request
async function request(table, method, body, params = {}) {
  const url = `${REST_URL}/${table}${buildQuery(params)}`;
  const opts = { method, headers: headers() };
  if (body) opts.body = JSON.stringify(body);

  // Prefer: return=representation so we get the inserted/updated rows back
  if (method === 'POST' || method === 'PATCH' || method === 'PUT') {
    opts.headers['Prefer'] = 'return=representation';
  }

  const res = await fetch(url, opts);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase ${method} ${table} failed: ${res.status} ${text}`);
  }
  // DELETE with no Prefer may return empty body
  if (res.status === 204) return [];
  return res.json();
}

// Filter helpers (PostgREST operators)
const filter = {
  eq: (col, val) => `${col}=eq.${encodeURIComponent(val)}`,
  neq: (col, val) => `${col}=neq.${encodeURIComponent(val)}`,
  gt: (col, val) => `${col}=gt.${encodeURIComponent(val)}`,
  lt: (col, val) => `${col}=lt.${encodeURIComponent(val)}`,
  gte: (col, val) => `${col}=gte.${encodeURIComponent(val)}`,
  lte: (col, val) => `${col}=lte.${encodeURIComponent(val)}`,
  like: (col, val) => `${col}=like.${encodeURIComponent(val)}`,
  ilike: (col, val) => `${col}=ilike.${encodeURIComponent(val)}`,
  in: (col, vals) => `${col}=in.(${encodeURIComponent(vals.join(','))})`,
};

export const supabase = {
  // SELECT
  from: (table) => ({
    select: (columns = '*', params = {}) => request(table, 'GET', null, { ...params, select: columns }),
    insert: (row) => request(table, 'POST', row),
    update: (row, params = {}) => request(table, 'PATCH', row, params),
    delete: (params = {}) => request(table, 'DELETE', null, params),
  }),

  // RPC (call a stored function)
  rpc: async (fn, args = {}) => {
    const url = `${REST_URL}/rpc/${fn}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(args),
    });
    if (!res.ok) {
      throw new Error(`RPC ${fn} failed: ${res.status} ${await res.text()}`);
    }
    return res.json();
  },

  filter,
  url: SUPABASE_URL,
  anonKey: SUPABASE_ANON_KEY,
};

export default supabase;
