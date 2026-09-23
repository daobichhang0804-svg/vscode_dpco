import { createClient } from '@supabase/supabase-js';

const rawUrl = (import.meta.env.VITE_SUPABASE_URL || 'https://ybitklruurxnuoyzusdp.supabase.co').trim();
// Sanitize URL: @supabase/supabase-js requires the base project URL (e.g. https://xyz.supabase.co),
// not the PostgREST endpoint (/rest/v1/). Strip any /rest/v1 suffix and trailing slashes.
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_6sWO6mHNShTmsMToa8-5Pw_R1RD65dz').trim();

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


