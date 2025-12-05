# Otakudesu API

REST API untuk scraping data anime dari [Otakudesu](https://otakudesu.best). Dibangun dengan Next.js.

## Live Demo

API sudah deploy dan siap digunakan di:
- **Website & Docs:** `https://otkuds-api.vercel.app/`
- **Base API URL:** `https://otkuds-api.vercel.app/api/`

## Features

- Homepage data (ongoing & completed anime)
- Ongoing anime list dengan pagination
- Completed anime list dengan pagination
- Anime list A-Z
- Anime detail (info, synopsis, episodes)
- Episode detail dengan streaming servers & download links
- Genre list & filter by genre
- Weekly release schedule
- Search anime
- Resolve streaming URL
- Beautiful documentation homepage

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Scraping:** Axios + Cheerio
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

## Installation

```bash
npm install
```

## Running the app

```bash
# development
npm run dev

# production build
npm run build

# production mode
npm start
```

Server akan berjalan di `http://localhost:3000`

## API Endpoints

### Home
- `GET /api/home` - Get homepage data (ongoing & completed anime)

### Anime
- `GET /api/ongoing?page=1` - Get ongoing anime list
- `GET /api/complete?page=1` - Get completed anime list
- `GET /api/anime-list` - Get all anime list (A-Z)
- `GET /api/anime/:slug` - Get anime detail

### Episode
- `GET /api/episode/:slug` - Get episode detail with streaming & download links

### Genre
- `GET /api/genres` - Get all genres
- `GET /api/genres/:genre?page=1` - Get anime by genre

### Schedule
- `GET /api/schedule` - Get weekly release schedule

### Search
- `GET /api/search?q=query` - Search anime

### Streaming
- `POST /api/resolve-streaming` - Resolve streaming URL (Body: `{"dataContent": "base64"}`)
- `GET /api/resolve-streaming/:dataContent` - Resolve streaming URL (GET method)

## Contoh Penggunaan

### Get Homepage
```bash
curl https://otkuds-api.vercel.app/api/home
```

### Get Ongoing Anime
```bash
curl https://otkuds-api.vercel.app/api/ongoing?page=1
```

### Search Anime
```bash
curl "https://otkuds-api.vercel.app/api/search?q=one+punch"
```

### Get Anime Detail
```bash
curl https://otkuds-api.vercel.app/api/anime/one-punch-man-s3-sub-indo
```

### Get Episode Detail
```bash
curl https://otkuds-api.vercel.app/api/episode/onpm-s3-episode-8-sub-indo
```

## Response Format

Semua response menggunakan format konsisten:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "OK",
  "data": { ... },
  "timestamp": "2024-12-05T10:00:00.000Z"
}
```

## Project Structure

```
app/
├── api/                  # API Routes
│   ├── home/
│   ├── ongoing/
│   ├── complete/
│   ├── anime-list/
│   ├── anime/[slug]/
│   ├── episode/[slug]/
│   ├── genres/
│   ├── schedule/
│   ├── search/
│   └── resolve-streaming/
├── page.tsx             # Documentation homepage
├── layout.tsx
└── globals.css
lib/
└── otakudesu.ts        # Scraping utilities
```

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push code ke GitHub
2. Import project di Vercel
3. Deploy otomatis akan berjalan
4. API siap digunakan!

## Disclaimer

API ini hanya untuk keperluan edukasi. Semua konten anime berasal dari Otakudesu. Gunakan dengan bijak.

## License

MIT
