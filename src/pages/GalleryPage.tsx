import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Info,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { GALLERY_IMAGES } from '../data/siteConfig';
import { GalleryCategory } from '../types';

const CATEGORIES: GalleryCategory[] = [
  'All',
  'Food & Drinks',
  'Bar & Atmosphere',
  'Outdoor Patio',
  'Events',
];

export const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = useMemo(() => {
    if (selectedCategory === 'All') return GALLERY_IMAGES;
    return GALLERY_IMAGES.filter((img) => img.category === selectedCategory);
  }, [selectedCategory]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + filteredImages.length) % filteredImages.length
    );
  }, [filteredImages.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % filteredImages.length
    );
  }, [filteredImages.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  const currentLightboxImage =
    lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

  return (
    <>
      <SEO
        title="Photo Gallery — Food, Cold Drinks, Patio & Bar Vibe"
        description="Browse photos representing Kirkwood Ice & Fuel in Kirkwood, MO: charbroiled burgers, 1-lb wings, cold draft beer, our relaxed outdoor patio, and neighborhood bar atmosphere."
        canonicalPath="/gallery"
      />

      {/* Header */}
      <section className="bg-charcoal-900 border-b border-charcoal-800 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-amber-400 font-display uppercase tracking-widest text-xs sm:text-sm font-bold">
              <Camera className="w-4 h-4 text-brick-500" />
              <span>Inside &amp; Outside Kirkwood Ice &amp; Fuel</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-bold uppercase text-cream-50 tracking-tight">
              Photo Gallery
            </h1>
            <p className="text-cream-200 text-base sm:text-lg leading-relaxed">
              Take a look around our neighborhood bar, kitchen favorites, and outdoor patio. Click
              any photo to open the full-screen viewer.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Filter & Grid */}
      <section className="py-12 sm:py-16 bg-charcoal-950 bg-pub-grain">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Placeholder Asset Notice */}
          <div className="bg-charcoal-900 border border-charcoal-800 rounded-xl px-4 py-3 text-xs text-cream-300 flex items-center gap-2.5">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Curated placeholder photography is currently displayed. All gallery assets are
              centralized in <code className="text-amber-400">src/data/siteConfig.ts</code> so
              authentic business photos can be swapped in effortlessly.
            </span>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar" role="tablist">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setSelectedCategory(category);
                  setLightboxIndex(null);
                }}
                className={`px-4 py-2.5 rounded-xl font-display uppercase tracking-wider text-xs sm:text-sm font-bold whitespace-nowrap transition-all min-h-[42px] ${
                  selectedCategory === category
                    ? 'bg-brick-600 text-cream-50 shadow-md border border-brick-500'
                    : 'bg-charcoal-900 text-cream-200 hover:bg-charcoal-800 border border-charcoal-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Responsive Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((img, idx) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className="group relative rounded-2xl overflow-hidden bg-charcoal-900 border border-charcoal-800 hover:border-amber-400/60 text-left focus:outline-none focus:ring-2 focus:ring-brick-500 shadow-lg transition-all"
                aria-label={`View larger image: ${img.title}`}
              >
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/20 to-transparent" />
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-charcoal-950/80 border border-charcoal-700 flex items-center justify-center text-cream-100 group-hover:bg-brick-600 group-hover:border-brick-500 transition-colors">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-charcoal-950/85 border border-charcoal-700 text-amber-400 font-display uppercase text-[11px] font-bold tracking-wider">
                    {img.category}
                  </span>
                </div>
                <div className="p-5">
                  <h2 className="font-display text-lg font-bold uppercase text-cream-50 group-hover:text-amber-400 transition-colors">
                    {img.title}
                  </h2>
                  <p className="text-xs text-cream-300 mt-1 line-clamp-2">{img.caption}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Accessible Lightbox Modal */}
      {currentLightboxImage && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-charcoal-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={currentLightboxImage.title}
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-5xl w-full bg-charcoal-900 border border-charcoal-700 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-charcoal-950 border-b border-charcoal-800">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded bg-brick-600 text-cream-50 font-display uppercase text-xs font-bold tracking-wider">
                  {currentLightboxImage.category}
                </span>
                <span className="text-xs text-cream-300 font-medium">
                  Photo {lightboxIndex + 1} of {filteredImages.length}
                </span>
              </div>
              <button
                type="button"
                onClick={closeLightbox}
                className="p-2 rounded-lg bg-charcoal-800 hover:bg-brick-600 text-cream-100 transition-colors"
                aria-label="Close photo viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Container */}
            <div className="relative bg-charcoal-950 flex items-center justify-center max-h-[70vh] overflow-hidden">
              <img
                src={currentLightboxImage.src}
                alt={currentLightboxImage.alt}
                className="max-h-[70vh] w-auto object-contain"
              />

              <button
                type="button"
                onClick={showPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-charcoal-900/90 hover:bg-brick-600 text-cream-50 border border-charcoal-700 transition-colors"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                type="button"
                onClick={showNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-charcoal-900/90 hover:bg-brick-600 text-cream-50 border border-charcoal-700 transition-colors"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Caption Footer */}
            <div className="p-5 bg-charcoal-900 border-t border-charcoal-800">
              <h3 className="font-display text-xl font-bold uppercase text-cream-50">
                {currentLightboxImage.title}
              </h3>
              <p className="text-sm text-cream-200 mt-1">{currentLightboxImage.caption}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
