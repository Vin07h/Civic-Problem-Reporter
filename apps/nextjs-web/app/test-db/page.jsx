'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function TestDbPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- DEBUGGING CODE START ---
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log("Supabase URL:", supabaseUrl);
  console.log("Supabase Key:", supabaseAnonKey);

  if (!supabaseUrl || !supabaseAnonKey) {
    const missingVarsError = "Error: Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY from .env.local file. The app cannot connect to the database.";
    console.error(missingVarsError);
    return (
        <div style={{ padding: '40px', fontFamily: 'sans-serif', color: 'red' }}>
            <h1>Configuration Error</h1>
            <p>{missingVarsError}</p>
            <p>Please ensure the `.env.local` file exists in `Samadhan/apps/nextjs-web/` and contains the correct keys.</p>
        </div>
    );
  }
  // --- DEBUGGING CODE END ---

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('Users').select('*');
      if (error) setError(error.message);
      else setData(data);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Supabase Connection Test</h1>
      {loading ? (
        <p>Connecting...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>Connection Error: {error}</p>
      ) : (
        <div>
          <p style={{ color: 'green' }}>✅ Connection Successful!</p>
          <p>Found {data.length} user(s).</p>
        </div>
      )}
    </div>
  );
}