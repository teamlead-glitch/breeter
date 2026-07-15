export const vehicles = [
  {
    id: 'hatchback',
    name: 'Hatchback',
    model: 'Wagon R / Tata Tiago / Similar',
    category: 'Hatchback',
    seats: 4,
    startingFare: 2000,
    image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sedan',
    name: 'Sedan',
    model: 'Dzire / Honda Amaze / Similar',
    category: 'Sedan',
    seats: 4,
    startingFare: 2500,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'suv',
    name: 'SUV',
    model: 'Fortuner / Innova Crysta / Similar',
    category: 'SUV',
    seats: 7,
    startingFare: 3800,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'tempo-traveller',
    name: 'Tempo Traveller',
    model: 'Force Traveller · AC 12 Seat',
    category: 'Tempo Traveller',
    seats: 12,
    startingFare: 6000,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=600&q=80',
  },
]

export type Vehicle = (typeof vehicles)[0]

export const packages = [
  {
    slug: 'munnar-hills',
    name: 'Munnar Hills',
    nights: 3,
    days: 4,
    location: 'Kerala',
    tags: ['Hill Station', 'Family', 'Honeymoon'],
    price: 12500,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    overview:
      'A refreshing getaway to the lush green hills of Munnar, famous for sprawling tea estates, misty mountains, and cool climate. Perfect for families, couples, and nature lovers seeking tranquility.',
    itinerary: [
      { day: 1, title: 'Arrival & local sightseeing', desc: 'Arrive in Munnar, check-in, visit Mattupetti Lake and Echo Point.' },
      { day: 2, title: 'Tea gardens & Eravikulam NP', desc: 'Explore Eravikulam National Park, tea museum, and Top Station.' },
      { day: 3, title: 'Waterfalls & Spice market', desc: 'Visit Attukal Waterfall, local spice gardens and markets.' },
      { day: 4, title: 'Departure', desc: 'Morning at leisure, check-out and departure.' },
    ],
    inclusions: ['Accommodation (3 nights)', 'Daily breakfast', 'Private cab & driver', 'Sightseeing per itinerary'],
    exclusions: ['Air / train fare', 'Lunch & dinner', 'Entry tickets', 'Personal expenses'],
  },
  {
    slug: 'kerala-backwaters',
    name: 'Kerala Backwaters',
    nights: 2,
    days: 3,
    location: 'Kerala',
    tags: ['Houseboat', 'Romantic', 'Waterways'],
    price: 9500,
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=80',
    overview:
      "Cruise through the iconic backwaters of Kerala aboard a traditional houseboat. Experience the serene waterways of Alleppey, rich local culture, and tranquil sunsets.",
    itinerary: [
      { day: 1, title: 'Arrival & houseboat check-in', desc: 'Arrive in Alleppey, board your private houseboat and set sail.' },
      { day: 2, title: 'Village life & canoe ride', desc: 'Morning canoe through narrow canals, explore local fishing villages.' },
      { day: 3, title: 'Check-out & departure', desc: 'Morning breakfast on the houseboat, check-out and departure.' },
    ],
    inclusions: ['Houseboat stay (2 nights)', 'All meals on board', 'Canoe ride', 'Welcome drink'],
    exclusions: ['Transport to Alleppey', 'Entry tickets', 'Alcoholic beverages', 'Tips'],
  },
  {
    slug: 'char-dham-yatra',
    name: 'Char Dham Yatra',
    nights: 10,
    days: 11,
    location: 'Uttarakhand',
    tags: ['Pilgrimage', 'Mountains', 'Spiritual'],
    price: 42000,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    overview:
      'A sacred journey through the four holy shrines of Yamunotri, Gangotri, Kedarnath, and Badrinath — a divine pilgrimage through the majestic Himalayas.',
    itinerary: [
      { day: 1, title: 'Haridwar arrival', desc: 'Arrive in Haridwar, hotel check-in and Ganga Aarti at Har Ki Pauri.' },
      { day: 2, title: 'Haridwar to Barkot', desc: 'Drive to Barkot, overnight stay, evening prayers.' },
      { day: 3, title: 'Yamunotri darshan', desc: 'Trek to Yamunotri temple, holy dip in Surya Kund.' },
      { day: 4, title: 'Gangotri', desc: 'Drive through Uttarkashi to Gangotri temple.' },
    ],
    inclusions: ['Accommodation (10 nights)', 'Daily breakfast & dinner', 'Private cab & driver', 'Expert guide'],
    exclusions: ['Airfare', 'Pony / palanquin charges', 'Entry tickets', 'Puja expenses'],
  },
  {
    slug: 'goa-getaway',
    name: 'Goa Getaway',
    nights: 3,
    days: 4,
    location: 'Goa',
    tags: ['Beach', 'Nightlife', 'Seafood'],
    price: 15000,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    overview:
      "Sun, sand, and sea — Goa's iconic beaches, vibrant nightlife, and Portuguese heritage make it India's ultimate holiday destination.",
    itinerary: [
      { day: 1, title: 'Arrival & beach time', desc: 'Arrive in Goa, check-in, relax on the beach, sunset cruise.' },
      { day: 2, title: 'North Goa sightseeing', desc: 'Visit Fort Aguada, Calangute, Baga and Anjuna beaches.' },
      { day: 3, title: 'South Goa tour', desc: 'Old Goa churches, Palolem beach, Dudhsagar viewpoint.' },
      { day: 4, title: 'Departure', desc: 'Morning at leisure, check-out and departure.' },
    ],
    inclusions: ['Accommodation (3 nights)', 'Daily breakfast', 'Cab transfers', 'Sunset cruise'],
    exclusions: ['Airfare', 'Lunch & dinner', 'Entry tickets', 'Water sports'],
  },
  {
    slug: 'wayanad-wild',
    name: 'Wayanad Wild',
    nights: 2,
    days: 3,
    location: 'Kerala',
    tags: ['Wildlife', 'Trekking', 'Forest'],
    price: 8500,
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    overview:
      "Wayanad's dense forests, tribal culture, ancient caves, and wildlife sanctuary offer an authentic forest getaway for nature lovers and trekkers.",
    itinerary: [
      { day: 1, title: 'Arrival & Banasura Sagar', desc: 'Arrive in Wayanad, boat ride on Banasura Sagar dam reservoir.' },
      { day: 2, title: 'Chembra Peak trek', desc: 'Full day trek to Chembra Peak and the heart-shaped lake.' },
      { day: 3, title: 'Edakkal Caves & departure', desc: 'Visit Edakkal Caves with prehistoric rock art, then depart.' },
    ],
    inclusions: ['Accommodation (2 nights)', 'Daily breakfast', 'Cab & driver', 'Trek guide'],
    exclusions: ['Airfare', 'Entry tickets', 'Meals except breakfast', 'Personal expenses'],
  },
  {
    slug: 'ooty-coonoor',
    name: 'Ooty & Coonoor',
    nights: 3,
    days: 4,
    location: 'Tamil Nadu',
    tags: ['Hill Station', 'Tea', 'Toy Train'],
    price: 11000,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
    overview:
      "The Queen of Hill Stations — Ooty's toy train, botanical gardens, pristine lakes and Coonoor's tea estates offer a perfect South Indian hill getaway.",
    itinerary: [
      { day: 1, title: 'Arrival & Ooty Lake', desc: 'Arrive in Ooty, check-in, boat ride on Ooty Lake.' },
      { day: 2, title: 'Botanical Gardens & Doddabetta', desc: 'Government Botanical Garden, Doddabetta peak, Rose Garden.' },
      { day: 3, title: 'Coonoor day trip', desc: "Visit Sim's Park, Lamb's Rock, toy train ride." },
      { day: 4, title: 'Departure', desc: 'Morning at leisure and departure.' },
    ],
    inclusions: ['Accommodation (3 nights)', 'Daily breakfast', 'Cab & driver', 'Toy train ticket'],
    exclusions: ['Airfare', 'Entry tickets', 'Lunch & dinner', 'Personal expenses'],
  },
]

export type Package = (typeof packages)[0]

export const whyBreeter = [
  {
    icon: 'shield',
    title: 'Transparent pricing',
    desc: 'No hidden charges. What you see is what you pay. Tolls, state tax & driver allowance — all included in your fare.',
  },
  {
    icon: 'star',
    title: 'Verified local operators',
    desc: 'Every cab and driver is background-checked and verified. Neat, clean vehicles with qualified drivers, every time.',
  },
  {
    icon: 'wallet',
    title: 'Book with 20% advance',
    desc: 'Secure your ride with just 20% upfront. Pay the balance directly to the driver after your trip.',
  },
]

export const busVanOptions = [
  { name: 'Van · 7 Seat', model: 'Kia Carens / Force Gurkha / Similar', seats: 7, fare: 4000, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=600&q=80' },
  { name: 'Tempo Traveller', model: 'Force Traveller · AC 12 Seat', seats: 12, fare: 6000, image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=600&q=80' },
  { name: 'Force Urbania', model: 'Force Urbania · AC 13 Seat', seats: 13, fare: 7500, image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=600&q=80' },
  { name: 'Mini Bus', model: 'AC · 20 Seat', seats: 20, fare: 9000, image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=600&q=80' },
]

export const luxuryVehicles = [
  { id: 'luxury-sedan', name: 'Luxury Sedan', model: 'BMW 5 Series / Mercedes E-Class', category: 'Luxury', seats: 4, startingFare: 6500, image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80' },
  { id: 'luxury-suv', name: 'Luxury SUV', model: 'BMW X5 / Mercedes GLC / Similar', category: 'Luxury', seats: 6, startingFare: 8500, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80' },
  { id: 'exec-sedan', name: 'Executive Sedan', model: 'Toyota Camry / Skoda Octavia', category: 'Luxury', seats: 4, startingFare: 9500, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80' },
]
