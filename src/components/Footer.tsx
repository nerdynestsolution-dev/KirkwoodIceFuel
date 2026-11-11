import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  UtensilsCrossed,
  Flame,
  Lock,
  CreditCard,
  Sun,
} from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';
import { NAV_ITEMS } from './Navbar';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-950 border-t border-charcoal-800 text-cream-200">
      {/* Pre-Footer Neighborhood Callout Banner */}
      <div className="bg-charcoal-900 border-b border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-1">
              Craving Burgers, Wings, or a Sourdough Melt?
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-cream-50 uppercase tracking-wide">
              Order Online for Pickup or Delivery in Kirkwood
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a
              href={SITE_CONFIG.links.orderOnline}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 bg-brick-600 hover:bg-brick-500 text-cream-50 font-display uppercase tracking-wider font-semibold px-6 py-3.5 rounded-lg shadow-md border border-brick-500 transition-all min-h-[48px]"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Order Now on 569Dine</span>
              <ExternalLink className="w-4 h-4 opacity-80" />
            </a>
            <a
              href={SITE_CONFIG.links.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 bg-charcoal-800 hover:bg-charcoal-700 text-cream-100 font-display uppercase tracking-wider font-semibold px-5 py-3.5 rounded-lg border border-charcoal-700 transition-all min-h-[48px]"
            >
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & Statement */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-charcoal-800 border-2 border-brick-500 flex items-center justify-center">
                <Flame className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <span className="block font-display text-xl font-bold uppercase tracking-wider text-cream-50">
                  {SITE_CONFIG.name}
                </span>
                <span className="block text-[11px] uppercase tracking-widest text-amber-400 font-semibold">
                  Downtown Kirkwood, MO
                </span>
              </div>
            </Link>

            <blockquote className="font-serif italic text-cream-200 text-sm leading-relaxed border-l-2 border-brick-500 pl-3.5 py-0.5">
              "{SITE_CONFIG.brandStatement}"
            </blockquote>

            <div className="flex flex-wrap gap-2 pt-1 text-xs text-cream-300">
              <span className="inline-flex items-center gap-1.5 bg-charcoal-900 border border-charcoal-800 px-2.5 py-1 rounded-md">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                Outdoor Patio
              </span>
              <span className="inline-flex items-center gap-1.5 bg-charcoal-900 border border-charcoal-800 px-2.5 py-1 rounded-md">
                <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                Major Cards Accepted
              </span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="font-display text-base uppercase tracking-wider text-cream-50 font-bold mb-4">
              Explore the Bar
            </h3>
            <ul className="space-y-2.5 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-cream-300 hover:text-amber-400 transition-colors inline-flex items-center gap-1.5 py-0.5"
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={SITE_CONFIG.links.orderOnline}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brick-500 hover:text-amber-400 font-semibold transition-colors inline-flex items-center gap-1.5 py-0.5"
                >
                  <span>Order Online (569Dine)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Published Hours */}
          <div>
            <h3 className="font-display text-base uppercase tracking-wider text-cream-50 font-bold mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Published Hours</span>
            </h3>
            <ul className="space-y-3 text-sm">
              {SITE_CONFIG.hours.published.map((row) => (
                <li
                  key={row.days}
                  className="flex flex-col sm:flex-row sm:justify-between border-b border-charcoal-800/80 pb-2"
                >
                  <span className="font-semibold text-cream-100">{row.days}</span>
                  <span className="text-amber-400 font-medium">{row.hours}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 p-3 rounded-lg bg-charcoal-900 border border-charcoal-800 text-xs text-cream-300">
              <p className="font-semibold text-cream-100">{SITE_CONFIG.hours.kitchenNotice}</p>
            </div>
          </div>

          {/* Column 4: Visit & Connect */}
          <div className="space-y-3 text-sm">
            <h3 className="font-display text-base uppercase tracking-wider text-cream-50 font-bold mb-4">
              Location &amp; Contact
            </h3>
            <p className="flex items-start gap-2.5 text-cream-200">
              <MapPin className="w-4 h-4 text-brick-500 shrink-0 mt-1" />
              <span>
                {SITE_CONFIG.address.street}
                <br />
                {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state} {SITE_CONFIG.address.zip}
              </span>
            </p>
            <p className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <a
                href={SITE_CONFIG.contact.phoneHref}
                className="text-cream-100 font-semibold hover:text-amber-400 transition-colors"
              >
                {SITE_CONFIG.contact.phoneDisplay}
              </a>
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={SITE_CONFIG.links.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold text-xs uppercase tracking-wider"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={SITE_CONFIG.links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-cream-200 hover:text-amber-400 font-semibold text-xs uppercase tracking-wider"
              >
                <span>Follow on Facebook (@iceandfuel)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Owner Admin Link */}
        <div className="mt-12 pt-6 border-t border-charcoal-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-300">
          <p>
            &copy; {currentYear} {SITE_CONFIG.legalName} • {SITE_CONFIG.address.full}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span>Serving Kirkwood, St. Louis County &amp; Western St. Louis Suburbs</span>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1 text-cream-300 hover:text-amber-400 transition-colors"
              aria-label="Owner Admin Dashboard"
            >
              <Lock className="w-3 h-3" />
              <span>Owner Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
