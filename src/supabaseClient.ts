/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient } from '@supabase/supabase-js';

// Mengambil environment variables sesuai dengan standar bawaan Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Memastikan kredensial tersedia, berupa string, dan tidak kosong
const hasSupabaseKeys = typeof supabaseUrl === 'string' && supabaseUrl.trim() !== '' && 
                        typeof supabaseAnonKey === 'string' && supabaseAnonKey.trim() !== '';

// Membuat dan mengekspor instance client Supabase jika keys valid, jika tidak kembalikan null
export const supabase = hasSupabaseKeys 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// Memberikan peringatan di console browser jika aplikasi berjalan tanpa database hosting
if (!hasSupabaseKeys) {
  console.warn(
    "Supabase credentials (VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY) are not set. " +
    "The application is running in elegant premium presentation mode using high-fidelity pre-loaded portfolio data."
  );
}