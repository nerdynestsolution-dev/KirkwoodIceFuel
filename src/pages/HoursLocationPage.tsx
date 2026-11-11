import React from 'react';
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  UtensilsCrossed,
  Sun,
  CreditCard,
  ShieldAlert,
  Navigation,
  CheckCircle2,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { SITE_CONFIG } from '../data/siteConfig';

export const HoursLocationPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Hours & Location — 215 N Kirkwood Rd, Kirkwood, MO"
        description="Visit Kirkwood Ice & Fuel at 215 N Kirkwood Rd, Kirkwood, MO 63122. View published business hours, Google Maps directions, outdoor patio info, phone number, and online ordering."
        canonicalPath="/hours-location"
      />

      {/* Header */}
      <section className="bg-charcoal-900 border-b border-charcoal-800 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-amber-400 font-display uppercase tracking-widest text-xs sm:text-sm font-bold">
                <MapPin className="w-4 h-4 text-brick-500" />
                <span>Downtown Kirkwood • St. Louis County, MO</span>
              </div>
              <h1 className="font-display text-4xl sm:text-6xl font-bold uppercase text-cream-50 tracking-tight">
                Hours &amp; Location
              </h1>
              <p className="text-cream-200 text-base sm:text-lg leading-relaxed">
                Conveniently located at <strong>215 N Kirkwood Rd</strong> right in the heart of
                Kirkwood, Missouri. Stop in for lunch, dinner, patio drinks, or pickup!
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={SITE_CONFIG.links.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brick-600 hover:bg-brick-500 text-cream-50 font-display uppercase tracking-wider text-sm font-bold px-6 py-3.5 rounded-xl shadow-lg border border-brick-500 transition-colors min-h-[48px]"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.links.orderOnline}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-charcoal-800 hover:bg-charcoal-700 text-cream-50 font-display uppercase tracking-wider text-sm font-bold px-6 py-3.5 rounded-xl border border-charcoal-700 transition-colors min-h-[48px]"
              >
                <UtensilsCrossed className="w-4 h-4 text-amber-400" />
                <span>Order Online (569Dine)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Details & Map Grid */}
      <section className="py-12 sm:py-16 bg-charcoal-950 bg-pub-grain">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Info Cards */}
            <div className="lg:col-span-5 space-y-6">
              {/* Address & Contact Card */}
              <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div>
                  <span className="text-xs font-display uppercase tracking-widest text-amber-400 font-bold">
                    Official Address
                  </span>
                  <h2 className="font-display text-2xl font-bold uppercase text-cream-50 mt-1">
                    {SITE_CONFIG.name}
                  </h2>
                  <p className="text-cream-200 text-base mt-1">{SITE_CONFIG.address.full}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href={SITE_CONFIG.links.googleMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-wider font-bold bg-brick-600 hover:bg-brick-500 text-cream-50 px-4 py-2.5 rounded-lg transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Open Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={SITE_CONFIG.links.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-wider font-bold bg-charcoal-800 hover:bg-charcoal-700 text-cream-100 px-4 py-2.5 rounded-lg border border-charcoal-700 transition-colors"
                    >
                      <span>Facebook Page</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Phone Section */}
                <div className="pt-6 border-t border-charcoal-800 space-y-2">
                  <span className="text-xs font-display uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Phone Number</span>
                  </span>
                  <a
                    href={SITE_CONFIG.contact.phoneHref}
                    className="block font-display text-2xl font-bold text-cream-50 hover:text-amber-400 transition-colors"
                  >
                    {SITE_CONFIG.contact.phoneDisplay}
                  </a>
                  <div className="p-3 rounded-xl bg-charcoal-950 border border-amber-400/30 text-xs text-cream-300 flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{SITE_CONFIG.contact.phoneVerificationNote}</span>
                  </div>
                </div>

                {/* Published Business Hours & Kitchen Hours Placeholder */}
                <div className="pt-6 border-t border-charcoal-800 space-y-4">
                  <span className="text-xs font-display uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Published Business Hours</span>
                  </span>

                  <div className="space-y-3">
                    {SITE_CONFIG.hours.published.map((row) => (
                      <div
                        key={row.days}
                        className="flex items-center justify-between bg-charcoal-950 px-4 py-3 rounded-xl border border-charcoal-800"
                      >
                        <span className="font-semibold text-cream-100 text-sm">{row.days}</span>
                        <span className="font-display uppercase tracking-wider text-amber-400 font-bold text-sm">
                          {row.hours}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Clearly Labeled Placeholder Kitchen Hours */}
                  <div className="p-4 rounded-xl bg-brick-600/15 border border-brick-500/40 space-y-1">
                    <p className="font-display uppercase tracking-wider text-sm font-bold text-cream-50">
                      {SITE_CONFIG.hours.kitchenNotice}
                    </p>
                    <p className="text-xs text-cream-300">
                      {SITE_CONFIG.hours.hoursVerificationNote}
                    </p>
                  </div>
                </div>
              </div>

              {/* Patio & Payment Info Card */}
              <div className="bg-cream-100 text-charcoal-950 rounded-2xl p-6 sm:p-8 border-2 border-charcoal-800 shadow-xl space-y-4">
                <h3 className="font-display text-2xl font-bold uppercase text-charcoal-950">
                  Good to Know Before You Arrive
                </h3>
                <ul className="space-y-3 text-sm text-charcoal-800 font-medium">
                  <li className="flex items-start gap-2.5">
                    <Sun className="w-5 h-5 text-brick-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Outdoor Patio Seating:</strong> Relax outside on our Kirkwood patio
                      with full food and drink service when weather permits.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CreditCard className="w-5 h-5 text-brick-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Payment Options:</strong> We accept major credit cards as well as cash.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-brick-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Online Pickup &amp; Delivery:</strong> Order directly through our{' '}
                      <a
                        href={SITE_CONFIG.links.orderOnline}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brick-600 underline font-bold"
                      >
                        569Dine ordering page
                      </a>
                      .
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Interactive Map & Neighborhood Overview */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl overflow-hidden shadow-2xl">
                <div className="px-6 py-4 bg-charcoal-950 border-b border-charcoal-800 flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h2 className="font-display text-lg uppercase font-bold text-cream-50">
                      Interactive Map — Downtown Kirkwood
                    </h2>
                    <p className="text-xs text-cream-300">
                      Just north of Jefferson Ave &amp; the historic Kirkwood Train Station
                    </p>
                  </div>
                  <a
                    href={SITE_CONFIG.links.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-wider font-bold text-amber-400 hover:text-amber-300"
                  >
                    <span>Launch Turn-by-Turn Directions</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="h-[480px] w-full bg-charcoal-950">
                  <iframe
                    title="Google Map of Kirkwood Ice & Fuel at 215 N Kirkwood Rd, Kirkwood, MO 63122"
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

              <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 sm:p-8 space-y-3">
                <h3 className="font-display text-xl uppercase font-bold text-cream-50">
                  Serving Kirkwood &amp; Western St. Louis County
                </h3>
                <p className="text-sm text-cream-200 leading-relaxed">
                  Located right on N. Kirkwood Road (Lindbergh Blvd),{' '}
                  <strong>Kirkwood Ice &amp; Fuel</strong> is an easy stop from anywhere in
                  Kirkwood, Des Peres, Glendale, Webster Groves, Sunset Hills, and across St. Louis
                  County. Street and public downtown parking are available nearby.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
