# Timeis - Online Datetime Utility

An online datetime utility tool built with React and Material-UI, providing various date/time conversion and calculation features.

## Features

### Current Time Display
- **Current Datetime**: Displays the current date and time with multiple format options (Locale, ISO 8601, RFC 3339, UTC, Date Only, Time Only)
- **Current Timestamp**: Shows the current Unix timestamp with one-click copy functionality
- **Format Selection**: Dropdown menu to switch between different datetime display formats
- **Copy to Clipboard**: Copy buttons for both datetime and timestamp values

### World Clock
- Displays current time for major cities around the world
- Supported cities: New York (EST), London (GMT), Dubai (GST), Tokyo (JST)
- Auto-updates every second

### Year Progress
- Visual progress bar showing the current year's progress
- Displays day of year and week number
- Auto-updates every minute

### Date Calculator
- **Date Difference**: Calculate the number of days between two dates
- **Date Math**: Add/subtract years, months, weeks, and days from a base date

### Lunar Calendar Converter
- Convert Gregorian dates to Chinese Lunar calendar
- Displays lunar year (GanZhi), lunar month and day
- Shows solar terms (JieQi) and festivals

### Timestamp Converter
- **Generate Timestamp**: Programming reference for generating timestamps in various languages
- **Timestamp to Datetime**: Convert Unix timestamps to local and UTC datetime
- **Datetime to Timestamp**: Convert datetime to Unix timestamps (seconds and milliseconds)
  - Date picker and time picker for easy input

## Tech Stack

- **Frontend Framework**: React 19.2 with TypeScript
- **Routing**: React Router v7.13
- **UI Library**: Material-UI (MUI) v7.3
- **Styling**: Emotion (CSS-in-JS)
- **State Management**: Jotai
- **Date/Time Handling**: Luxon, lunar-javascript
- **Build Tool**: Vite v7.1
- **Testing**: Vitest
- **Deployment**: Cloudflare Workers (Wrangler)

## Internationalization

Supports 6 languages:
- Chinese (简体中文)
- English
- Spanish (Español)
- French (Français)
- Japanese (日本語)
- Portuguese (Português)

## Development

### Prerequisites
- Node.js
- pnpm (package manager)

### Install Dependencies
```bash
pnpm install
```

### Start Development Server
```bash
pnpm dev
```
The dev server runs on `http://localhost:1420`

### Build for Production
```bash
pnpm build
```

### Run Tests
```bash
pnpm test
```

### Preview Production Build
```bash
pnpm preview
```

### Deploy to Cloudflare Workers
```bash
pnpm start
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── layout/          # Layout components (navbar, theme, language)
├── locales/         # Internationalization texts
├── pages/           # Page components
│   └── datetime/    # Main datetime tool pages
├── utils/           # Utility functions (clipboard, storage)
├── main.tsx         # Application entry point
└── vite-env.d.ts    # TypeScript declarations
```

## License

MIT
