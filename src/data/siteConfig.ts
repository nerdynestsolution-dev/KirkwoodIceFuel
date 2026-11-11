import { GalleryImage, SpecialItem, EventItem } from '../types';

/**
 * Centralized Business Configuration & Asset Library for Kirkwood Ice & Fuel.
 * Updating any value or image path here updates the entire website and SEO structured data.
 */
export const SITE_CONFIG = {
  name: 'Kirkwood Ice & Fuel',
  legalName: 'Kirkwood Ice & Fuel Co.',
  tagline: 'Good Food. Cold Drinks. Good Times.',
  heroSubheadline:
    'Your neighborhood spot in Kirkwood for good food, cold drinks, and time well spent with friends.',
  brandStatement:
    'Our Goal is the same as yours - We want you to have a good meal at a fair price, while sharing time.',
  establishedNote: 'A Downtown Kirkwood Neighborhood Staple',
  address: {
    street: '215 N Kirkwood Rd',
    city: 'Kirkwood',
    state: 'MO',
    zip: '63122',
    county: 'St. Louis County',
    full: '215 N Kirkwood Rd, Kirkwood, MO 63122',
  },
  contact: {
    // Verified on Downtown Kirkwood & Sauce Magazine as (314) 822-0494; some older directories list (314) 822-8553.
    // Flagged clearly for owner verification per project guidelines.
    phoneDisplay: '(314) 822-0494',
    phoneHref: 'tel:+13148220494',
    secondaryListedPhone: '(314) 822-8553',
    phoneVerificationNote:
      'Owner Verification Note: Downtown Kirkwood & Sauce Magazine publish (314) 822-0494; select third-party directories list (314) 822-8553. Please confirm preferred primary line before launch.',
  },
  links: {
    orderOnline:
      'https://www.569dine.com/glue/express/4750?pickup=true&utm_source=google&rwg_token=ALcMQYbYsrHPveN1fobuCzeh3kbtkZzKNlR3D4lCSIbX346PZqqowmkEiOzcnldF4ZO67vfpoKhVt1pI2kD8OOQ6g7Jsse57xA%3D%3D',
    googleMaps: 'https://maps.app.goo.gl/yfszrzLzP4LcUSQx9',
    googleMapsEmbed:
      'https://www.google.com/maps?q=215+N+Kirkwood+Rd,+Kirkwood,+MO+63122&output=embed',
    facebook: 'https://www.facebook.com/iceandfuel/',
  },
  hours: {
    published: [
      { days: 'Monday – Saturday', hours: '11:00 AM – 1:00 AM' },
      { days: 'Sunday', hours: '12:00 PM – 12:00 AM' },
    ],
    kitchenNotice: 'Kitchen Hours: Please contact us for current kitchen hours.',
    hoursVerificationNote:
      'Published bar hours shown above. Seasonal or holiday hours may vary—check our Facebook page or call ahead.',
  },
  amenities: [
    'Relaxed Outdoor Patio',
    'Full Bar — Ice-Cold Drafts, Bottles & Cocktails',
    'Charbroiled Burgers, 1-lb Wings & Signature Melts',
    'Online Ordering for Pickup & Delivery via 569Dine',
    'Accepts Major Credit Cards',
    'Casual Neighborhood Atmosphere in Downtown Kirkwood',
  ],
  /**
   * HOMEPAGE PICTURES:
   * Drop your own photos into the `public/images/` folder and replace the URLs below
   * with `/images/your-photo-name.jpg`!
   */
  images: {
    // 1. Main Page Top Hero Background Picture (e.g. '/images/hero-bg.jpg')
    heroBarInterior:
      '/images/hero-bg.jpg',

    // 2. "Welcome to Kirkwood Ice & Fuel" Section Picture (e.g. '/images/welcome-bar.jpg')
    welcomeBarAtmosphere:
      '/images/welcome-bar.jpg',

    // 3. "Enjoy the Patio" Section Picture (e.g. '/images/patio.jpg')
    patioFeature:
      '/images/patio.jpg',

    burgerHighlight:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
    wingsHighlight:
      'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=900&q=80',
    meltHighlight:
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80',
    drinksHighlight:
      'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=900&q=80',
  },
};

/**
 * Organized Placeholder Gallery Images.
 * Each asset has a descriptive alt tag, category, and placeholder flag so real photography can drop right in.
 */
export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'gal-real-bar',
    title: 'The Bar at Kirkwood Ice & Fuel',
    caption: 'Ice-cold draft taps, neon signs, and the classic Kirkwood Ice & Fuel Company mirror behind the bar.',
    category: 'Bar & Atmosphere',
    src: '/images/welcome-bar.jpg',
    alt: 'Kirkwood Ice & Fuel bar interior with beer taps and Kirkwood Ice & Fuel Company mirror',
    isPlaceholder: false,
  },
  {
    id: 'gal-real-patio',
    title: 'Sunny Outdoor Patio on N. Kirkwood Rd',
    caption: 'Grab a colorful chair under the umbrellas on our Downtown Kirkwood outdoor patio.',
    category: 'Outdoor Patio',
    src: '/images/patio.jpg',
    alt: 'Outdoor patio seating with umbrellas and flowers at Kirkwood Ice & Fuel in Kirkwood, MO',
    isPlaceholder: false,
  },
  {
    id: 'gal-real-interior',
    title: 'Inside Kirkwood Ice & Fuel',
    caption: 'Pull up a stool at the bar or grab a table with friends to catch the game.',
    category: 'Bar & Atmosphere',
    src: '/images/hero-bg.jpg',
    alt: 'Dining room and bar seating inside Kirkwood Ice & Fuel',
    isPlaceholder: false,
  },
  {
    id: 'gal-1',
    title: 'Charbroiled Fuel Cheeseburger',
    caption: 'Charbroiled to order and served hot off the grill with classic pub sides. (Placeholder Photo)',
    category: 'Food & Drinks',
    src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80',
    alt: 'Charbroiled cheeseburger with melted cheese and fries representing Kirkwood Ice & Fuel burgers',
    isPlaceholder: true,
  },
  {
    id: 'gal-2',
    title: 'Warm Neighborhood Bar Interior',
    caption: 'A relaxed, unpretentious neighborhood hangout on North Kirkwood Road. (Placeholder Photo)',
    category: 'Bar & Atmosphere',
    src: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Warmly lit casual neighborhood dive bar interior with wood bar top and stools',
    isPlaceholder: true,
  },
  {
    id: 'gal-3',
    title: '1-Lb. Hot Wings & Dipping Sauces',
    caption: 'Bone-in or boneless wings tossed in regular hot, honey hot, honey BBQ, or teriyaki. (Placeholder Photo)',
    category: 'Food & Drinks',
    src: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=1200&q=80',
    alt: 'Platter of crispy chicken wings with ranch and celery at Kirkwood Ice & Fuel',
    isPlaceholder: true,
  },
  {
    id: 'gal-4',
    title: 'Relaxed Outdoor Patio Seating',
    caption: 'Pull up a chair outside on our Kirkwood patio for cold drinks and fresh air. (Placeholder Photo)',
    category: 'Outdoor Patio',
    src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    alt: 'Casual outdoor restaurant and bar patio with tables and string lights',
    isPlaceholder: true,
  },
  {
    id: 'gal-5',
    title: 'Ice-Cold Drafts & Pints',
    caption: 'Cold domestic and craft pours waiting at the tap. (Placeholder Photo)',
    category: 'Food & Drinks',
    src: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=1200&q=80',
    alt: 'Frosty pints of draft beer on a wooden bar counter',
    isPlaceholder: true,
  },
  {
    id: 'gal-6',
    title: 'Friends Catching Up Over Drinks',
    caption: 'Good meal at a fair price, while sharing time with neighbors. (Placeholder Photo)',
    category: 'Bar & Atmosphere',
    src: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1200&q=80',
    alt: 'Friends clinking beer glasses at a relaxed neighborhood tavern',
    isPlaceholder: true,
  },
  {
    id: 'gal-7',
    title: 'Grilled Sourdough Melts & Sandwiches',
    caption: 'Home of the signature Ice & Fuel Breast Melt on toasted sourdough. (Placeholder Photo)',
    category: 'Food & Drinks',
    src: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=80',
    alt: 'Grilled sourdough melt sandwich with melted Swiss cheese and bacon',
    isPlaceholder: true,
  },
  {
    id: 'gal-8',
    title: 'Game-Day Watch Party Atmosphere',
    caption: 'Catch St. Louis sports, college games, and weekend matchups with the crowd. (Placeholder Photo)',
    category: 'Events',
    src: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1200&q=80',
    alt: 'Friends cheering during a game-day gathering at a neighborhood pub',
    isPlaceholder: true,
  },
  {
    id: 'gal-9',
    title: 'Loaded Pub Nachos & Starters',
    caption: 'Tortilla chips piled high with chili, melted cheeses, jalapeños, and homemade salsa. (Placeholder Photo)',
    category: 'Food & Drinks',
    src: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=1200&q=80',
    alt: 'Loaded nachos with melted cheddar and Monterey Jack cheese, jalapeños, and salsa',
    isPlaceholder: true,
  },
  {
    id: 'gal-10',
    title: 'Sunny Afternoon on the Patio',
    caption: 'A favorite stop in Downtown Kirkwood for dog-friendly afternoons and cold buckets. (Placeholder Photo)',
    category: 'Outdoor Patio',
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    alt: 'Afternoon seating area with warm lighting and casual tables',
    isPlaceholder: true,
  },
  {
    id: 'gal-11',
    title: 'Classic Bar Spirits & Cocktails',
    caption: 'Honest pours, classic cocktails, and no-nonsense service. (Placeholder Photo)',
    category: 'Bar & Atmosphere',
    src: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80',
    alt: 'Classic whiskey glass and bottles behind a neighborhood bar',
    isPlaceholder: true,
  },
  {
    id: 'gal-12',
    title: 'Weekend Gatherings & Local Nights',
    caption: 'Bring the crew for late-night bites and cold drinks. (Placeholder Photo)',
    category: 'Events',
    src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
    alt: 'Group of friends laughing and sharing drinks at a local bar event',
    isPlaceholder: true,
  },
];

/**
 * Clearly Labeled Placeholder Recurring Specials
 * Displayed when Supabase is not yet connected or until the owner replaces them in /admin.
 * Follows the strict rule: "Do not invent actual specials. Use clearly labeled placeholder entries until the owner supplies the correct specials."
 */
export const PLACEHOLDER_SPECIALS: SpecialItem[] = [
  {
    id: 'placeholder-mon',
    day_of_week: 'Monday',
    title: '[Placeholder] Monday Neighborhood Burger & Pint Feature',
    description:
      'Sample placeholder entry for Monday recurring food & drink specials. The owner can update or replace this anytime in the /admin dashboard without touching code.',
    price: 'Owner to Confirm',
    details: 'Sample Placeholder • Dine-In Recurring Special',
    category: 'Food & Drink',
    is_active: true,
    is_featured: true,
    is_placeholder: true,
    display_order: 1,
  },
  {
    id: 'placeholder-tue',
    day_of_week: 'Tuesday',
    title: '[Placeholder] Tuesday Wing & Bucket Night',
    description:
      'Sample placeholder entry for Tuesday recurring kitchen & bar specials. Edit title, description, and pricing directly in the Admin panel.',
    price: 'Owner to Confirm',
    details: 'Sample Placeholder • Recurring Weekly Feature',
    category: 'Food & Drink',
    is_active: true,
    is_featured: true,
    is_placeholder: true,
    display_order: 2,
  },
  {
    id: 'placeholder-wed',
    day_of_week: 'Wednesday',
    title: '[Placeholder] Midweek Sourdough Melt & Draft Feature',
    description:
      'Sample placeholder entry for Wednesday specials. Ready for owner customization via /admin.',
    price: 'Owner to Confirm',
    details: 'Sample Placeholder • Recurring Weekly Feature',
    category: 'Food',
    is_active: true,
    is_featured: false,
    is_placeholder: true,
    display_order: 3,
  },
  {
    id: 'placeholder-thu',
    day_of_week: 'Thursday',
    title: '[Placeholder] Thirsty Thursday Domestic Bucket & Appetizer Feature',
    description:
      'Sample placeholder entry for Thursday drink & starter specials. Toggle active status or edit details in /admin.',
    price: 'Owner to Confirm',
    details: 'Sample Placeholder • Recurring Weekly Feature',
    category: 'Drink',
    is_active: true,
    is_featured: true,
    is_placeholder: true,
    display_order: 4,
  },
  {
    id: 'placeholder-fri',
    day_of_week: 'Friday',
    title: '[Placeholder] Friday Whitefish Platter & Cold Pint Feature',
    description:
      'Sample placeholder entry for Friday specials. Easily managed through the owner dashboard.',
    price: 'Owner to Confirm',
    details: 'Sample Placeholder • Recurring Weekly Feature',
    category: 'Food & Drink',
    is_active: true,
    is_featured: false,
    is_placeholder: true,
    display_order: 5,
  },
  {
    id: 'placeholder-sat',
    day_of_week: 'Saturday',
    title: '[Placeholder] Saturday Patio & Game-Day Pitcher Special',
    description:
      'Sample placeholder entry for Saturday specials. Replace with real weekend bar or kitchen specials in /admin.',
    price: 'Owner to Confirm',
    details: 'Sample Placeholder • Recurring Weekly Feature',
    category: 'Food & Drink',
    is_active: true,
    is_featured: false,
    is_placeholder: true,
    display_order: 6,
  },
  {
    id: 'placeholder-sun',
    day_of_week: 'Sunday',
    title: '[Placeholder] Sunday Chili, Gumbo & Game-Day Feature',
    description:
      'Sample placeholder entry for Sunday specials. Update or disable in one click from /admin.',
    price: 'Owner to Confirm',
    details: 'Sample Placeholder • Recurring Weekly Feature',
    category: 'Food & Drink',
    is_active: true,
    is_featured: false,
    is_placeholder: true,
    display_order: 7,
  },
];

/**
 * Clearly Labeled Sample Event Templates (Not presented as actual scheduled events!)
 * Per instructions: "Support events such as live music, sports-related events, watch parties, and other local gatherings,
 * but do not invent actual scheduled events."
 * When no real events are published in Supabase yet, the Events page shows an honest empty state with a preview toggle for how event cards look.
 */
export const SAMPLE_EVENT_TEMPLATES: EventItem[] = [
  {
    id: 'template-watch-party',
    title: '[Sample Format] St. Louis Game-Day Watch Party',
    event_date: '2026-11-21',
    start_time: '6:00 PM',
    end_time: '10:00 PM',
    description:
      'Example of how a scheduled sports watch party card appears once published by the owner in /admin. No actual event is scheduled for this placeholder slot.',
    category: 'Watch Party',
    image_url:
      'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=900&q=80',
    external_link: 'https://www.facebook.com/iceandfuel/',
    additional_details: 'Sample Template Preview • Published via /admin',
    is_published: true,
    is_featured: true,
    is_placeholder: true,
  },
  {
    id: 'template-patio-night',
    title: '[Sample Format] Friday Night Patio Gathering & Live Tunes',
    event_date: '2026-11-27',
    start_time: '7:30 PM',
    end_time: '11:30 PM',
    description:
      'Example of how a live music or neighborhood patio night card appears when added through the Admin Dashboard.',
    category: 'Live Music & Patio',
    image_url:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80',
    external_link: 'https://www.facebook.com/iceandfuel/',
    additional_details: 'Sample Template Preview • No Cover',
    is_published: true,
    is_featured: false,
    is_placeholder: true,
  },
];
