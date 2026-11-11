import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import {
  Lock,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Calendar,
  LayoutDashboard,
  Star,
  Eye,
  EyeOff,
  Upload,
  X,
  ArrowLeft,
  Database,
  ShieldCheck,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import {
  supabase,
  isSupabaseConfigured,
  uploadEventImage,
} from '../lib/supabase';
import { SpecialItem, EventItem, DayOfWeek, SpecialCategory } from '../types';
import { SITE_CONFIG } from '../data/siteConfig';

type AdminTab = 'overview' | 'specials' | 'events';

const DAYS_OF_WEEK: DayOfWeek[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
  'Everyday',
  'Weekdays',
  'Weekends',
];

const SPECIAL_CATEGORIES: SpecialCategory[] = ['Food & Drink', 'Food', 'Drink'];

const PRESET_EVENT_IMAGES = [
  {
    label: 'Watch Party / Game Day',
    url: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=900&q=80',
  },
  {
    label: 'Outdoor Patio Gathering',
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80',
  },
  {
    label: 'Bar & Cold Drafts',
    url: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=900&q=80',
  },
  {
    label: 'Neighborhood Crowd',
    url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=80',
  },
];

export const AdminPage: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Login Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Notifications
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // Database Records
  const [specials, setSpecials] = useState<SpecialItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  // Special Form Modal State
  const [editingSpecial, setEditingSpecial] = useState<Partial<SpecialItem> | null>(null);
  const [savingSpecial, setSavingSpecial] = useState(false);

  // Event Form Modal State
  const [editingEvent, setEditingEvent] = useState<Partial<EventItem> | null>(null);
  const [savingEvent, setSavingEvent] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Delete Confirmation Modal State
  const [deleteTarget, setDeleteTarget] = useState<{
    type: 'special' | 'event';
    id: string;
    title: string;
  } | null>(null);
  const [deleting, setDeleting] = useState(false);

  const showToast = useCallback((type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification((prev) => (prev?.message === message ? null : prev));
    }, 5000);
  }, []);

  // Check Supabase Auth Session
  useEffect(() => {
    if (!supabase) {
      setAuthChecking(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthChecking(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadAdminData = useCallback(async () => {
    if (!supabase || !session) return;
    setDataLoading(true);

    const [specRes, evtRes] = await Promise.all([
      supabase
        .from('specials')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: true }),
      supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true })
        .order('start_time', { ascending: true }),
    ]);

    if (specRes.error) {
      showToast('error', `Failed to load specials: ${specRes.error.message}`);
    } else {
      setSpecials((specRes.data ?? []) as SpecialItem[]);
    }

    if (evtRes.error) {
      showToast('error', `Failed to load events: ${evtRes.error.message}`);
    } else {
      setEvents((evtRes.data ?? []) as EventItem[]);
    }

    setDataLoading(false);
  }, [session, showToast]);

  useEffect(() => {
    if (session) {
      loadAdminData();
    }
  }, [session, loadAdminData]);

  // Handle Administrator Sign In
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      showToast(
        'error',
        'Supabase environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY) are not configured yet.'
      );
      return;
    }

    setLoginLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoginLoading(false);

    if (error) {
      showToast('error', error.message);
    } else {
      showToast('success', 'Signed in to Kirkwood Ice & Fuel Owner Admin.');
      setPassword('');
    }
  };

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    showToast('success', 'Signed out securely.');
  };

  // ============================================================================
  // SPECIALS CRUD OPERATIONS
  // ============================================================================
  const openNewSpecialForm = () => {
    setEditingSpecial({
      day_of_week: 'Monday',
      title: '',
      description: '',
      price: '',
      details: '',
      category: 'Food & Drink',
      is_active: true,
      is_featured: false,
      display_order: specials.length + 1,
    });
  };

  const handleSaveSpecial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase || !editingSpecial) return;
    if (!editingSpecial.title?.trim()) {
      showToast('error', 'Please enter a title for the special.');
      return;
    }

    setSavingSpecial(true);
    const payload = {
      day_of_week: editingSpecial.day_of_week || 'Monday',
      title: editingSpecial.title.trim(),
      description: editingSpecial.description?.trim() || '',
      price: editingSpecial.price?.trim() || null,
      details: editingSpecial.details?.trim() || null,
      category: editingSpecial.category || 'Food & Drink',
      is_active: Boolean(editingSpecial.is_active),
      is_featured: Boolean(editingSpecial.is_featured),
      is_placeholder: false,
      display_order: Number(editingSpecial.display_order) || 1,
    };

    const { error } = editingSpecial.id
      ? await supabase.from('specials').update(payload).eq('id', editingSpecial.id)
      : await supabase.from('specials').insert([payload]);

    setSavingSpecial(false);

    if (error) {
      showToast('error', `Could not save special: ${error.message}`);
    } else {
      showToast(
        'success',
        editingSpecial.id ? 'Special updated successfully.' : 'New special created!'
      );
      setEditingSpecial(null);
      loadAdminData();
    }
  };

  const handleToggleSpecialStatus = async (special: SpecialItem, field: 'is_active' | 'is_featured') => {
    if (!supabase) return;
    const { error } = await supabase
      .from('specials')
      .update({ [field]: !special[field] })
      .eq('id', special.id);

    if (error) {
      showToast('error', `Update failed: ${error.message}`);
    } else {
      showToast('success', `Updated "${special.title}".`);
      loadAdminData();
    }
  };

  // ============================================================================
  // EVENTS CRUD OPERATIONS
  // ============================================================================
  const openNewEventForm = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    setEditingEvent({
      title: '',
      event_date: todayStr,
      start_time: '7:00 PM',
      end_time: '',
      description: '',
      category: 'Watch Party',
      image_url: '',
      external_link: '',
      additional_details: '',
      is_published: true,
      is_featured: false,
    });
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase || !editingEvent) return;
    if (!editingEvent.title?.trim() || !editingEvent.event_date || !editingEvent.start_time) {
      showToast('error', 'Please fill in the event title, date, and start time.');
      return;
    }

    setSavingEvent(true);
    const payload = {
      title: editingEvent.title.trim(),
      event_date: editingEvent.event_date,
      start_time: editingEvent.start_time.trim(),
      end_time: editingEvent.end_time?.trim() || null,
      description: editingEvent.description?.trim() || '',
      category: editingEvent.category?.trim() || 'Watch Party',
      image_url: editingEvent.image_url?.trim() || null,
      external_link: editingEvent.external_link?.trim() || null,
      additional_details: editingEvent.additional_details?.trim() || null,
      is_published: Boolean(editingEvent.is_published),
      is_featured: Boolean(editingEvent.is_featured),
      is_placeholder: false,
    };

    const { error } = editingEvent.id
      ? await supabase.from('events').update(payload).eq('id', editingEvent.id)
      : await supabase.from('events').insert([payload]);

    setSavingEvent(false);

    if (error) {
      showToast('error', `Could not save event: ${error.message}`);
    } else {
      showToast(
        'success',
        editingEvent.id ? 'Event updated successfully.' : 'New event published!'
      );
      setEditingEvent(null);
      loadAdminData();
    }
  };

  const handleToggleEventStatus = async (evt: EventItem, field: 'is_published' | 'is_featured') => {
    if (!supabase) return;
    const { error } = await supabase
      .from('events')
      .update({ [field]: !evt[field] })
      .eq('id', evt.id);

    if (error) {
      showToast('error', `Update failed: ${error.message}`);
    } else {
      showToast('success', `Updated "${evt.title}".`);
      loadAdminData();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingEvent) return;
    setUploadingImage(true);
    const { url, error } = await uploadEventImage(file);
    setUploadingImage(false);

    if (error || !url) {
      showToast('error', error || 'Image upload failed.');
    } else {
      setEditingEvent({ ...editingEvent, image_url: url });
      showToast('success', 'Event image uploaded to Supabase Storage!');
    }
  };

  // ============================================================================
  // CONFIRMED DELETION HANDLER
  // ============================================================================
  const handleConfirmDelete = async () => {
    if (!supabase || !deleteTarget) return;
    setDeleting(true);

    const table = deleteTarget.type === 'special' ? 'specials' : 'events';
    const { error } = await supabase.from(table).delete().eq('id', deleteTarget.id);

    setDeleting(false);

    if (error) {
      showToast('error', `Delete failed: ${error.message}`);
    } else {
      showToast('success', `Deleted "${deleteTarget.title}".`);
      setDeleteTarget(null);
      loadAdminData();
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const activeSpecialsCount = specials.filter((s) => s.is_active).length;
  const upcomingEventsCount = events.filter(
    (e) => e.is_published && e.event_date >= todayStr
  ).length;

  return (
    <>
      <SEO
        title="Owner Admin Dashboard"
        description="Restricted owner administration portal for Kirkwood Ice & Fuel."
        canonicalPath="/admin"
        noIndex={true}
      />

      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-[110] max-w-md w-full px-4">
          <div
            role="status"
            className={`p-4 rounded-xl shadow-2xl border flex items-start justify-between gap-3 ${
              notification.type === 'success'
                ? 'bg-charcoal-900 border-amber-400 text-cream-50'
                : 'bg-brick-800 border-brick-500 text-cream-50'
            }`}
          >
            <div className="flex items-start gap-2.5 text-sm font-medium">
              {notification.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              )}
              <span>{notification.message}</span>
            </div>
            <button
              type="button"
              onClick={() => setNotification(null)}
              className="text-cream-300 hover:text-cream-50"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <section className="py-10 sm:py-14 bg-charcoal-950 min-h-[80vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal-800">
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-wider text-amber-400 hover:text-amber-300 mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Public Website</span>
              </Link>
              <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase text-cream-50 flex items-center gap-3">
                <Lock className="w-7 h-7 text-brick-500" />
                <span>{SITE_CONFIG.name} — Owner Admin</span>
              </h1>
            </div>

            {session && (
              <div className="flex items-center gap-3">
                <span className="text-xs text-cream-300 bg-charcoal-900 border border-charcoal-800 px-3 py-2 rounded-lg">
                  Signed in as <strong className="text-cream-50">{session.user.email}</strong>
                </span>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-charcoal-800 hover:bg-brick-600 text-cream-100 text-xs font-display uppercase tracking-wider font-bold transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>

          {/* Auth Checking State */}
          {authChecking ? (
            <div className="p-12 text-center text-cream-300">
              Checking administrator session...
            </div>
          ) : !session ? (
            /* ============================================================================
               UNAUTHENTICATED VIEW: SECURE SUPABASE LOGIN & SETUP DOCUMENTATION
               ============================================================================ */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Login Card */}
              <div className="lg:col-span-5 bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-widest text-amber-400 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Authorized Personnel Only</span>
                  </span>
                  <h2 className="font-display text-2xl font-bold uppercase text-cream-50">
                    Administrator Sign In
                  </h2>
                  <p className="text-sm text-cream-300">
                    Sign in with your Supabase administrator account to add, edit, or remove weekly
                    specials and upcoming events.
                  </p>
                </div>

                {!isSupabaseConfigured && (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/40 text-xs text-cream-200 space-y-1.5">
                    <p className="font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Database className="w-4 h-4" />
                      <span>Supabase Environment Variables Not Detected</span>
                    </p>
                    <p className="leading-relaxed">
                      To protect data integrity, this dashboard never fakes mutations in local
                      storage. Connect your Supabase project using the instructions on the right to
                      enable live authentication and database editing.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <label
                      htmlFor="admin-email"
                      className="block text-xs font-display uppercase tracking-wider text-cream-200 font-bold mb-1.5"
                    >
                      Admin Email Address
                    </label>
                    <input
                      id="admin-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="owner@kirkwoodiceandfuel.com"
                      className="w-full px-4 py-3 rounded-xl bg-charcoal-950 border border-charcoal-700 text-cream-50 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="admin-password"
                      className="block text-xs font-display uppercase tracking-wider text-cream-200 font-bold mb-1.5"
                    >
                      Password
                    </label>
                    <input
                      id="admin-password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-4 py-3 rounded-xl bg-charcoal-950 border border-charcoal-700 text-cream-50 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full py-3.5 px-6 rounded-xl bg-brick-600 hover:bg-brick-500 disabled:opacity-50 text-cream-50 font-display uppercase tracking-wider text-base font-bold shadow-lg transition-all min-h-[48px]"
                  >
                    {loginLoading ? 'Signing In...' : 'Sign In to Dashboard'}
                  </button>
                </form>
              </div>

              {/* Setup & Security Architecture Overview */}
              <div className="lg:col-span-7 bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 sm:p-8 space-y-6">
                <div>
                  <span className="text-xs font-display uppercase tracking-widest text-amber-400 font-bold">
                    Production Backend &amp; RLS Security
                  </span>
                  <h2 className="font-display text-2xl font-bold uppercase text-cream-50 mt-1">
                    How Owner Content Management Works
                  </h2>
                  <p className="text-sm text-cream-300 mt-1">
                    This website uses <strong>Supabase PostgreSQL</strong>,{' '}
                    <strong>Supabase Auth</strong>, and <strong>Row Level Security (RLS)</strong> so
                    visitors can browse specials and events while only authenticated administrators
                    can create, update, or delete records.
                  </p>
                </div>

                <ol className="space-y-4 text-sm text-cream-200 list-decimal list-inside">
                  <li className="bg-charcoal-950 p-4 rounded-xl border border-charcoal-800">
                    <strong className="text-cream-50">Run the SQL Migration:</strong> Open your
                    Supabase SQL Editor and run{' '}
                    <code className="text-amber-400">
                      supabase/migrations/001_initial_schema.sql
                    </code>{' '}
                    to create the <code className="text-amber-400">specials</code>,{' '}
                    <code className="text-amber-400">events</code>, and{' '}
                    <code className="text-amber-400">admin_profiles</code> tables, RLS policies, and
                    the <code className="text-amber-400">site-media</code> Storage bucket.
                  </li>
                  <li className="bg-charcoal-950 p-4 rounded-xl border border-charcoal-800">
                    <strong className="text-cream-50">Create an Owner Account:</strong> In Supabase
                    Dashboard &rarr; Authentication &rarr; Users, click{' '}
                    <em>Add User &rarr; Create New User</em> with the owner's email and password.
                  </li>
                  <li className="bg-charcoal-950 p-4 rounded-xl border border-charcoal-800">
                    <strong className="text-cream-50">Set Public Environment Variables:</strong> Add{' '}
                    <code className="text-amber-400">VITE_SUPABASE_URL</code> (found via the top{' '}
                    <em>Connect</em> button or <em>Project Settings &rarr; Data API</em>) and{' '}
                    <code className="text-amber-400">VITE_SUPABASE_PUBLISHABLE_KEY</code> (your{' '}
                    <code className="text-amber-400">sb_publishable_...</code> key from{' '}
                    <em>Project Settings &rarr; API Keys</em>) to your{' '}
                    <code className="text-amber-400">.env</code> file or Cloudflare Pages settings.
                    Never expose a Secret Key (<code className="text-amber-400">sb_secret_...</code>
                    ) in client code.
                  </li>
                </ol>
              </div>
            </div>
          ) : (
            /* ============================================================================
               AUTHENTICATED OWNER DASHBOARD
               ============================================================================ */
            <div className="space-y-8">
              {/* Navigation Tabs */}
              <div className="flex flex-wrap items-center gap-2 border-b border-charcoal-800 pb-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-display uppercase tracking-wider text-sm font-bold transition-all ${
                    activeTab === 'overview'
                      ? 'bg-brick-600 text-cream-50 shadow-md'
                      : 'bg-charcoal-900 text-cream-200 hover:bg-charcoal-800 border border-charcoal-800'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard Overview</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('specials')}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-display uppercase tracking-wider text-sm font-bold transition-all ${
                    activeTab === 'specials'
                      ? 'bg-brick-600 text-cream-50 shadow-md'
                      : 'bg-charcoal-900 text-cream-200 hover:bg-charcoal-800 border border-charcoal-800'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Manage Specials ({specials.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('events')}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-display uppercase tracking-wider text-sm font-bold transition-all ${
                    activeTab === 'events'
                      ? 'bg-brick-600 text-cream-50 shadow-md'
                      : 'bg-charcoal-900 text-cream-200 hover:bg-charcoal-800 border border-charcoal-800'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Manage Events ({events.length})</span>
                </button>
              </div>

              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6">
                      <span className="text-xs font-display uppercase tracking-wider text-amber-400 font-bold">
                        Active Weekly Specials
                      </span>
                      <p className="font-display text-4xl font-bold text-cream-50 mt-2">
                        {activeSpecialsCount}
                      </p>
                      <p className="text-xs text-cream-300 mt-1">
                        {specials.length} total configured specials
                      </p>
                    </div>

                    <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6">
                      <span className="text-xs font-display uppercase tracking-wider text-amber-400 font-bold">
                        Upcoming Published Events
                      </span>
                      <p className="font-display text-4xl font-bold text-cream-50 mt-2">
                        {upcomingEventsCount}
                      </p>
                      <p className="text-xs text-cream-300 mt-1">
                        {events.length} total events in database
                      </p>
                    </div>

                    <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-display uppercase tracking-wider text-amber-400 font-bold">
                          Quick Action
                        </span>
                        <h3 className="font-display text-xl uppercase font-bold text-cream-50 mt-1">
                          Weekly Specials
                        </h3>
                      </div>
                      <div className="pt-4 flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab('specials');
                            openNewSpecialForm();
                          }}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-brick-600 hover:bg-brick-500 text-cream-50 font-display uppercase text-xs font-bold py-2.5 px-3 rounded-lg"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Special</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveTab('specials')}
                          className="inline-flex items-center justify-center bg-charcoal-800 hover:bg-charcoal-700 text-cream-100 font-display uppercase text-xs font-bold py-2.5 px-3 rounded-lg"
                        >
                          View All
                        </button>
                      </div>
                    </div>

                    <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-display uppercase tracking-wider text-amber-400 font-bold">
                          Quick Action
                        </span>
                        <h3 className="font-display text-xl uppercase font-bold text-cream-50 mt-1">
                          Bar Events
                        </h3>
                      </div>
                      <div className="pt-4 flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab('events');
                            openNewEventForm();
                          }}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-brick-600 hover:bg-brick-500 text-cream-50 font-display uppercase text-xs font-bold py-2.5 px-3 rounded-lg"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Event</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveTab('events')}
                          className="inline-flex items-center justify-center bg-charcoal-800 hover:bg-charcoal-700 text-cream-100 font-display uppercase text-xs font-bold py-2.5 px-3 rounded-lg"
                        >
                          View All
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: MANAGE SPECIALS */}
              {activeTab === 'specials' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="font-display text-2xl font-bold uppercase text-cream-50">
                        Manage Recurring Specials
                      </h2>
                      <p className="text-sm text-cream-300">
                        Add, edit, reorder, enable/disable, or mark specials as featured on the
                        Homepage and Specials page.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={openNewSpecialForm}
                      className="inline-flex items-center gap-2 bg-brick-600 hover:bg-brick-500 text-cream-50 font-display uppercase tracking-wider text-sm font-bold px-5 py-3 rounded-xl shadow-md self-start sm:self-auto"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Special</span>
                    </button>
                  </div>

                  {dataLoading ? (
                    <div className="p-8 text-center text-cream-300">Loading specials...</div>
                  ) : specials.length === 0 ? (
                    <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-10 text-center space-y-3">
                      <p className="font-display text-xl uppercase text-cream-50">
                        No Specials in Database Yet
                      </p>
                      <p className="text-sm text-cream-300">
                        Click "Add New Special" above to create your first recurring food or drink
                        special.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {specials.map((spec) => (
                        <div
                          key={spec.id}
                          className={`bg-charcoal-900 border rounded-2xl p-5 flex flex-col justify-between gap-4 ${
                            spec.is_active ? 'border-charcoal-800' : 'border-charcoal-800 opacity-60'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                              <div className="flex items-center gap-2">
                                <span className="px-2.5 py-0.5 rounded bg-brick-600 text-cream-50 font-display uppercase text-xs font-bold">
                                  {spec.day_of_week}
                                </span>
                                <span className="text-xs text-cream-300">
                                  Order #{spec.display_order}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleToggleSpecialStatus(spec, 'is_featured')}
                                  className={`px-2.5 py-1 rounded text-xs font-bold inline-flex items-center gap-1 border ${
                                    spec.is_featured
                                      ? 'bg-amber-400/20 border-amber-400 text-amber-400'
                                      : 'bg-charcoal-800 border-charcoal-700 text-cream-300'
                                  }`}
                                >
                                  <Star className="w-3.5 h-3.5" />
                                  <span>{spec.is_featured ? 'Featured' : 'Feature'}</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleToggleSpecialStatus(spec, 'is_active')}
                                  className={`px-2.5 py-1 rounded text-xs font-bold inline-flex items-center gap-1 border ${
                                    spec.is_active
                                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                                      : 'bg-charcoal-800 border-charcoal-700 text-cream-300'
                                  }`}
                                >
                                  {spec.is_active ? (
                                    <>
                                      <Eye className="w-3.5 h-3.5" />
                                      <span>Enabled</span>
                                    </>
                                  ) : (
                                    <>
                                      <EyeOff className="w-3.5 h-3.5" />
                                      <span>Disabled</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>

                            <div className="flex items-baseline justify-between gap-2">
                              <h3 className="font-display text-xl font-bold uppercase text-cream-50">
                                {spec.title}
                              </h3>
                              {spec.price && (
                                <span className="font-display text-base font-bold text-amber-400 shrink-0">
                                  {spec.price}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-cream-300 mt-1">{spec.description}</p>
                            {spec.details && (
                              <p className="text-xs text-amber-400 mt-2">{spec.details}</p>
                            )}
                          </div>

                          <div className="pt-3 border-t border-charcoal-800 flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setEditingSpecial(spec)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-cream-100 text-xs font-bold"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setDeleteTarget({
                                  type: 'special',
                                  id: spec.id,
                                  title: spec.title,
                                })
                              }
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-brick-800/50 hover:bg-brick-600 text-cream-100 text-xs font-bold"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: MANAGE EVENTS */}
              {activeTab === 'events' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="font-display text-2xl font-bold uppercase text-cream-50">
                        Manage Events &amp; Watch Parties
                      </h2>
                      <p className="text-sm text-cream-300">
                        Schedule upcoming events, upload event flyers/photos, or unpublish past
                        listings.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={openNewEventForm}
                      className="inline-flex items-center gap-2 bg-brick-600 hover:bg-brick-500 text-cream-50 font-display uppercase tracking-wider text-sm font-bold px-5 py-3 rounded-xl shadow-md self-start sm:self-auto"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Event</span>
                    </button>
                  </div>

                  {dataLoading ? (
                    <div className="p-8 text-center text-cream-300">Loading events...</div>
                  ) : events.length === 0 ? (
                    <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-10 text-center space-y-3">
                      <p className="font-display text-xl uppercase text-cream-50">
                        No Events Scheduled Yet
                      </p>
                      <p className="text-sm text-cream-300">
                        Click "Add New Event" above to publish a game-day watch party, live music
                        night, or patio gathering.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {events.map((evt) => (
                        <div
                          key={evt.id}
                          className={`bg-charcoal-900 border rounded-2xl p-5 flex flex-col justify-between gap-4 ${
                            evt.is_published
                              ? 'border-charcoal-800'
                              : 'border-charcoal-800 opacity-60'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                              <span className="text-xs font-bold text-amber-400">
                                {evt.event_date} • {evt.start_time}
                              </span>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleToggleEventStatus(evt, 'is_featured')}
                                  className={`px-2.5 py-1 rounded text-xs font-bold inline-flex items-center gap-1 border ${
                                    evt.is_featured
                                      ? 'bg-amber-400/20 border-amber-400 text-amber-400'
                                      : 'bg-charcoal-800 border-charcoal-700 text-cream-300'
                                  }`}
                                >
                                  <Star className="w-3.5 h-3.5" />
                                  <span>{evt.is_featured ? 'Featured' : 'Feature'}</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleToggleEventStatus(evt, 'is_published')}
                                  className={`px-2.5 py-1 rounded text-xs font-bold inline-flex items-center gap-1 border ${
                                    evt.is_published
                                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                                      : 'bg-charcoal-800 border-charcoal-700 text-cream-300'
                                  }`}
                                >
                                  {evt.is_published ? 'Published' : 'Unpublished'}
                                </button>
                              </div>
                            </div>

                            <h3 className="font-display text-xl font-bold uppercase text-cream-50">
                              {evt.title}
                            </h3>
                            <p className="text-sm text-cream-300 mt-1">{evt.description}</p>
                          </div>

                          <div className="pt-3 border-t border-charcoal-800 flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setEditingEvent(evt)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-cream-100 text-xs font-bold"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setDeleteTarget({
                                  type: 'event',
                                  id: evt.id,
                                  title: evt.title,
                                })
                              }
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-brick-800/50 hover:bg-brick-600 text-cream-100 text-xs font-bold"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ============================================================================
         MODAL: ADD / EDIT SPECIAL
         ============================================================================ */}
      {editingSpecial && (
        <div
          className="fixed inset-0 z-[100] bg-charcoal-950/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-charcoal-900 border border-charcoal-700 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-charcoal-800 pb-4">
              <h2 className="font-display text-2xl font-bold uppercase text-cream-50">
                {editingSpecial.id ? 'Edit Special' : 'Add Recurring Special'}
              </h2>
              <button
                type="button"
                onClick={() => setEditingSpecial(null)}
                className="p-2 rounded-lg bg-charcoal-800 text-cream-200 hover:text-cream-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSpecial} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-display uppercase tracking-wider text-cream-200 font-bold mb-1">
                    Day of Week
                  </label>
                  <select
                    value={editingSpecial.day_of_week || 'Monday'}
                    onChange={(e) =>
                      setEditingSpecial({
                        ...editingSpecial,
                        day_of_week: e.target.value as DayOfWeek,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-950 border border-charcoal-700 text-cream-50 text-sm"
                  >
                    {DAYS_OF_WEEK.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-display uppercase tracking-wider text-cream-200 font-bold mb-1">
                    Category
                  </label>
                  <select
                    value={editingSpecial.category || 'Food & Drink'}
                    onChange={(e) =>
                      setEditingSpecial({
                        ...editingSpecial,
                        category: e.target.value as SpecialCategory,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-950 border border-charcoal-700 text-cream-50 text-sm"
                  >
                    {SPECIAL_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-display uppercase tracking-wider text-cream-200 font-bold mb-1">
                  Special Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingSpecial.title || ''}
                  onChange={(e) =>
                    setEditingSpecial({ ...editingSpecial, title: e.target.value })
                  }
                  placeholder="e.g., Domestic Bucket & 1-Lb Wings Night"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-950 border border-charcoal-700 text-cream-50 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-display uppercase tracking-wider text-cream-200 font-bold mb-1">
                    Price (Optional)
                  </label>
                  <input
                    type="text"
                    value={editingSpecial.price || ''}
                    onChange={(e) =>
                      setEditingSpecial({ ...editingSpecial, price: e.target.value })
                    }
                    placeholder="e.g., $14.00 or $3.50 Pints"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-950 border border-charcoal-700 text-cream-50 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-display uppercase tracking-wider text-cream-200 font-bold mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingSpecial.display_order ?? 1}
                    onChange={(e) =>
                      setEditingSpecial({
                        ...editingSpecial,
                        display_order: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-950 border border-charcoal-700 text-cream-50 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-display uppercase tracking-wider text-cream-200 font-bold mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingSpecial.description || ''}
                  onChange={(e) =>
                    setEditingSpecial({ ...editingSpecial, description: e.target.value })
                  }
                  placeholder="Describe what's included in the special..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-950 border border-charcoal-700 text-cream-50 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-display uppercase tracking-wider text-cream-200 font-bold mb-1">
                  Additional Details (e.g. Dine-in only, 4pm–9pm)
                </label>
                <input
                  type="text"
                  value={editingSpecial.details || ''}
                  onChange={(e) =>
                    setEditingSpecial({ ...editingSpecial, details: e.target.value })
                  }
                  placeholder="e.g., Dine-in only • Starting at 5:00 PM"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-950 border border-charcoal-700 text-cream-50 text-sm"
                />
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="inline-flex items-center gap-2 text-sm text-cream-100 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(editingSpecial.is_active)}
                    onChange={(e) =>
                      setEditingSpecial({ ...editingSpecial, is_active: e.target.checked })
                    }
                    className="w-4 h-4 accent-brick-600"
                  />
                  <span>Enabled (Visible on website)</span>
                </label>

                <label className="inline-flex items-center gap-2 text-sm text-cream-100 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(editingSpecial.is_featured)}
                    onChange={(e) =>
                      setEditingSpecial({ ...editingSpecial, is_featured: e.target.checked })
                    }
                    className="w-4 h-4 accent-amber-400"
                  />
                  <span>Featured on Homepage</span>
                </label>
              </div>

              <div className="pt-4 border-t border-charcoal-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingSpecial(null)}
                  className="px-5 py-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-cream-200 font-display uppercase text-sm font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingSpecial}
                  className="px-6 py-2.5 rounded-xl bg-brick-600 hover:bg-brick-500 text-cream-50 font-display uppercase text-sm font-bold shadow-lg"
                >
                  {savingSpecial ? 'Saving...' : 'Save Special'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================================
         MODAL: ADD / EDIT EVENT
         ============================================================================ */}
      {editingEvent && (
        <div
          className="fixed inset-0 z-[100] bg-charcoal-950/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-charcoal-900 border border-charcoal-700 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-charcoal-800 pb-4">
              <h2 className="font-display text-2xl font-bold uppercase text-cream-50">
                {editingEvent.id ? 'Edit Event' : 'Schedule New Event'}
              </h2>
              <button
                type="button"
                onClick={() => setEditingEvent(null)}
                className="p-2 rounded-lg bg-charcoal-800 text-cream-200 hover:text-cream-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-display uppercase tracking-wider text-cream-200 font-bold mb-1">
                  Event Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingEvent.title || ''}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, title: e.target.value })
                  }
                  placeholder="e.g., St. Louis Hockey Watch Party"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-950 border border-charcoal-700 text-cream-50 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-display uppercase tracking-wider text-cream-200 font-bold mb-1">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={editingEvent.event_date || ''}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, event_date: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-950 border border-charcoal-700 text-cream-50 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-display uppercase tracking-wider text-cream-200 font-bold mb-1">
                    Start Time *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingEvent.start_time || ''}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, start_time: e.target.value })
                    }
                    placeholder="7:00 PM"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-950 border border-charcoal-700 text-cream-50 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-display uppercase tracking-wider text-cream-200 font-bold mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingEvent.category || ''}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, category: e.target.value })
                    }
                    placeholder="Watch Party / Live Music"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-950 border border-charcoal-700 text-cream-50 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-display uppercase tracking-wider text-cream-200 font-bold mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingEvent.description || ''}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, description: e.target.value })
                  }
                  placeholder="Share what guests can expect..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-950 border border-charcoal-700 text-cream-50 text-sm"
                />
              </div>

              {/* Image Upload or Quick Select */}
              <div className="space-y-2">
                <label className="block text-xs font-display uppercase tracking-wider text-cream-200 font-bold">
                  Event Image (Upload File, Paste URL, or Pick Preset)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={editingEvent.image_url || ''}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, image_url: e.target.value })
                    }
                    placeholder="https://..."
                    className="flex-1 px-3.5 py-2 rounded-xl bg-charcoal-950 border border-charcoal-700 text-cream-50 text-sm"
                  />
                  <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-amber-400 text-xs font-bold cursor-pointer shrink-0 border border-charcoal-700">
                    <Upload className="w-4 h-4" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {PRESET_EVENT_IMAGES.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() =>
                        setEditingEvent({ ...editingEvent, image_url: preset.url })
                      }
                      className="text-[11px] px-2.5 py-1 rounded bg-charcoal-950 hover:bg-charcoal-800 border border-charcoal-700 text-cream-300"
                    >
                      Use "{preset.label}" Photo
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-display uppercase tracking-wider text-cream-200 font-bold mb-1">
                    Optional Details (e.g., No Cover)
                  </label>
                  <input
                    type="text"
                    value={editingEvent.additional_details || ''}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        additional_details: e.target.value,
                      })
                    }
                    placeholder="No cover • Drink specials all game"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-950 border border-charcoal-700 text-cream-50 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-display uppercase tracking-wider text-cream-200 font-bold mb-1">
                    Optional External Link (Facebook Event)
                  </label>
                  <input
                    type="url"
                    value={editingEvent.external_link || ''}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, external_link: e.target.value })
                    }
                    placeholder="https://facebook.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-950 border border-charcoal-700 text-cream-50 text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="inline-flex items-center gap-2 text-sm text-cream-100 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(editingEvent.is_published)}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, is_published: e.target.checked })
                    }
                    className="w-4 h-4 accent-brick-600"
                  />
                  <span>Published (Visible on website)</span>
                </label>

                <label className="inline-flex items-center gap-2 text-sm text-cream-100 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(editingEvent.is_featured)}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, is_featured: e.target.checked })
                    }
                    className="w-4 h-4 accent-amber-400"
                  />
                  <span>Featured Event</span>
                </label>
              </div>

              <div className="pt-4 border-t border-charcoal-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="px-5 py-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-cream-200 font-display uppercase text-sm font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEvent}
                  className="px-6 py-2.5 rounded-xl bg-brick-600 hover:bg-brick-500 text-cream-50 font-display uppercase text-sm font-bold shadow-lg"
                >
                  {savingEvent ? 'Saving...' : 'Save Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================================
         MODAL: CONFIRM DELETION
         ============================================================================ */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-[110] bg-charcoal-950/90 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-charcoal-900 border border-brick-500 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-brick-500">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="font-display text-xl font-bold uppercase text-cream-50">
                Confirm Deletion
              </h3>
            </div>
            <p className="text-sm text-cream-200 leading-relaxed">
              Are you sure you want to permanently delete{' '}
              <strong className="text-cream-50">"{deleteTarget.title}"</strong>? This action cannot
              be undone.
            </p>
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl bg-charcoal-800 text-cream-200 text-xs font-display uppercase tracking-wider font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-xl bg-brick-600 hover:bg-brick-500 text-cream-50 text-xs font-display uppercase tracking-wider font-bold"
              >
                {deleting ? 'Deleting...' : 'Yes, Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
