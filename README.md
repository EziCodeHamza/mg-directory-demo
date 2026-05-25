# The Mastectomy Guide — Certified Therapist Directory

A web application that connects patients with certified post-mastectomy massage therapists. Built for [The Mastectomy Guide](https://mastectomyguide.com).

## Features

- **Interactive Directory** — Browse certified therapists on a synced map + listing layout
- **Search & Filter** — Find therapists by name, city, specialty, or country
- **Individual Profiles** — Detailed therapist pages with bio, specialties, contact info, and embedded map
- **Application Form** — New therapists can apply to be listed in the directory
- **Responsive Design** — Works on desktop, tablet, and mobile with a map toggle on small screens
- **Google Maps Integration** — Real Google Maps when API key is provided; beautiful fallback map when not

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS v4** for styling
- **React Router** (HashRouter) for client-side routing
- **@react-google-maps/api** for Google Maps integration

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Google Maps API Key (Optional)

The app works beautifully without a Google Maps API key — it shows an interactive fallback map. For the full Google Maps experience:

1. Get an API key from the [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the "Maps JavaScript API"
3. Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

4. Edit `.env.local` and add your key:

```
VITE_GOOGLE_MAPS_API_KEY=your_actual_key_here
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Production Build

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Site header with MG branding and navigation
│   ├── FilterBar.tsx       # Search input and country filter dropdown
│   ├── TherapistCard.tsx   # Listing card for the directory sidebar
│   └── MapView.tsx         # Google Maps with custom markers + fallback map
├── data/
│   └── therapists.json     # Mock therapist data (12 entries)
├── pages/
│   ├── HomePage.tsx        # Main directory page (listings + map)
│   ├── TherapistPage.tsx   # Individual therapist profile
│   └── ApplyPage.tsx       # New therapist application form
├── types.ts                # TypeScript interfaces
├── App.tsx                 # Router configuration
├── main.tsx                # Entry point
└── index.css               # Tailwind CSS theme and custom styles
```

## Adding Therapists

To add a new therapist, edit `src/data/therapists.json` and add a new entry:

```json
{
  "id": "13",
  "slug": "jane-smith",
  "name": "Jane Smith",
  "photo": "https://i.pravatar.cc/150?img=47",
  "city": "Edmonton",
  "province": "AB",
  "country": "Canada",
  "lat": 53.5461,
  "lng": -113.4938,
  "specialties": ["Post-Mastectomy Massage", "Lymphatic Drainage"],
  "bio": "Jane is a registered massage therapist based in Edmonton...",
  "email": "jane.smith@example.com",
  "website": "https://janesmithrmt.com"
}
```

**Important:** Always include accurate `lat` and `lng` coordinates. The map uses these hardcoded coordinates instead of dynamic geocoding for reliability.

## Deploying to Vercel

1. Push your code to a Git repository
2. Connect the repository to [Vercel](https://vercel.com)
3. Add the `VITE_GOOGLE_MAPS_API_KEY` environment variable in Vercel's project settings
4. Deploy

For a simple static deployment, the `dist/` folder can be served by any static file host.

## Design

- **Colors:** Navy (#0B1C2C) + Gold (#C9A84C) — matching The Mastectomy Guide's brand
- **Fonts:** Playfair Display (headings) + Inter (body)
- **Mobile-first responsive design**
- **Map-listing sync:** Clicking a card highlights the map pin; clicking a pin scrolls to the card

## Notes

- All data comes from the local JSON file — no backend required
- The map fallback component provides a fully interactive experience without any API key
- Avatars are served from [pravatar.cc](https://pravatar.cc) as placeholders
- The app uses `HashRouter` for compatibility with single-file builds and static hosting
