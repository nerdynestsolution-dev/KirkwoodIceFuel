import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  ExternalLink,
  Star,
  Archive,
  Eye,
  Lock,
  Tv,
  Music,
  Users,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { SITE_CONFIG, SAMPLE_EVENT_TEMPLATES } from '../data/siteConfig';
import { fetchEvents } from '../lib/supabase';
import { EventItem } from '../types';

export const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPastArchive, setShowPastArchive] = useState(false);
  const [showSampleTemplates, setShowSampleTemplates] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      const res = await fetchEvents(false);
      if (!mounted) return;
      setEvents(res.data);
      setLoading(false);
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  // Automatically separate upcoming events (today or future, sorted ascending)
  // from past events (before today, sorted most recent first)
  const { upcomingEvents, pastEvents } = useMemo(() => {
    const upcoming: EventItem[] = [];
    const past: EventItem[] = [];

    events.forEach((evt) => {
      if (evt.event_date >= todayStr) {
        upcoming.push(evt);
      } else {
        past.push(evt);
      }
    });

    upcoming.sort((a, b) => a.event_date.localeCompare(b.event_date));
    past.sort((a, b) => b.event_date.localeCompare(a.event_date));

    return { upcomingEvents: upcoming, pastEvents: past };
  }, [events, todayStr]);

  const formatEventDate = (dateStr: string) => {
    const parts = dateStr.split('-').map(Number);
    if (parts.length !== 3) return dateStr;
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <>
      <SEO
        title="Upcoming Events, Watch Parties & Live Gatherings"
        description="See what's happening at Kirkwood Ice & Fuel in Kirkwood, MO—sports watch parties, live music, patio nights, and neighborhood gatherings."
        canonicalPath="/events"
      />

      {/* Page Header */}
      <section className="bg-charcoal-900 border-b border-charcoal-800 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-amber-400 font-display uppercase tracking-widest text-xs sm:text-sm font-bold">
                <Calendar className="w-4 h-4 text-brick-500" />
                <span>Happenings at 215 N Kirkwood Rd</span>
              </div>
              <h1 className="font-display text-4xl sm:text-6xl font-bold uppercase text-cream-50 tracking-tight">
                Events &amp; Watch Parties
              </h1>
              <p className="text-cream-200 text-base sm:text-lg leading-relaxed">
                From St. Louis game-day watch parties to live music and weekend patio gatherings,
                here is what's coming up at Kirkwood Ice &amp; Fuel.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={SITE_CONFIG.links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-charcoal-800 hover:bg-charcoal-700 text-cream-50 font-display uppercase tracking-wider text-sm font-bold px-5 py-3.5 rounded-xl border border-charcoal-700 transition-colors"
              >
                <span>Follow on Facebook</span>
                <ExternalLink className="w-4 h-4 text-amber-400" />
              </a>
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 bg-charcoal-900 hover:bg-charcoal-800 text-amber-400 font-display uppercase tracking-wider text-xs font-bold px-4 py-3.5 rounded-xl border border-charcoal-700 transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Owner Event Manager</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16 bg-charcoal-950 bg-pub-grain">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* What We Host Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-brick-600/20 border border-brick-500/40 flex items-center justify-center shrink-0">
                <Tv className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h2 className="font-display text-lg uppercase font-bold text-cream-50">
                  Game-Day Watch Parties
                </h2>
                <p className="text-xs sm:text-sm text-cream-300 mt-1">
                  Catch St. Louis hockey, baseball, college football, and weekend matchups with cold
                  buckets and a full kitchen.
                </p>
              </div>
            </div>
            <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-brick-600/20 border border-brick-500/40 flex items-center justify-center shrink-0">
                <Music className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h2 className="font-display text-lg uppercase font-bold text-cream-50">
                  Live Music &amp; Local Nights
                </h2>
                <p className="text-xs sm:text-sm text-cream-300 mt-1">
                  Special neighborhood nights, acoustic sets, and seasonal Kirkwood celebrations.
                </p>
              </div>
            </div>
            <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-brick-600/20 border border-brick-500/40 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h2 className="font-display text-lg uppercase font-bold text-cream-50">
                  Patio &amp; Group Gatherings
                </h2>
                <p className="text-xs sm:text-sm text-cream-300 mt-1">
                  Bring your crew, alumni group, or neighborhood friends for relaxed get-togethers.
                </p>
              </div>
            </div>
          </div>

          {/* Upcoming Events Section */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal-800 pb-4">
              <div>
                <h2 className="font-display text-2xl sm:text-4xl font-bold uppercase text-cream-50">
                  Upcoming Scheduled Events
                </h2>
                <p className="text-sm text-cream-300 mt-1">
                  Events are displayed in chronological order. Past events automatically move to the
                  archive.
                </p>
              </div>

              {upcomingEvents.length === 0 && (
                <button
                  type="button"
                  onClick={() => setShowSampleTemplates((prev) => !prev)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-charcoal-900 hover:bg-charcoal-800 border border-charcoal-700 text-amber-400 text-xs font-display uppercase tracking-wider font-bold self-start sm:self-auto"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>
                    {showSampleTemplates
                      ? 'Hide Sample Event Card Preview'
                      : 'Preview Sample Event Card Format'}
                  </span>
                </button>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((n) => (
                  <div
                    key={n}
                    className="h-64 rounded-2xl bg-charcoal-900 animate-pulse border border-charcoal-800"
                  />
                ))}
              </div>
            ) : upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((evt) => (
                  <article
                    key={evt.id}
                    className={`rounded-2xl overflow-hidden flex flex-col justify-between border shadow-lg transition-all ${
                      evt.is_featured
                        ? 'bg-charcoal-900 border-amber-400/60 ring-1 ring-amber-400/20'
                        : 'bg-charcoal-900 border-charcoal-800'
                    }`}
                  >
                    <div>
                      {evt.image_url && (
                        <div className="relative h-52 bg-charcoal-800 overflow-hidden">
                          <img
                            src={evt.image_url}
                            alt={evt.title}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                          {evt.is_featured && (
                            <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-charcoal-950/90 text-amber-400 font-display uppercase text-xs font-bold">
                              <Star className="w-3.5 h-3.5 fill-amber-400" />
                              Featured
                            </span>
                          )}
                        </div>
                      )}
                      <div className="p-6 space-y-3">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="px-2.5 py-1 rounded bg-brick-600 text-cream-50 font-display uppercase text-xs font-bold tracking-wider">
                            {evt.category || 'Event'}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatEventDate(evt.event_date)}
                          </span>
                        </div>

                        <h3 className="font-display text-2xl font-bold uppercase text-cream-50">
                          {evt.title}
                        </h3>

                        <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-cream-200 bg-charcoal-800 px-3 py-1 rounded-md">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          <span>
                            Starts at {evt.start_time}
                            {evt.end_time ? ` – ${evt.end_time}` : ''}
                          </span>
                        </p>

                        <p className="text-sm text-cream-200 leading-relaxed">{evt.description}</p>

                        {evt.additional_details && (
                          <p className="text-xs text-amber-400 font-medium pt-1">
                            {evt.additional_details}
                          </p>
                        )}
                      </div>
                    </div>

                    {evt.external_link && (
                      <div className="px-6 pb-6 pt-3 border-t border-charcoal-800">
                        <a
                          href={evt.external_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-wider font-bold text-amber-400 hover:text-amber-300"
                        >
                          <span>More Info / RSVP</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-8 sm:p-10 text-center max-w-3xl mx-auto space-y-4">
                <Calendar className="w-12 h-12 text-amber-400 mx-auto" />
                <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-cream-50">
                  No Scheduled Special Events Posted Right Now
                </h3>
                <p className="text-cream-200 text-sm sm:text-base leading-relaxed">
                  We don't fabricate fake events—when our team schedules a live band, trivia night,
                  or special watch party in the{' '}
                  <Link to="/admin" className="text-amber-400 underline font-semibold">
                    Owner Admin Dashboard
                  </Link>
                  , it appears right here automatically. In the meantime, we're open daily with games
                  on the TVs, cold drinks at the bar, and kitchen favorites ready to order!
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowSampleTemplates((prev) => !prev)}
                    className="inline-flex items-center gap-2 bg-charcoal-800 hover:bg-charcoal-700 text-amber-400 font-display uppercase tracking-wider text-xs sm:text-sm font-bold px-5 py-3 rounded-xl border border-charcoal-700"
                  >
                    <Eye className="w-4 h-4" />
                    <span>
                      {showSampleTemplates
                        ? 'Hide Sample Event Card Format'
                        : 'Preview Sample Event Card Format'}
                    </span>
                  </button>
                  <a
                    href={SITE_CONFIG.links.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-brick-600 hover:bg-brick-500 text-cream-50 font-display uppercase tracking-wider text-xs sm:text-sm font-bold px-5 py-3 rounded-xl"
                  >
                    <span>Check Facebook Page</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            )}

            {/* Optional Sample Template Preview (Explicitly Marked as Format Examples Only) */}
            {showSampleTemplates && upcomingEvents.length === 0 && (
              <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-charcoal-900/70 border-2 border-dashed border-amber-400/50 space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <span className="text-xs font-display uppercase tracking-widest text-amber-400 font-bold">
                      Template Preview Mode (Not Actual Scheduled Events)
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-cream-50">
                      How Published Events Appear When Added in /admin
                    </h3>
                  </div>
                  <Link
                    to="/admin"
                    className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-wider font-bold bg-brick-600 text-cream-50 px-4 py-2 rounded-lg"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Add Real Event in Admin</span>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {SAMPLE_EVENT_TEMPLATES.map((sample) => (
                    <article
                      key={sample.id}
                      className="bg-charcoal-950 border border-charcoal-800 rounded-2xl overflow-hidden flex flex-col justify-between"
                    >
                      <div>
                        {sample.image_url && (
                          <img
                            src={sample.image_url}
                            alt={sample.title}
                            loading="lazy"
                            className="w-full h-48 object-cover opacity-85"
                          />
                        )}
                        <div className="p-6 space-y-2.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="px-2.5 py-0.5 rounded bg-amber-400/20 text-amber-400 font-display uppercase font-bold">
                              {sample.category}
                            </span>
                            <span className="text-cream-300 font-semibold">
                              {formatEventDate(sample.event_date)} • {sample.start_time}
                            </span>
                          </div>
                          <h4 className="font-display text-xl font-bold uppercase text-cream-50">
                            {sample.title}
                          </h4>
                          <p className="text-sm text-cream-300">{sample.description}</p>
                        </div>
                      </div>
                      <div className="px-6 py-3 bg-charcoal-900 border-t border-charcoal-800 text-xs text-amber-400 font-semibold">
                        {sample.additional_details}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Past Events Archive */}
          {pastEvents.length > 0 && (
            <div className="pt-6 border-t border-charcoal-800">
              <button
                type="button"
                onClick={() => setShowPastArchive((prev) => !prev)}
                className="inline-flex items-center gap-2 text-sm font-display uppercase tracking-wider font-bold text-cream-300 hover:text-amber-400"
              >
                <Archive className="w-4 h-4 text-amber-400" />
                <span>
                  {showPastArchive
                    ? `Hide Past Events Archive (${pastEvents.length})`
                    : `View Past Events Archive (${pastEvents.length})`}
                </span>
              </button>

              {showPastArchive && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 opacity-80">
                  {pastEvents.map((evt) => (
                    <div
                      key={evt.id}
                      className="bg-charcoal-900/70 border border-charcoal-800 rounded-xl p-5 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs text-cream-300">
                        <span className="uppercase font-bold text-amber-400/80">Past Event</span>
                        <span>{formatEventDate(evt.event_date)}</span>
                      </div>
                      <h3 className="font-display text-lg font-bold uppercase text-cream-100">
                        {evt.title}
                      </h3>
                      <p className="text-xs text-cream-300">{evt.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
