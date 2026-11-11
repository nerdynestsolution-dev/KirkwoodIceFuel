import React, { useState, useMemo } from 'react';
import {
  UtensilsCrossed,
  ExternalLink,
  Search,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Beer,
  Info,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { SITE_CONFIG } from '../data/siteConfig';
import { MENU_CATEGORIES } from '../data/menuData';

export const MenuPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return MENU_CATEGORIES.filter((cat) =>
      activeCategory === 'all' ? true : cat.id === activeCategory
    )
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            !q ||
            item.name.toLowerCase().includes(q) ||
            (item.description && item.description.toLowerCase().includes(q))
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [activeCategory, searchQuery]);

  return (
    <>
      <SEO
        title="Menu & Drinks — Burgers, 1-Lb Wings, Melts & Cold Beer"
        description="Explore the complete Kirkwood Ice & Fuel menu with verified prices: charbroiled Fuel Burgers, Ice & Fuel Breast Melt, 1-lb hot wings, toasted ravioli, tacos, soups, salads, and cold drinks in Kirkwood, MO."
        canonicalPath="/menu"
      />

      {/* Page Header */}
      <section className="bg-charcoal-900 border-b border-charcoal-800 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-amber-400 font-display uppercase tracking-widest text-xs sm:text-sm font-bold">
                <Flame className="w-4 h-4 text-brick-500" />
                <span>Kirkwood Ice &amp; Fuel Kitchen &amp; Bar</span>
              </div>
              <h1 className="font-display text-4xl sm:text-6xl font-bold uppercase text-cream-50 tracking-tight">
                Menu &amp; Drinks
              </h1>
              <p className="text-cream-200 text-base sm:text-lg leading-relaxed">
                Honest pub food cooked to order at fair neighborhood prices. Browse our complete
                kitchen menu below or order directly through 569Dine for pickup or delivery.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0">
              <a
                href={SITE_CONFIG.links.orderOnline}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-brick-600 hover:bg-brick-500 text-cream-50 font-display uppercase tracking-wider text-base font-bold px-7 py-4 rounded-xl shadow-lg border border-brick-500 transition-all min-h-[52px]"
              >
                <UtensilsCrossed className="w-5 h-5" />
                <span>Order Online on 569Dine</span>
                <ExternalLink className="w-4 h-4 opacity-80" />
              </a>
              <span className="text-xs text-cream-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Food items &amp; prices verified via official 569Dine menu</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Category Filter & Search Controls */}
      <div className="sticky top-20 z-30 bg-charcoal-950/95 backdrop-blur-md border-b border-charcoal-800 py-3.5 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Category Pills */}
            <div
              className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar"
              role="tablist"
              aria-label="Menu Categories"
            >
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-lg font-display uppercase tracking-wider text-xs sm:text-sm font-bold whitespace-nowrap transition-all min-h-[40px] ${
                  activeCategory === 'all'
                    ? 'bg-brick-600 text-cream-50 shadow'
                    : 'bg-charcoal-900 text-cream-200 hover:bg-charcoal-800 border border-charcoal-800'
                }`}
              >
                All Categories
              </button>
              {MENU_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg font-display uppercase tracking-wider text-xs sm:text-sm font-bold whitespace-nowrap transition-all min-h-[40px] ${
                    activeCategory === cat.id
                      ? 'bg-brick-600 text-cream-50 shadow'
                      : 'bg-charcoal-900 text-cream-200 hover:bg-charcoal-800 border border-charcoal-800'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64 shrink-0">
              <Search className="w-4 h-4 text-cream-300 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search burgers, wings, melts..."
                aria-label="Search menu items"
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-charcoal-900 border border-charcoal-700 text-cream-50 placeholder-cream-300/60 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Menu Boards (Warm Cream Menu Sheets for Authentic Readability) */}
      <section className="py-12 sm:py-16 bg-charcoal-950 bg-pub-grain">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {filteredCategories.length === 0 ? (
            <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-12 text-center space-y-4">
              <p className="font-display text-2xl uppercase text-cream-50">
                No menu items matched "{searchQuery}"
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="inline-flex items-center gap-2 bg-brick-600 hover:bg-brick-500 text-cream-50 font-display uppercase tracking-wider text-sm font-bold px-5 py-2.5 rounded-lg"
              >
                Reset Menu Filter
              </button>
            </div>
          ) : (
            filteredCategories.map((category) => (
              <div
                key={category.id}
                id={category.id}
                className="bg-cream-100 text-charcoal-950 rounded-2xl shadow-xl border-2 border-charcoal-800 overflow-hidden"
              >
                {/* Category Header Band */}
                <div className="bg-charcoal-900 text-cream-50 px-6 sm:px-8 py-6 border-b-4 border-brick-600 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-cream-50">
                        {category.name}
                      </h2>
                      {category.verifiedSource === '569Dine' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-charcoal-800 text-amber-400 border border-charcoal-700">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified 569Dine Menu
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-400 border border-amber-400/40">
                          <AlertTriangle className="w-3 h-3" />
                          Owner Review Flagged
                        </span>
                      )}
                    </div>
                    {category.subtitle && (
                      <p className="text-sm text-cream-200 mt-1">{category.subtitle}</p>
                    )}
                  </div>

                  {category.id === 'beer-cocktails' ? (
                    <div className="inline-flex items-center gap-2 text-amber-400 font-display uppercase text-xs tracking-wider font-bold">
                      <Beer className="w-4 h-4" />
                      <span>Served In-House &amp; On the Patio</span>
                    </div>
                  ) : (
                    <a
                      href={SITE_CONFIG.links.orderOnline}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-wider font-bold bg-brick-600 hover:bg-brick-500 text-cream-50 px-4 py-2 rounded-lg transition-colors self-start sm:self-auto shrink-0"
                    >
                      <span>Order Category Online</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {/* Optional Category Note */}
                {category.note && (
                  <div className="bg-cream-200/80 border-b border-cream-300 px-6 sm:px-8 py-3 text-xs sm:text-sm text-charcoal-800 font-medium flex items-start gap-2">
                    <Info className="w-4 h-4 text-brick-600 shrink-0 mt-0.5" />
                    <span>{category.note}</span>
                  </div>
                )}

                {/* Menu Items Grid */}
                <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                  {category.items.map((item) => (
                    <article
                      key={item.id}
                      className="flex flex-col justify-between border-b border-cream-300 pb-5 last:border-b-0 md:last:border-b"
                    >
                      <div>
                        <div className="flex items-baseline justify-between gap-3">
                          <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-charcoal-950 tracking-wide">
                            {item.name}
                          </h3>
                          <span className="font-display text-lg sm:text-xl font-bold text-brick-600 shrink-0">
                            {item.price}
                          </span>
                        </div>

                        {item.badge && (
                          <span className="inline-block mt-1 px-2 py-0.5 rounded bg-brick-600/10 text-brick-700 font-display uppercase text-[11px] font-bold tracking-wider">
                            {item.badge}
                          </span>
                        )}

                        {item.secondaryPriceLabel && (
                          <p className="text-xs font-bold text-charcoal-700 mt-1">
                            {item.secondaryPriceLabel}
                          </p>
                        )}

                        {item.description && (
                          <p className="text-sm text-charcoal-800 mt-2 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))
          )}

          {/* Bottom Menu Disclaimer & Direct 569Dine Ordering Banner */}
          <div className="bg-charcoal-900 border border-charcoal-800 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-cream-50">
                Ready to Place an Order for Pickup or Delivery?
              </h3>
              <p className="text-sm text-cream-300 leading-relaxed">
                All food items and prices above reflect our verified 569Dine menu. Modifiers, side
                substitutions, and live kitchen availability can be selected directly on our 569Dine
                ordering page.
              </p>
            </div>
            <a
              href={SITE_CONFIG.links.orderOnline}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-brick-600 hover:bg-brick-500 text-cream-50 font-display uppercase tracking-wider text-base font-bold px-7 py-4 rounded-xl shadow-lg border border-brick-500 transition-all shrink-0 min-h-[52px]"
            >
              <UtensilsCrossed className="w-5 h-5" />
              <span>Order Now on 569Dine</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
