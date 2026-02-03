import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wnswqdmmavyvmrjekwch.supabase.co';
const supabaseAnonKey = 'sb_publishable_M7JcPj_GsAOMG9uirFMSaQ_5MoaKjeU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);