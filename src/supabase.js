import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key');

export default supabase;