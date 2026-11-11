import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SpecialItem, EventItem } from '../types';
import { PLACEHOLDER_SPECIALS } from '../data/siteConfig';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;

// Supports Supabase's new Publishable Key (sb_publishable_...) as primary,
// with backward compatibility if VITE_SUPABASE_ANON_KEY is provided.
const supabasePublishableKey =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ||
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined);

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabasePublishableKey &&
    supabaseUrl.startsWith('http') &&
    !supabaseUrl.includes('your-project-ref') &&
    !supabaseUrl.includes('your-project-id') &&
    !supabasePublishableKey.includes('your_key_here')
);

/**
 * Real Supabase Client initialized with the public Publishable Key (`sb_publishable_...`).
 * Row Level Security (RLS) on the database enforces public read-only access
 * and restricts INSERT / UPDATE / DELETE strictly to authenticated administrators.
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabasePublishableKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

export interface FetchSpecialsResult {
  data: SpecialItem[];
  source: 'supabase' | 'placeholder_fallback';
  error: string | null;
}

export async function fetchSpecials(includeInactive = false): Promise<FetchSpecialsResult> {
  if (!supabase) {
    return {
      data: includeInactive
        ? PLACEHOLDER_SPECIALS
        : PLACEHOLDER_SPECIALS.filter((s) => s.is_active),
      source: 'placeholder_fallback',
      error: null,
    };
  }

  let query = supabase
    .from('specials')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (!includeInactive) {
    query = query.eq('is_active', true);
  }

  const { data, error } = await query;

  if (error) {
    return {
      data: includeInactive
        ? PLACEHOLDER_SPECIALS
        : PLACEHOLDER_SPECIALS.filter((s) => s.is_active),
      source: 'placeholder_fallback',
      error: error.message,
    };
  }

  // If the database table is completely empty and public visitor is viewing, show clearly labeled placeholders
  if (!data || (data.length === 0 && !includeInactive)) {
    return {
      data: PLACEHOLDER_SPECIALS.filter((s) => s.is_active),
      source: 'placeholder_fallback',
      error: null,
    };
  }

  return {
    data: data as SpecialItem[],
    source: 'supabase',
    error: null,
  };
}

export interface FetchEventsResult {
  data: EventItem[];
  source: 'supabase' | 'unconfigured';
  error: string | null;
}

export async function fetchEvents(includeUnpublished = false): Promise<FetchEventsResult> {
  if (!supabase) {
    return {
      data: [],
      source: 'unconfigured',
      error: null,
    };
  }

  let query = supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: true })
    .order('start_time', { ascending: true });

  if (!includeUnpublished) {
    query = query.eq('is_published', true);
  }

  const { data, error } = await query;

  if (error) {
    return {
      data: [],
      source: 'supabase',
      error: error.message,
    };
  }

  return {
    data: (data ?? []) as EventItem[],
    source: 'supabase',
    error: null,
  };
}

/**
 * Upload an event image to the `site-media` Supabase Storage bucket.
 * Requires an authenticated administrator session via Supabase Storage RLS policies.
 */
export async function uploadEventImage(file: File): Promise<{ url: string | null; error: string | null }> {
  if (!supabase) {
    return {
      url: null,
      error:
        'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in your environment.',
    };
  }

  const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const safeName = `events/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('site-media')
    .upload(safeName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    return { url: null, error: uploadError.message };
  }

  const { data } = supabase.storage.from('site-media').getPublicUrl(safeName);
  return { url: data.publicUrl, error: null };
}
