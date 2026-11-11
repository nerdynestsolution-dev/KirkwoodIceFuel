import { MenuCategory } from '../types';

/**
 * Verified Menu & Pricing for Kirkwood Ice & Fuel.
 * Source: Official 569Dine Online Ordering Menu (https://www.569dine.com/glue/express/4750)
 *
 * IMPORTANT DATA INTEGRITY NOTE:
 * - Every food item, description, category, and price below is verified from Kirkwood Ice & Fuel's 569Dine menu.
 * - Because alcoholic beverages (draft beer, bottled beer, and cocktails) are not sold via 569Dine online ordering,
 *   the "Cold Beer, Cocktails & Full Bar" section is explicitly flagged for Owner Review rather than inventing drink prices.
 */
export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'appetizers-wings',
    name: 'Appetizers & Wings',
    subtitle: 'Famous 1-lb. chicken wings, St. Louis toasted ravioli, loaded nachos, and pub starters.',
    note: 'Wing sauces: Regular Hot, Honey Hot, Honey BBQ, or Teriyaki. Served with Ranch or Bleu Cheese.',
    verifiedSource: '569Dine',
    items: [
      {
        id: 'app-bone-in-wings',
        name: 'Hot Wings (Bone-In, 1 lb.)',
        description:
          '1 lb. of hot spicy chicken wings served with a side of ranch or bleu cheese. Also available in honey hot, honey BBQ, or teriyaki.',
        price: '$15.25',
        badge: 'House Favorite',
        image:
          'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80',
        verifiedSource: '569Dine',
      },
      {
        id: 'app-boneless-wings',
        name: 'Hot Wings (Boneless, 1 lb.)',
        description:
          '1 lb. of hot spicy boneless chicken wings served with a side of ranch or bleu cheese. Also available in honey hot, honey BBQ, or teriyaki.',
        price: '$15.25',
        verifiedSource: '569Dine',
      },
      {
        id: 'app-breaded-wings',
        name: 'Breaded Wings',
        description:
          'Seasoned breaded chicken wings served crispy with a side of your favorite dipping sauce.',
        price: '$15.25',
        verifiedSource: '569Dine',
      },
      {
        id: 'app-nachos',
        name: 'Nachos',
        description:
          'Crispy tortilla chips topped with beef chili, cheddar and Monterey Jack cheese, jalapeños, tomatoes, onions, and sour cream.',
        price: '$14.25',
        badge: 'Shareable',
        verifiedSource: '569Dine',
      },
      {
        id: 'app-chicken-strips',
        name: 'Chicken Strips',
        description: 'Boneless and crispy golden chicken tenders served with your choice of dipping sauce.',
        price: '$13.25',
        verifiedSource: '569Dine',
      },
      {
        id: 'app-breaded-mushrooms',
        name: 'Breaded Mushrooms',
        description: 'Golden breaded mushrooms sprinkled with parmesan cheese, served with horseradish sauce.',
        price: '$11.50',
        verifiedSource: '569Dine',
      },
      {
        id: 'app-toasted-ravioli',
        name: 'Toasted Ravioli',
        description: 'A St. Louis tradition—crispy breaded ravioli sprinkled with parmesan and served with marinara sauce.',
        price: '$11.25',
        badge: 'STL Classic',
        verifiedSource: '569Dine',
      },
      {
        id: 'app-chips-cheese',
        name: 'Chips and Cheese',
        description:
          'Tortilla chips topped with melted cheddar and Monterey Jack cheese with a side of homemade salsa. (Optional grilled chicken breast add-on available).',
        price: '$11.00',
        verifiedSource: '569Dine',
      },
      {
        id: 'app-mini-tacos',
        name: 'Mini Tacos',
        description:
          'Crunchy mini tacos served with homemade salsa and topped with melted Monterey Jack and cheddar cheese.',
        price: '$10.75',
        badge: 'Local Staple',
        verifiedSource: '569Dine',
      },
      {
        id: 'app-chips-salsa',
        name: 'Chips & Salsa',
        description: 'Crispy tortilla chips served with a side of our homemade salsa.',
        price: '$5.75',
        verifiedSource: '569Dine',
      },
    ],
  },
  {
    id: 'burgers',
    name: 'Charbroiled Burgers',
    subtitle: 'Signature charbroiled Fuel Burgers cooked to order and stacked hot.',
    note: 'Cheese choices: American, Bleu Cheese, Cheddar, Provolone, Pepper Jack, or Swiss.',
    verifiedSource: '569Dine',
    items: [
      {
        id: 'burg-fuel-burger',
        name: 'Fuel Burger',
        description: 'Our signature charbroiled classic house burger cooked to order with traditional toppings.',
        price: '$13.25',
        badge: 'Signature',
        verifiedSource: '569Dine',
      },
      {
        id: 'burg-fuel-cheeseburger',
        name: 'Fuel Cheeseburger',
        description:
          'Our signature charbroiled Fuel Burger topped with your choice of melted cheese (American, bleu, cheddar, provolone, pepper jack, or Swiss).',
        price: '$14.25',
        badge: 'Most Popular',
        image:
          'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
        verifiedSource: '569Dine',
      },
      {
        id: 'burg-ice-fuel-melt',
        name: 'Ice & Fuel Melt Burger',
        description:
          'Charbroiled Fuel Burger topped with melted Monterey Jack and cheddar cheese, crispy bacon, and grilled onions on grilled rye bread.',
        price: '$15.75',
        badge: 'House Specialty',
        verifiedSource: '569Dine',
      },
      {
        id: 'burg-bbq-bacon',
        name: 'BBQ Bacon Cheeseburger',
        description: 'Charbroiled burger topped with crispy bacon, tangy BBQ sauce, and melted cheese.',
        price: '$15.75',
        verifiedSource: '569Dine',
      },
      {
        id: 'burg-spicy-ranch-melt',
        name: 'Spicy Ranch Burger Melt',
        description:
          'Charbroiled burger topped with spicy ranch dressing, crispy onion straws, bacon, and melted pepper cheese on grilled sourdough.',
        price: '$15.75',
        verifiedSource: '569Dine',
      },
      {
        id: 'burg-chili-cheeseburger',
        name: 'Chili Cheeseburger',
        description: 'Signature charbroiled Fuel Burger topped with hearty beef chili and melted cheese.',
        price: '$15.25',
        verifiedSource: '569Dine',
      },
    ],
  },
  {
    id: 'sandwiches-melts',
    name: 'Sandwiches & Melts',
    subtitle: 'Grilled sourdough melts, hoagies, and pub classics.',
    verifiedSource: '569Dine',
    items: [
      {
        id: 'sand-ice-fuel-breast-melt',
        name: 'Ice & Fuel Breast Melt Sandwich',
        description:
          'Seasoned, charbroiled chicken breast on grilled sourdough with melted Swiss cheese, crispy bacon, and grilled onions.',
        price: '$15.75',
        badge: '#1 Melt',
        image:
          'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
        verifiedSource: '569Dine',
      },
      {
        id: 'sand-spicy-ranch-breast-melt',
        name: 'Spicy Ranch Breast Melt Sandwich',
        description:
          'Charbroiled chicken breast topped with spicy ranch dressing on grilled sourdough with pepper cheese and bacon.',
        price: '$15.75',
        verifiedSource: '569Dine',
      },
      {
        id: 'sand-sourdough-ranch-breast-melt',
        name: 'Sourdough Ranch Breast Melt Sandwich',
        description:
          'Charbroiled chicken breast topped with creamy ranch dressing on grilled sourdough with Swiss cheese and bacon.',
        price: '$15.75',
        verifiedSource: '569Dine',
      },
      {
        id: 'sand-steak',
        name: 'Steak Sandwich',
        description: '6 oz. top sirloin steak grilled to order on a toasted hoagie roll, served with French fries.',
        price: '$16.25',
        verifiedSource: '569Dine',
      },
      {
        id: 'sand-philly-beef',
        name: 'Philly Beef Sandwich',
        description:
          'Hot roast beef, cream cheese, grilled onions, and melted Swiss cheese served on a toasted hoagie bun.',
        price: '$15.25',
        verifiedSource: '569Dine',
      },
      {
        id: 'sand-buffalo-chicken-club',
        name: 'Buffalo Chicken Club Sandwich',
        description:
          'Crispy chicken strips tossed in spicy buffalo sauce, topped with Swiss cheese and bacon, served on a hoagie.',
        price: '$14.75',
        verifiedSource: '569Dine',
      },
      {
        id: 'sand-chicken-club',
        name: 'Chicken Club Sandwich',
        description: 'Crispy chicken strips topped with melted Swiss cheese and bacon, served on a hoagie.',
        price: '$14.50',
        verifiedSource: '569Dine',
      },
      {
        id: 'sand-cajun-chicken',
        name: 'Cajun Chicken Breast Sandwich',
        description: 'Charbroiled chicken breast seasoned with Cajun spices and topped with melted pepper cheese.',
        price: '$14.25',
        verifiedSource: '569Dine',
      },
      {
        id: 'sand-sub-zero',
        name: 'Sub Zero Sandwich (Hot or Cold)',
        description:
          'Ham, turkey, roast beef, provolone cheese, lettuce, tomato, onion, and Italian dressing on a hoagie roll.',
        price: '$14.25',
        verifiedSource: '569Dine',
      },
      {
        id: 'sand-french-dip',
        name: 'French Dip Sandwich',
        description: 'Tender roast beef piled on a hoagie roll and served with warm au jus for dipping.',
        price: '$14.00',
        verifiedSource: '569Dine',
      },
      {
        id: 'sand-fried-fish',
        name: 'Fried Fish Sandwich',
        description: 'Golden breaded whitefish fillet served hot on a hoagie bun.',
        price: '$14.00',
        verifiedSource: '569Dine',
      },
      {
        id: 'sand-reuben',
        name: 'Reuben Sandwich',
        description:
          'Classic corned beef grilled on rye bread with melted Swiss cheese, tangy sauerkraut, and Thousand Island dressing.',
        price: '$13.75',
        verifiedSource: '569Dine',
      },
      {
        id: 'sand-hot-turkey-melt',
        name: 'Hot Turkey Melt Sandwich',
        description:
          'Warm sliced turkey with melted Swiss cheese on grilled sourdough (ham or roast beef substitution available).',
        price: '$13.50',
        verifiedSource: '569Dine',
      },
      {
        id: 'sand-tuna-melt',
        name: 'Tuna Melt Sandwich',
        description: 'House tuna salad served warm on grilled rye bread with melted Swiss cheese.',
        price: '$13.00',
        verifiedSource: '569Dine',
      },
      {
        id: 'sand-chicken-breast',
        name: 'Chicken Breast Sandwich',
        description: 'Classic seasoned, charbroiled chicken breast served on a toasted bun.',
        price: '$12.00',
        verifiedSource: '569Dine',
      },
    ],
  },
  {
    id: 'tacos-quesadillas-wraps',
    name: 'Tacos, Quesadillas & Wraps',
    subtitle: 'Soft tortilla tacos, grilled quesadillas, and rolled flour tortilla wraps.',
    note: 'Tacos (3 per order) & Quesadillas include homemade salsa and sour cream (guacamole available upon request).',
    verifiedSource: '569Dine',
    items: [
      {
        id: 'taco-steak',
        name: 'Steak Tacos (3)',
        description:
          'Grilled seasoned sirloin on three soft tortillas with shredded lettuce, tomatoes, red onion, homemade salsa, and sour cream.',
        price: '$16.25',
        verifiedSource: '569Dine',
      },
      {
        id: 'taco-cajun-chicken',
        name: 'Cajun Chicken Tacos (3)',
        description:
          'Grilled Cajun-spiced chicken on three soft tortillas with shredded lettuce, tomatoes, red onion, homemade salsa, and sour cream.',
        price: '$15.00',
        verifiedSource: '569Dine',
      },
      {
        id: 'taco-chicken',
        name: 'Chicken Tacos (3)',
        description:
          'Grilled chicken breast on three soft tortillas with shredded lettuce, tomatoes, red onion, homemade salsa, and sour cream.',
        price: '$14.75',
        verifiedSource: '569Dine',
      },
      {
        id: 'taco-fish',
        name: 'Fish Tacos (3)',
        description:
          'Seasoned grilled whitefish on three soft tortillas with shredded lettuce, tomatoes, red onion, homemade salsa, and sour cream.',
        price: '$14.75',
        verifiedSource: '569Dine',
      },
      {
        id: 'ques-steak',
        name: 'Steak Quesadilla',
        description: 'Grilled flour tortilla filled with seasoned steak and melted cheeses, served with homemade salsa and sour cream.',
        price: '$15.25',
        verifiedSource: '569Dine',
      },
      {
        id: 'ques-bbq-bacon-burger',
        name: 'BBQ Bacon Cheeseburger Quesadilla',
        description: 'Burger, crispy bacon, tangy BBQ sauce, and melted cheeses in a grilled tortilla with salsa and sour cream.',
        price: '$15.25',
        verifiedSource: '569Dine',
      },
      {
        id: 'ques-crispy-chicken-bacon-ranch',
        name: 'Crispy Chicken Bacon Ranch Quesadilla',
        description: 'Crispy chicken, bacon, ranch dressing, and melted cheeses served with homemade salsa and sour cream.',
        price: '$14.75',
        verifiedSource: '569Dine',
      },
      {
        id: 'ques-buffalo-chicken',
        name: 'Buffalo Chicken Quesadilla',
        description: 'Buffalo chicken and melted cheeses in a grilled tortilla, served with homemade salsa and sour cream.',
        price: '$14.25',
        verifiedSource: '569Dine',
      },
      {
        id: 'ques-grilled-chicken',
        name: 'Grilled Chicken Quesadilla',
        description: 'Charbroiled chicken breast and melted cheeses served with homemade salsa and sour cream.',
        price: '$13.75',
        verifiedSource: '569Dine',
      },
      {
        id: 'ques-corn-black-bean',
        name: 'Corn & Black Bean Quesadilla',
        description: 'Sweet corn, black beans, and melted cheeses served with homemade salsa and sour cream.',
        price: '$13.00',
        verifiedSource: '569Dine',
      },
      {
        id: 'ques-cheese',
        name: 'Cheese Quesadilla',
        description: 'Melted cheeses inside a crisp grilled tortilla, served with homemade salsa and sour cream.',
        price: '$11.00',
        verifiedSource: '569Dine',
      },
      {
        id: 'wrap-chicken-caesar',
        name: 'Chicken Caesar Wrap',
        description: 'Grilled chicken, chopped romaine, shredded parmesan cheese, and Caesar dressing in a flour tortilla.',
        price: '$13.75',
        verifiedSource: '569Dine',
      },
      {
        id: 'wrap-chicken-bacon-ranch',
        name: 'Chicken Bacon Ranch Wrap',
        description: 'Grilled chicken, crispy bacon, shredded cheese, and lettuce with ranch dressing in a flour tortilla.',
        price: '$13.75',
        verifiedSource: '569Dine',
      },
      {
        id: 'wrap-buffalo-chicken',
        name: 'Buffalo Chicken Wrap',
        description: 'Grilled chicken, shredded cheese, crisp lettuce, and spicy hot wing sauce in a flour tortilla.',
        price: '$13.75',
        verifiedSource: '569Dine',
      },
      {
        id: 'wrap-turkey-bacon-avocado',
        name: 'Turkey Bacon Avocado Wrap',
        description: 'Sliced turkey, crispy bacon, avocado, lettuce, and shredded cheese wrapped in a flour tortilla.',
        price: '$11.75',
        verifiedSource: '569Dine',
      },
      {
        id: 'wrap-veggie',
        name: 'Veggie Wrap',
        description:
          'Fresh lettuce, tomato, onion, cucumber, and shredded cheese with your choice of spicy mustard or special dill sauce.',
        price: '$10.75',
        verifiedSource: '569Dine',
      },
    ],
  },
  {
    id: 'soups-salads',
    name: 'Soups & Salads',
    subtitle: 'Crisp house salads, homestyle beef chili, and Cajun seafood gumbo.',
    note: 'Available dressings: Ranch, Bleu Cheese, 1000 Island, Honey Dijon, Light Italian, Raspberry Vinaigrette, Vinegar & Oil, or Poppyseed.',
    verifiedSource: '569Dine',
    items: [
      {
        id: 'sal-grilled-chicken',
        name: 'House Salad with Grilled Chicken',
        description:
          'Grilled chicken breast over mixed greens with tomatoes, cucumbers, carrots, red onion, and cabbage, topped with provolone cheese and your choice of dressing.',
        price: '$12.00',
        badge: 'Popular',
        verifiedSource: '569Dine',
      },
      {
        id: 'sal-chili-combo',
        name: 'Chili & Salad Combo',
        description: 'A warm cup of our hearty beef chili paired with a fresh house side salad.',
        price: '$12.50',
        verifiedSource: '569Dine',
      },
      {
        id: 'sal-house-small',
        name: 'House Salad (Small)',
        description:
          'Mixed greens with tomatoes, cucumbers, carrots, red onion, and cabbage, topped with provolone cheese and your choice of dressing.',
        price: '$8.00',
        verifiedSource: '569Dine',
      },
      {
        id: 'soup-beef-chili',
        name: 'Beef Chili',
        description: 'Hearty homestyle beef chili served hot in a cup or bowl.',
        price: '$6.00 / $8.50',
        secondaryPriceLabel: 'Cup $6.00 • Bowl $8.50',
        verifiedSource: '569Dine',
      },
      {
        id: 'soup-seafood-gumbo',
        name: 'Cajun Seafood Gumbo',
        description: 'Flavorful New Orleans-style seafood gumbo with a kick of Cajun spice.',
        price: '$6.00 / $8.50',
        secondaryPriceLabel: 'Cup $6.00 • Bowl $8.50',
        verifiedSource: '569Dine',
      },
    ],
  },
  {
    id: 'entrees-platters',
    name: 'Entrees, Kids & Sides',
    subtitle: 'Hearty steak and whitefish platters, sides, and kids’ meals.',
    verifiedSource: '569Dine',
    items: [
      {
        id: 'ent-ny-strip',
        name: 'New York Strip Steak (12 oz.)',
        description: '12 oz. New York strip steak grilled to order, served with your choice of French fries or onion rings.',
        price: '$21.75',
        badge: '12 oz. Cut',
        verifiedSource: '569Dine',
      },
      {
        id: 'ent-grilled-whitefish',
        name: 'Grilled Whitefish Platter',
        description: 'Seasoned and grilled whitefish fillet served with French fries and creamy coleslaw.',
        price: '$15.00',
        verifiedSource: '569Dine',
      },
      {
        id: 'ent-fried-fish',
        name: 'Fried Fish Platter',
        description: 'Crispy breaded whitefish fillet served with French fries and creamy coleslaw.',
        price: '$15.00',
        verifiedSource: '569Dine',
      },
      {
        id: 'side-onion-rings',
        name: 'Side of Onion Rings',
        description: 'Crispy golden beer-battered style onion rings.',
        price: '$2.50',
        verifiedSource: '569Dine',
      },
      {
        id: 'kids-cheeseburger',
        name: "Kid's Cheeseburger",
        description: 'Served with choice of French fries, seasoned fries, or potato chips.',
        price: '$5.50',
        verifiedSource: '569Dine',
      },
      {
        id: 'kids-breaded-wings',
        name: "Kid's Breaded Wings",
        description: 'Served with choice of French fries, seasoned fries, or potato chips.',
        price: '$5.50',
        verifiedSource: '569Dine',
      },
      {
        id: 'kids-burger',
        name: "Kid's Burger",
        description: 'Served with choice of French fries, seasoned fries, or potato chips.',
        price: '$5.00',
        verifiedSource: '569Dine',
      },
      {
        id: 'kids-toasted-ravioli',
        name: "Kid's Toasted Ravioli",
        description: 'Served with choice of French fries, seasoned fries, or potato chips.',
        price: '$5.00',
        verifiedSource: '569Dine',
      },
      {
        id: 'kids-hot-dog',
        name: "Kid's Hot Dog",
        description: 'Served with choice of French fries, seasoned fries, or potato chips.',
        price: '$5.00',
        verifiedSource: '569Dine',
      },
      {
        id: 'kids-grilled-cheese',
        name: "Kid's Grilled Cheese",
        description: 'Served with choice of French fries, seasoned fries, or potato chips.',
        price: '$4.50',
        verifiedSource: '569Dine',
      },
    ],
  },
  {
    id: 'beer-cocktails',
    name: 'Beer, Cocktails & Full Bar',
    subtitle: 'Ice-cold draft pours, domestic & craft bottles, buckets, and classic bar drinks served in-house.',
    note: 'Owner Review Flag: Because alcoholic drinks are not listed on the 569Dine pickup/delivery menu, specific tap list names and drink prices are flagged below for owner confirmation.',
    verifiedSource: 'OwnerReviewRequired',
    items: [
      {
        id: 'drink-draft-beer',
        name: 'Ice-Cold Draft Beer Selection',
        description:
          'Rotating and classic domestic and local St. Louis draft beers poured cold at the bar or on the patio. Ask your bartender for current taps.',
        price: 'In-House (Verify Pricing)',
        badge: 'Owner Review Flagged',
        verifiedSource: 'OwnerReviewRequired',
      },
      {
        id: 'drink-bottles-buckets',
        name: 'Bottled Beer, Cans & Domestic Buckets',
        description:
          'Full lineup of domestic favorites, imports, seltzers, and ice-cold beer buckets for the table or patio.',
        price: 'In-House (Verify Pricing)',
        badge: 'Owner Review Flagged',
        verifiedSource: 'OwnerReviewRequired',
      },
      {
        id: 'drink-cocktails-spirits',
        name: 'Full Bar, Whiskey & Mixed Drinks',
        description:
          'Honest pours of bourbon, whiskey, vodka, tequila, rum, gin, and classic neighborhood bar cocktails.',
        price: 'In-House (Verify Pricing)',
        badge: 'Owner Review Flagged',
        verifiedSource: 'OwnerReviewRequired',
      },
    ],
  },
];

export const FEATURED_MENU_HIGHLIGHTS = [
  {
    id: 'feat-breast-melt',
    name: 'Ice & Fuel Breast Melt',
    category: 'Signature Melt',
    price: '$15.75',
    description:
      'Seasoned, charbroiled chicken breast on grilled sourdough with melted Swiss cheese, crispy bacon, and grilled onions.',
    image:
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'feat-fuel-cheeseburger',
    name: 'Fuel Cheeseburger',
    category: 'Charbroiled Burger',
    price: '$14.25',
    description:
      'Our classic charbroiled house burger cooked to order and stacked with your choice of American, bleu, cheddar, provolone, pepper jack, or Swiss.',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'feat-hot-wings',
    name: '1-Lb. Hot Wings (Bone-In or Boneless)',
    category: 'Pub Favorite',
    price: '$15.25',
    description:
      'A full pound of spicy wings served with ranch or bleu cheese—or tossed in honey hot, honey BBQ, or teriyaki.',
    image:
      'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'feat-philly-beef',
    name: 'Philly Beef & Sourdough Melts',
    category: 'Hoagies & Melts',
    price: '$15.25',
    description:
      'Hot roast beef, cream cheese, grilled onions, and melted Swiss cheese on a warm hoagie bun.',
    image:
      'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=900&q=80',
  },
];
