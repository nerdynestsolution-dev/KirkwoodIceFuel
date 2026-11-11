import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ExternalLink,
  MapPin,
  Phone,
  Clock,
  UtensilsCrossed,
  Flame,
} from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

export const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Menu & Drinks', path: '/menu' },
  { label: 'Specials', path: '/specials' },
  { label: 'Events', path: '/events' },
  { label: 'Photo Gallery', path: '/gallery' },
  { label: 'Hours & Location', path: '/hours-location' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Top Neighborhood Utility Strip */}
      <div className="bg-charcoal-900 border-b border-charcoal-800 text-cream-200 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href={SITE_CONFIG.links.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-amber-400 transition-colors"
              aria-label="Get directions to 215 N Kirkwood Rd, Kirkwood, MO"
            >
              <MapPin className="w-3.5 h-3.5 text-brick-500 shrink-0" />
              <span>{SITE_CONFIG.address.full}</span>
            </a>
            <span className="hidden md:inline text-charcoal-600">•</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-cream-300">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Mon–Sat 11am–1am • Sun 12pm–12am</span>
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <a
              href={SITE_CONFIG.contact.phoneHref}
              className="inline-flex items-center gap-1.5 font-medium text-cream-100 hover:text-amber-400 transition-colors"
              aria-label={`Call Kirkwood Ice and Fuel at ${SITE_CONFIG.contact.phoneDisplay}`}
            >
              <Phone className="w-3.5 h-3.5 text-brick-500 shrink-0" />
              <span>{SITE_CONFIG.contact.phoneDisplay}</span>
            </a>
            <span className="text-charcoal-600">|</span>
            <a
              href={SITE_CONFIG.links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors font-medium"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${
          scrolled
            ? 'bg-charcoal-950/95 backdrop-blur-md shadow-xl border-b border-charcoal-800'
            : 'bg-charcoal-950 border-b border-charcoal-800/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brick-500 rounded-lg py-1"
              aria-label="Kirkwood Ice & Fuel Home"
            >
              <div className="w-11 h-11 rounded-lg bg-charcoal-800 border-2 border-brick-500 flex items-center justify-center shadow-inner group-hover:bg-brick-600 group-hover:border-amber-400 transition-colors">
                <Flame className="w-6 h-6 text-amber-400 group-hover:text-cream-50 transition-colors" />
              </div>
              <div>
                <span className="block font-display text-xl sm:text-2xl font-bold tracking-wider uppercase text-cream-50 leading-none">
                  Kirkwood Ice &amp; Fuel
                </span>
                <span className="block text-[11px] uppercase tracking-widest text-amber-400 font-semibold mt-1">
                  Bar &amp; Grill • Kirkwood, MO
                </span>
              </div>
            </Link>

            {/* Desktop Horizontal Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `px-3.5 py-2 rounded-md text-sm font-semibold tracking-wide transition-colors ${
                      isActive
                        ? 'bg-charcoal-800 text-amber-400 border border-charcoal-700'
                        : 'text-cream-200 hover:text-cream-50 hover:bg-charcoal-900'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Prominent Order Now CTA & Mobile Menu Button */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <a
                href={SITE_CONFIG.links.orderOnline}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-brick-600 hover:bg-brick-500 active:bg-brick-700 text-cream-50 font-display uppercase tracking-wider text-sm sm:text-base font-semibold px-4 sm:px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg border border-brick-500 transition-all min-h-[44px]"
                aria-label="Order food online from Kirkwood Ice & Fuel via 569Dine (opens in new tab)"
              >
                <UtensilsCrossed className="w-4 h-4 shrink-0" />
                <span>Order Now</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80 hidden sm:inline shrink-0" />
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="lg:hidden inline-flex items-center justify-center p-2.5 rounded-lg bg-charcoal-800 border border-charcoal-700 text-cream-100 hover:text-amber-400 hover:border-charcoal-600 focus:outline-none focus:ring-2 focus:ring-brick-500 min-w-[44px] min-h-[44px]"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-drawer"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Polished Mobile Hamburger Drawer (Easy One-Handed Reach) */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-drawer"
            className="lg:hidden fixed inset-x-0 top-[113px] bottom-0 bg-charcoal-950/98 backdrop-blur-lg z-50 border-t border-charcoal-800 overflow-y-auto"
          >
            <div className="max-w-lg mx-auto px-5 py-6 flex flex-col justify-between min-h-full">
              <nav className="space-y-2" aria-label="Mobile Navigation">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between w-full px-4 py-3.5 rounded-xl font-display uppercase tracking-wider text-lg transition-all min-h-[52px] ${
                        isActive
                          ? 'bg-brick-600/20 text-amber-400 border border-brick-500/50 font-bold'
                          : 'bg-charcoal-900/80 text-cream-100 hover:bg-charcoal-800 border border-charcoal-800'
                      }`
                    }
                  >
                    <span>{item.label}</span>
                    <span className="text-xs font-sans font-normal text-cream-300">→</span>
                  </NavLink>
                ))}
              </nav>

              {/* Bottom One-Handed Quick Action Area */}
              <div className="mt-8 pt-6 border-t border-charcoal-800 space-y-4">
                <a
                  href={SITE_CONFIG.links.orderOnline}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full bg-brick-600 hover:bg-brick-500 text-cream-50 font-display uppercase tracking-wider text-lg font-bold py-4 px-6 rounded-xl shadow-lg border border-brick-500 min-h-[54px]"
                >
                  <UtensilsCrossed className="w-5 h-5" />
                  <span>Order Online (569Dine)</span>
                  <ExternalLink className="w-4 h-4 opacity-80" />
                </a>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={SITE_CONFIG.links.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-charcoal-900 border border-charcoal-700 text-cream-100 font-semibold text-sm hover:border-amber-400 min-h-[48px]"
                  >
                    <MapPin className="w-4 h-4 text-brick-500" />
                    <span>Get Directions</span>
                  </a>
                  <a
                    href={SITE_CONFIG.contact.phoneHref}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-charcoal-900 border border-charcoal-700 text-cream-100 font-semibold text-sm hover:border-amber-400 min-h-[48px]"
                  >
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span>Call the Bar</span>
                  </a>
                </div>

                <p className="text-center text-xs text-cream-300 italic pt-1">
                  "{SITE_CONFIG.brandStatement}"
                </p>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
