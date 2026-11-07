const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    '[WARN] Supabase URL or Key is missing in environment variables (.env). ' +
    'Database operations will fail until valid credentials are provided.'
  );
}

/**
 * Supabase client instance configured for SerbisYou PostgreSQL tables:
 * - Users (student profiles, roles, contact info)
 * - Services (skill listings, rates, categories)
 * - Service Transactions (orders, status tracking, agreements)
 * - Service Requests (custom client requests/job posts)
 */
const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-key',
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

/**
 * Utility helper to test connection status to Supabase
 */
async function testConnection() {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return { success: false, message: 'Missing SUPABASE_URL or SUPABASE_KEY in .env' };
    }
    // Simple query to verify connection
    const { data, error } = await supabase.from('users').select('id').limit(1);
    if (error && error.code !== 'PGRST116') {
      return { success: false, message: error.message };
    }
    return { success: true, message: 'Connected to Supabase successfully' };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

module.exports = {
  supabase,
  testConnection,
};
