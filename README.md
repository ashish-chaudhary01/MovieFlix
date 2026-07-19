# Movie App

A modern movie and TV show discovery app built with React Router and TypeScript. The application lets users explore trending content, browse popular movies and series, search for titles, and open detailed information pages for each item.

## Features

- Browse trending movies and TV shows
- View top-rated, now-playing, and weekly trending movie sections
- Explore detailed movie and series pages with cast and trailer information
- Search movies and series instantly
- Responsive UI with a clean, modern layout

## Tech Stack

- React
- TypeScript
- React Router
- TanStack Query
- Tailwind CSS
- React Icons
- Vite

## Project Structure

- app/routes: page-level routes such as home, movies, TV shows, search, and watchlist
- app/components: reusable UI components like cards, grids, hero sections, and layout elements
- app/services: API integration and data fetching logic
- public: static assets such as icons and images

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a .env file in the project root and add your API credentials:

```env
VITE_API_URL=https://api.themoviedb.org/3
VITE_API_TOKEN=your_api_token_here
```

### 3. Run the development server

```bash
npm run dev
```

The app will start locally in your browser.

## Available Scripts

- npm run dev: start the development server
- npm run build: build the app for production
- npm run start: run the production build
- npm run typecheck: run TypeScript type checking

## Notes

This project is actively being improved with more features such as authentication, a real watchlist backend, and enhanced media details experience.
