import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  UtensilsCrossed,
  ExternalLink,
  Star,
  AlertCircle,
  Lock,
  CalendarDays,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { SITE_CONFIG } from '../data/siteConfig';
import { fetchSpecials } from '../lib/supabase';
import { SpecialItem, DayOfWeek } from '../types';

const DAY_FILTERS: Array<'All' | 'Featured' | DayOfWeek> = [
  'All',
  'Featured',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const SpecialsPage: React.FC = () => {
  const [specials, setSpecials] = useState<SpecialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Featured' | DayOfWeek>('All');
  const [dataSource, setDataSource] = useState<'supabase' | 'placeholder_fallback'>('placeholder_fallback');

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      const res = await fetchSpecials(false);
      if (!mounted) return;
      setSpecials(res.data);
      setDataSource(res.source);
      setLoading(false);
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredSpecials = useMemo(() => {
    if (selectedFilter === 'All') return specials;
    if (selectedFilter === 'Featured') return specials.filter((s) => s.is_featured);
    return specials.filter(
      (s) => s.day_of_week === selectedFilter || s.day_of_week === 'Everyday'
    );
  }, [specials, selectedFilter]);

  const hasPlaceholders = specials.some(
    (s) => s.is_placeholder || s.title.toLowerCase().includes('[placeholder]')
  );

  return (
    <>
      <SEO
        title="Weekly Food & Drink Specials"
        description="Check out recurring weekly food and drink specials at Kirkwood Ice & Fuel in Downtown Kirkwood, MO. Great deals on burgers, wings, melts, and cold beer."
        canonicalPath="/specials"
      />

      {/* Header */}
      <section className="bg-charcoal-900 border-b border-charcoal-800 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-amber-400 font-display uppercase tracking-widest text-xs sm:text-sm font-bold">
                <Sparkles className="w-4 h-4 text-brick-500" />
                <span>Recurring Weekly Deals • Kirkwood, MO</span>
              </div>
              <h1 className="font-display text-4xl sm:text-6xl font-bold uppercase text-cream-50 tracking-tight">
                Weekly Specials
              </h1>
              <p className="text-cream-200 text-base sm:text-lg leading-relaxed">
                Good food and cold drinks at a fair price, all week long. Browse our recurring
                daily food and drink specials below.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={SITE_CONFIG.links.orderOnline}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brick-600 hover:bg-brick-500 text-cream-50 font-display uppercase tracking-wider text-sm font-bold px-6 py-3.5 rounded-xl shadow-lg border border-brick-500 transition-colors"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Order Food Online</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 bg-charcoal-800 hover:bg-charcoal-700 text-cream-100 font-display uppercase tracking-wider text-sm font-bold px-5 py-3.5 rounded-xl border border-charcoal-700 transition-colors"
              >
                <span>View Full Menu</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16 bg-charcoal-950 bg-pub-grain">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Owner Placeholder Notice Banner */}
          {(hasPlaceholders || dataSource === 'placeholder_fallback') && (
            <div className="bg-charcoal-900 border-l-4 border-amber-400 rounded-r-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
              <div className="flex items-start gap-3.5">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h2 className="font-display text-base sm:text-lg uppercase font-bold text-cream-50">
                    Placeholder Specials Displayed Pending Owner Input
                  </h2>
                  <p className="text-xs sm:text-sm text-cream-300 leading-relaxed">
                    To ensure we never invent unverified promotions, these cards are clearly labeled
                    placeholder entries. The restaurant owner can add, edit, reorder, or toggle real
                    recurring specials anytime from the{' '}
                    <Link to="/admin" className="text-amber-400 underline font-semibold">
                      /admin dashboard
                    </Link>
                    .
                  </p>
                </div>
              </div>
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 border border-charcoal-700 text-amber-400 font-display uppercase text-xs tracking-wider font-bold shrink-0"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Manage in Admin</span>
              </Link>
            </div>
          )}

          {/* Day Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar" role="tablist">
            {DAY_FILTERS.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedFilter(day)}
                className={`px-4 py-2.5 rounded-xl font-display uppercase tracking-wider text-xs sm:text-sm font-bold whitespace-nowrap transition-all min-h-[42px] ${
                  selectedFilter === day
                    ? 'bg-brick-600 text-cream-50 shadow-md border border-brick-500'
                    : 'bg-charcoal-900 text-cream-200 hover:bg-charcoal-800 border border-charcoal-800'
                }`}
              >
                {day === 'Featured' ? '★ Featured' : day}
              </button>
            ))}
          </div>

          {/* Specials Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="h-56 rounded-2xl bg-charcoal-900 animate-pulse border border-charcoal-800"
                />
              ))}
            </div>
          ) : filteredSpecials.length === 0 ? (
            <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-12 text-center space-y-4">
              <CalendarDays className="w-10 h-10 text-amber-400 mx-auto" />
              <h3 className="font-display text-2xl font-bold uppercase text-cream-50">
                No Active Specials Found for "{selectedFilter}"
              </h3>
              <p className="text-sm text-cream-300 max-w-md mx-auto">
                Try viewing all days of the week or check our complete menu for everyday neighborhood
                pricing.
              </p>
              <button
                type="button"
                onClick={() => setSelectedFilter('All')}
                className="inline-flex items-center gap-2 bg-brick-600 hover:bg-brick-500 text-cream-50 font-display uppercase tracking-wider text-sm font-bold px-5 py-2.5 rounded-lg"
              >
                Show All Days
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSpecials.map((special) => (
                <article
                  key={special.id}
                  className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all shadow-lg border ${
                    special.is_featured
                      ? 'bg-gradient-to-b from-charcoal-900 to-charcoal-950 border-amber-400/50 ring-1 ring-amber-400/20'
                      : 'bg-charcoal-900 border-charcoal-800 hover:border-charcoal-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 flex-wrap mb-4">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-md bg-brick-600 text-cream-50 font-display uppercase text-xs font-bold tracking-wider">
                          {special.day_of_week}
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-charcoal-800 text-cream-200 text-xs font-semibold border border-charcoal-700">
                          {special.category}
                        </span>
                      </div>

                      {special.is_featured && (
                        <span className="inline-flex items-center gap-1 text-xs font-display uppercase tracking-wider font-bold text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-baseline justify-between gap-3">
                      <h2 className="font-display text-2xl font-bold uppercase text-cream-50 leading-snug">
                        {special.title}
                      </h2>
                    </div>

                    {special.price && (
                      <div className="mt-2.5 inline-block bg-cream-100 text-charcoal-950 font-display uppercase text-base font-bold px-3 py-1 rounded-md">
                        {special.price}
                      </div>
                    )}

                    <p className="text-sm sm:text-base text-cream-200 mt-3 leading-relaxed">
                      {special.description}
                    </p>
                  </div>

                  {special.details && (
                    <div className="mt-6 pt-4 border-t border-charcoal-800 flex items-center justify-between text-xs text-amber-400 font-medium">
                      <span>{special.details}</span>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
