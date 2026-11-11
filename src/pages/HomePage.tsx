import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  UtensilsCrossed,
  ExternalLink,
  MapPin,
  Clock,
  Phone,
  Sparkles,
  Calendar,
  Sun,
  Camera,
  ArrowRight,
  CreditCard,
  Beer,
  ShieldAlert,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { SITE_CONFIG, GALLERY_IMAGES } from '../data/siteConfig';
import { FEATURED_MENU_HIGHLIGHTS } from '../data/menuData';
import { fetchSpecials, fetchEvents } from '../lib/supabase';
import { SpecialItem, EventItem } from '../types';

export const HomePage: React.FC = () => {
  const [specials, setSpecials] = useState<SpecialItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loadingContent, setLoadingContent] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoadingContent(true);
      const [specRes, evtRes] = await Promise.all([
        fetchSpecials(false),
        fetchEvents(false),
      ]);
      if (!mounted) return;

      // Prioritize featured specials, limit to 4 on homepage preview
      const sortedSpecs = [...specRes.data].sort((a, b) => {
        if (a.is_featured !== b.is_featured) return a.is_featured ? -1 : 1;
        return a.display_order - b.display_order;
      });
      setSpecials(sortedSpecs.slice(0, 4));

      // Filter only upcoming events (today or future)
      const todayStr = new Date().toISOString().split('T')[0];
      const upcoming = evtRes.data.filter((e) => e.event_date >= todayStr);
      setEvents(upcoming.slice(0, 3));
      setLoadingContent(false);
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <SEO
        title="Neighborhood Bar & Grill in Kirkwood, MO"
        description="Good Food. Cold Drinks. Good Times. Visit Kirkwood Ice & Fuel at 215 N Kirkwood Rd for charbroiled burgers, 1-lb wings, sourdough melts, cold beer, and our outdoor patio."
        canonicalPath="/"
      />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[82vh] flex items-center bg-charcoal-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={SITE_CONFIG.images.heroBarInterior}
            alt="Warm neighborhood bar interior representing Kirkwood Ice & Fuel in Kirkwood, MO"
            className="w-full h-full object-cover object-center scale-105"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950 via-charcoal-950/90 to-charcoal-950/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-charcoal-950/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-charcoal-900/90 border border-amber-400/40 text-amber-400 text-xs uppercase tracking-widest font-bold">
              <span>215 N Kirkwood Rd • Downtown Kirkwood, MO</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-cream-50 leading-[1.03]">
              Good Food.{' '}
              <span className="text-amber-400">Cold Drinks.</span>{' '}
              Good Times.
            </h1>

            <p className="text-lg sm:text-xl text-cream-200 leading-relaxed max-w-2xl font-normal">
              {SITE_CONFIG.heroSubheadline}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a
                href={SITE_CONFIG.links.orderOnline}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-brick-600 hover:bg-brick-500 active:bg-brick-700 text-cream-50 font-display uppercase tracking-wider text-lg font-bold px-8 py-4 rounded-xl shadow-xl border border-brick-500 transition-all min-h-[54px]"
              >
                <UtensilsCrossed className="w-5 h-5" />
                <span>Order Now</span>
                <ExternalLink className="w-4 h-4 opacity-80" />
              </a>

              <Link
                to="/menu"
                className="inline-flex items-center justify-center gap-2 bg-cream-100 hover:bg-cream-50 text-charcoal-950 font-display uppercase tracking-wider text-lg font-bold px-8 py-4 rounded-xl shadow-lg transition-all min-h-[54px]"
              >
                <span>View Menu</span>
                <ArrowRight className="w-5 h-5 text-brick-600" />
              </Link>
            </div>

            {/* Smaller Get Directions & Quick Info Link */}
            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-cream-200">
              <a
                href={SITE_CONFIG.links.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4 transition-colors py-1"
              >
                <MapPin className="w-4 h-4 shrink-0" />
                <span>Get Directions to 215 N Kirkwood Rd</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="hidden sm:inline text-charcoal-600">•</span>
              <span className="inline-flex items-center gap-1.5 text-cream-300">
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Outdoor Patio Open</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WELCOME TO KIRKWOOD ICE & FUEL (Warm Cream Section for High Visual Contrast) */}
      <section className="bg-cream-100 text-charcoal-900 py-16 sm:py-24 border-y-4 border-brick-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-brick-600 font-display uppercase tracking-widest text-sm font-bold">
                <span>Welcome to Kirkwood Ice &amp; Fuel</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-charcoal-950 leading-tight">
                A True Neighborhood Dive Bar &amp; Kitchen in the Heart of Kirkwood
              </h2>
              <p className="text-charcoal-800 text-base sm:text-lg leading-relaxed">
                Right on North Kirkwood Road, <strong>Kirkwood Ice &amp; Fuel</strong> is the kind
                of unpretentious local hangout where everybody feels at home. Whether you're stopping
                in after work for an ice-cold draft beer, meeting lifelong friends on the outdoor
                patio, or picking up a pound of hot wings and charbroiled burgers for the family, we
                keep things simple, relaxed, and affordable.
              </p>

              {/* Official Brand Statement Callout */}
              <div className="bg-cream-50 border-l-4 border-brick-600 p-6 sm:p-8 rounded-r-2xl shadow-md">
                <p className="font-serif italic text-xl sm:text-2xl text-charcoal-950 leading-snug">
                  "{SITE_CONFIG.brandStatement}"
                </p>
                <p className="mt-3 text-xs font-display uppercase tracking-widest text-brick-600 font-bold">
                  — The Kirkwood Ice &amp; Fuel Promise
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-cream-200/70 border border-cream-300 rounded-xl p-4">
                  <UtensilsCrossed className="w-5 h-5 text-brick-600 mb-2" />
                  <h3 className="font-display uppercase text-base font-bold text-charcoal-950">
                    Real Scratch Grill
                  </h3>
                  <p className="text-xs text-charcoal-700 mt-1">
                    Charbroiled Fuel Burgers, sourdough melts, homemade salsa, chili &amp; gumbo.
                  </p>
                </div>
                <div className="bg-cream-200/70 border border-cream-300 rounded-xl p-4">
                  <Beer className="w-5 h-5 text-brick-600 mb-2" />
                  <h3 className="font-display uppercase text-base font-bold text-charcoal-950">
                    Cold Pours &amp; Buckets
                  </h3>
                  <p className="text-xs text-charcoal-700 mt-1">
                    Full neighborhood bar serving frosty drafts, bottles, and honest mixed drinks.
                  </p>
                </div>
                <div className="bg-cream-200/70 border border-cream-300 rounded-xl p-4">
                  <CreditCard className="w-5 h-5 text-brick-600 mb-2" />
                  <h3 className="font-display uppercase text-base font-bold text-charcoal-950">
                    Fair Everyday Prices
                  </h3>
                  <p className="text-xs text-charcoal-700 mt-1">
                    Generous portions without luxury markups. Major credit cards accepted.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-charcoal-900">
                <img
                  src={SITE_CONFIG.images.welcomeBarAtmosphere}
                  alt="Friends sharing drinks and conversation at a casual neighborhood pub (Placeholder)"
                  loading="lazy"
                  className="w-full h-[420px] object-cover"
                />
                <div className="bg-charcoal-900 text-cream-100 px-5 py-3.5 flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider text-amber-400">
                    Downtown Kirkwood • St. Louis County
                  </span>
                  <span className="text-cream-300">Placeholder Photography</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GOOD FOOD, FAIR PRICES (Menu Highlights) */}
      <section className="py-16 sm:py-24 bg-charcoal-950 bg-pub-grain">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-amber-400 font-display uppercase tracking-widest text-sm font-bold">
                From Our Kitchen
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase text-cream-50 mt-1">
                Good Food, Fair Prices
              </h2>
              <p className="text-cream-200 mt-2 max-w-2xl">
                Verified menu favorites straight from our grill and fryer—from our famous{' '}
                <strong>Ice &amp; Fuel Breast Melt</strong> to 1-lb. wings and charbroiled burgers.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 bg-charcoal-800 hover:bg-charcoal-700 text-cream-50 font-display uppercase tracking-wider text-sm font-semibold px-5 py-3 rounded-lg border border-charcoal-700 transition-colors"
              >
                <span>See Complete Menu &amp; Prices</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_MENU_HIGHLIGHTS.map((item) => (
              <div
                key={item.id}
                className="group bg-charcoal-900 border border-charcoal-800 hover:border-brick-500/70 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 shadow-lg"
              >
                <div>
                  <div className="relative h-52 overflow-hidden bg-charcoal-800">
                    <img
                      src={item.image}
                      alt={`${item.name} at Kirkwood Ice & Fuel (Placeholder image)`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-charcoal-950/90 text-amber-400 text-[11px] font-display uppercase tracking-wider font-bold px-2.5 py-1 rounded-md border border-charcoal-700">
                      {item.category}
                    </span>
                    <span className="absolute bottom-3 right-3 bg-brick-600 text-cream-50 font-display text-lg font-bold px-3 py-1 rounded-lg shadow">
                      {item.price}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl font-bold uppercase text-cream-50 group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-cream-300 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-charcoal-800/80 text-xs">
                  <Link
                    to="/menu"
                    className="text-amber-400 hover:text-amber-300 font-semibold uppercase tracking-wider inline-flex items-center gap-1"
                  >
                    <span>Full Menu</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <a
                    href={SITE_CONFIG.links.orderOnline}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream-200 hover:text-cream-50 font-semibold inline-flex items-center gap-1"
                  >
                    <span>Order Pickup</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WEEKLY SPECIALS PREVIEW (Admin-Manageable) */}
      <section className="py-16 sm:py-24 bg-charcoal-900 border-t border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-amber-400 font-display uppercase tracking-widest text-sm font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Recurring Lineup</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase text-cream-50 mt-1">
                Weekly Food &amp; Drink Specials
              </h2>
              <p className="text-cream-200 mt-2 max-w-2xl">
                Check out our recurring weekly specials. Managed directly by our team through the owner
                dashboard.
              </p>
            </div>
            <Link
              to="/specials"
              className="inline-flex items-center gap-2 bg-brick-600 hover:bg-brick-500 text-cream-50 font-display uppercase tracking-wider text-sm font-semibold px-5 py-3 rounded-lg transition-colors self-start md:self-auto"
            >
              <span>View All Weekly Specials</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loadingContent ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="h-48 rounded-2xl bg-charcoal-800/60 animate-pulse border border-charcoal-700"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {specials.map((spec) => (
                <div
                  key={spec.id}
                  className="bg-charcoal-950 border border-charcoal-800 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-400/50 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-3 py-1 rounded-md bg-brick-600/20 border border-brick-500/40 text-amber-400 font-display uppercase text-xs font-bold tracking-wider">
                        {spec.day_of_week}
                      </span>
                      {spec.price && (
                        <span className="font-display text-sm font-bold text-cream-100 bg-charcoal-800 px-2.5 py-1 rounded">
                          {spec.price}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-xl font-bold uppercase text-cream-50">
                      {spec.title}
                    </h3>
                    <p className="text-sm text-cream-300 mt-2 leading-relaxed">
                      {spec.description}
                    </p>
                  </div>
                  {spec.details && (
                    <p className="mt-4 pt-3 border-t border-charcoal-800 text-xs text-amber-400/90 font-medium">
                      {spec.details}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. WHAT'S HAPPENING (Upcoming Events) */}
      <section className="py-16 sm:py-24 bg-charcoal-950 border-t border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-amber-400 font-display uppercase tracking-widest text-sm font-bold">
                <Calendar className="w-4 h-4" />
                <span>At the Bar</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase text-cream-50 mt-1">
                What's Happening
              </h2>
              <p className="text-cream-200 mt-2 max-w-2xl">
                Game-day watch parties, live music, patio nights, and neighborhood gatherings in
                Kirkwood.
              </p>
            </div>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 bg-charcoal-800 hover:bg-charcoal-700 text-cream-50 font-display uppercase tracking-wider text-sm font-semibold px-5 py-3 rounded-lg border border-charcoal-700 transition-colors self-start md:self-auto"
            >
              <span>Go to Events Calendar</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>

          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-charcoal-900 border border-charcoal-800 rounded-2xl overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {evt.image_url && (
                      <img
                        src={evt.image_url}
                        alt={evt.title}
                        loading="lazy"
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-amber-400 font-bold uppercase tracking-wider mb-2">
                        <span>{evt.event_date}</span>
                        <span>•</span>
                        <span>{evt.start_time}</span>
                      </div>
                      <h3 className="font-display text-2xl font-bold uppercase text-cream-50">
                        {evt.title}
                      </h3>
                      <p className="text-sm text-cream-300 mt-2 leading-relaxed">
                        {evt.description}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-5 pt-3 border-t border-charcoal-800">
                    <Link
                      to="/events"
                      className="text-xs font-semibold uppercase tracking-wider text-amber-400 hover:text-amber-300 inline-flex items-center gap-1"
                    >
                      <span>Event Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-8 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <span className="inline-block px-3 py-1 rounded-md bg-amber-400/15 text-amber-400 text-xs font-display uppercase tracking-wider font-bold">
                  Live Schedule Managed via Owner Admin
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-cream-50">
                  Every Game Day &amp; Weekend Is Better with Neighbors
                </h3>
                <p className="text-cream-200 text-sm sm:text-base leading-relaxed">
                  No special ticketed or one-off events are posted for this week yet—our doors are
                  open daily for St. Louis sports watch parties, cold drafts, and patio hangouts.
                  Visit our Events page or follow us on Facebook for new announcements!
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  to="/events"
                  className="inline-flex items-center gap-2 bg-brick-600 hover:bg-brick-500 text-cream-50 font-display uppercase tracking-wider text-sm font-semibold px-6 py-3.5 rounded-xl transition-colors"
                >
                  <span>View Events Page</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={SITE_CONFIG.links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-charcoal-800 hover:bg-charcoal-700 text-cream-100 font-display uppercase tracking-wider text-sm font-semibold px-5 py-3.5 rounded-xl border border-charcoal-700 transition-colors"
                >
                  <span>Facebook Updates</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6. ENJOY THE PATIO */}
      <section className="py-16 sm:py-24 bg-cream-100 text-charcoal-950 border-y-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-charcoal-900">
                <img
                  src={SITE_CONFIG.images.patioFeature}
                  alt="Relaxed outdoor patio seating at Kirkwood Ice & Fuel (Placeholder)"
                  loading="lazy"
                  className="w-full h-[380px] sm:h-[440px] object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
              <div className="inline-flex items-center gap-2 text-brick-600 font-display uppercase tracking-widest text-sm font-bold">
                <Sun className="w-4 h-4" />
                <span>Outdoor Seating in Downtown Kirkwood</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase text-charcoal-950 leading-tight">
                Enjoy the Patio
              </h2>
              <p className="text-charcoal-800 text-base sm:text-lg leading-relaxed">
                When the weather's right in St. Louis County, there's no better spot to unwind than
                the outdoor patio at <strong>Kirkwood Ice &amp; Fuel</strong>. Grab a table outside,
                order a bucket of cold beers or a basket of mini tacos and wings, and watch downtown
                Kirkwood go by with good company.
              </p>
              <ul className="space-y-2.5 text-sm sm:text-base text-charcoal-800 font-medium">
                <li className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-brick-600" />
                  <span>Full food and bar menu available outside on the patio</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-brick-600" />
                  <span>Casual, laid-back neighborhood vibe right on N. Kirkwood Rd</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-brick-600" />
                  <span>Great for afternoon lunches, happy hour drinks, and warm evenings</span>
                </li>
              </ul>
              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/hours-location"
                  className="inline-flex items-center gap-2 bg-charcoal-950 hover:bg-charcoal-800 text-cream-50 font-display uppercase tracking-wider text-sm font-semibold px-6 py-3.5 rounded-xl transition-colors"
                >
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Plan Your Visit</span>
                </Link>
                <Link
                  to="/gallery"
                  className="inline-flex items-center gap-2 bg-cream-200 hover:bg-cream-300 text-charcoal-950 font-display uppercase tracking-wider text-sm font-semibold px-6 py-3.5 rounded-xl border border-charcoal-700/20 transition-colors"
                >
                  <Camera className="w-4 h-4 text-brick-600" />
                  <span>Explore Photo Gallery</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PHOTO GALLERY PREVIEW */}
      <section className="py-16 sm:py-24 bg-charcoal-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-amber-400 font-display uppercase tracking-widest text-sm font-bold">
                <Camera className="w-4 h-4" />
                <span>Inside &amp; Outside</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase text-cream-50 mt-1">
                Photo Gallery Preview
              </h2>
              <p className="text-cream-200 mt-2 max-w-2xl">
                A look at the food, cold drinks, bar atmosphere, and patio vibe (placeholder
                photography organized for easy owner replacement).
              </p>
            </div>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 bg-charcoal-800 hover:bg-charcoal-700 text-cream-50 font-display uppercase tracking-wider text-sm font-semibold px-5 py-3 rounded-lg border border-charcoal-700 transition-colors self-start md:self-auto"
            >
              <span>Open Full Photo Gallery</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {GALLERY_IMAGES.slice(0, 4).map((img) => (
              <Link
                key={img.id}
                to="/gallery"
                className="group relative h-56 sm:h-64 rounded-2xl overflow-hidden border border-charcoal-800 block"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/20 to-transparent flex flex-col justify-end p-4">
                  <span className="text-[10px] font-display uppercase tracking-widest text-amber-400 font-bold">
                    {img.category}
                  </span>
                  <h3 className="font-display text-base sm:text-lg font-bold text-cream-50 uppercase leading-snug">
                    {img.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. VISIT US SECTION */}
      <section className="py-16 sm:py-24 bg-charcoal-900 border-t border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-amber-400 font-display uppercase tracking-widest text-sm font-bold">
                  Find Us in Downtown Kirkwood
                </span>
                <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase text-cream-50 mt-1">
                  Visit Us Today
                </h2>
              </div>

              <div className="bg-charcoal-950 border border-charcoal-800 rounded-2xl p-6 space-y-5">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-brick-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display uppercase text-sm tracking-wider text-amber-400 font-bold">
                      Address
                    </h3>
                    <p className="text-cream-50 font-semibold text-base mt-0.5">
                      {SITE_CONFIG.name}
                    </p>
                    <p className="text-cream-200 text-sm">{SITE_CONFIG.address.full}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 border-t border-charcoal-800 pt-4">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display uppercase text-sm tracking-wider text-amber-400 font-bold">
                      Phone Number
                    </h3>
                    <a
                      href={SITE_CONFIG.contact.phoneHref}
                      className="text-cream-50 font-bold text-lg hover:text-amber-400 transition-colors block mt-0.5"
                    >
                      {SITE_CONFIG.contact.phoneDisplay}
                    </a>
                    <p className="text-xs text-cream-300 mt-1 flex items-start gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{SITE_CONFIG.contact.phoneVerificationNote}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 border-t border-charcoal-800 pt-4">
                  <Clock className="w-5 h-5 text-brick-500 shrink-0 mt-1" />
                  <div className="w-full">
                    <h3 className="font-display uppercase text-sm tracking-wider text-amber-400 font-bold mb-2">
                      Published Business Hours
                    </h3>
                    <div className="space-y-2 text-sm">
                      {SITE_CONFIG.hours.published.map((item) => (
                        <div key={item.days} className="flex justify-between">
                          <span className="text-cream-200 font-medium">{item.days}</span>
                          <span className="text-cream-50 font-bold">{item.hours}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 p-2.5 rounded-lg bg-charcoal-900 border border-charcoal-800 text-xs text-amber-400 font-medium">
                      {SITE_CONFIG.hours.kitchenNotice}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={SITE_CONFIG.links.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-brick-600 hover:bg-brick-500 text-cream-50 font-display uppercase tracking-wider text-sm font-bold px-6 py-3.5 rounded-xl transition-colors min-h-[48px]"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Get Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <Link
                  to="/hours-location"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-charcoal-800 hover:bg-charcoal-700 text-cream-100 font-display uppercase tracking-wider text-sm font-bold px-6 py-3.5 rounded-xl border border-charcoal-700 transition-colors min-h-[48px]"
                >
                  <span>Full Hours &amp; Details</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden border-2 border-charcoal-800 shadow-2xl bg-charcoal-950 h-[420px]">
                <iframe
                  title="Map showing Kirkwood Ice & Fuel at 215 N Kirkwood Rd, Kirkwood, MO 63122"
                  src={SITE_CONFIG.links.googleMapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
