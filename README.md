# Vigil Dashboard

A modern real-time monitoring dashboard for tracking the health and performance of HTTP endpoints. Built with React and Vite, this project provides a responsive interface for observing uptime, latency, and recent checks across your monitored services.

The dashboard is designed to work with a backend monitoring service that pushes metrics over Server-Sent Events (SSE), allowing the UI to update in near real time without page refreshes.

## Demo

<div align="center">
  <video src="./docs/media/VigilDashboard.mp4" controls muted playsinline width="100%" style="max-width: 1200px; border-radius: 12px; box-shadow: 0 12px 32px rgba(0,0,0,0.25);"></video>
</div>

You can also watch the demo video directly in the repository at [docs/media/VigilDashboard.mp4](./docs/media/VigilDashboard.mp4).

## Overview

Vigil Dashboard is a frontend monitoring console for endpoint health and performance. It visualizes:

- uptime and downtime states
- current endpoint status
- response time trends
- latency breakdowns for DNS, TCP, TLS, and TTFB
- recent monitoring events
- live connection state to the monitoring backend

This project acts as the presentation layer for a monitoring workflow where a backend service periodically checks endpoints and streams metric updates into the dashboard.

## Features

### Real-time health monitoring

The dashboard listens to a live SSE stream from `/chart-stream` and updates metrics as new checks arrive. A connection badge in the header shows whether the dashboard is currently connected to the server.

### Endpoint overview cards

The top summary section gives an instant snapshot of:

- total endpoints being monitored
- healthy endpoints
- incident count
- average response time

### Add endpoint workflow

Users can add a new URL using a simple input form. The interface posts to `/api/requests` and then expects the backend to begin monitoring that new endpoint.

### Endpoint status table

Each monitored endpoint is shown with:

- URL
- live up/down status
- last response time
- TTFB
- last checked time

### Recent checks panel

The dashboard includes a recent activity feed so you can quickly inspect the latest monitoring events and identify whether services are recovering or failing.

### Response time analytics

A scrollable line chart visualizes endpoint response times over time. This makes it easier to spot performance degradation or spikes in latency.

### Latency breakdown charts

A stacked bar chart breaks request latency into:

- DNS resolution
- TCP connection time
- TLS handshake time
- TTFB

This is especially useful to understand where delays are occurring in the request lifecycle.

### Dark and light mode

The UI supports both dark and light themes using a toggle, giving the dashboard a clean, modern look in different working environments.

### Responsive layout

The interface is designed to work well on different screen sizes, from desktop dashboards to narrower browser windows.

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4
- Recharts
- Lucide React
- Server-Sent Events (SSE)

## Project Structure

```text
vigil-dashboard/
├── docs/
│   └── media/
│       └── VigilDashboard.mp4
├── src/
│   ├── components/
│   │   ├── AddEndpoint.jsx
│   │   ├── DashboardStats.jsx
│   │   ├── EndpointTable.jsx
│   │   ├── Header.jsx
│   │   ├── LatencyBreakdown.jsx
│   │   ├── RecentChecks.jsx
│   │   ├── ResponseTimeChart.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatCard.jsx
│   │   └── ThemeToggle.jsx
│   ├── hooks/
│   │   └── useMetricsStream.js
│   ├── utils/
│   │   ├── formatTime.js
│   │   └── metricsTransform.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── vite.config.js
├── README.md
└── .gitignore
```

## Prerequisites

Before running the project, make sure you have:

- Node.js 18 or later
- npm 9 or later
- a backend monitoring service available on `http://localhost:5001`

This frontend expects a monitoring backend to provide:

- `GET /chart-stream` for live SSE metrics
- `POST /api/requests` for creating a monitored endpoint

The Vite dev server is configured to proxy these routes to the backend in `vite.config.js`.

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/roysparsha8/vigil-dashboard.git
cd vigil-dashboard
```

2. Install dependencies:

```bash
npm install
```

3. Start the monitoring backend service on port 5001.

This frontend does not include the monitoring engine itself. It relies on an external service that emits metrics in the expected format and exposes the API routes above.

4. Start the frontend dev server:

```bash
npm run dev
```

5. Open the app in your browser:

```text
http://localhost:5173
```

## Available Scripts

```bash
npm run dev
```
Runs the Vite development server.

```bash
npm run build
```
Builds the project for production.

```bash
npm run preview
```
Serves the production build locally for preview.

```bash
npm run lint
```
Runs ESLint on the project source files.

## How the Dashboard Works

The app follows a simple observation loop:

1. the dashboard opens an SSE connection to `/chart-stream`
2. the backend emits metric objects for monitored URLs
3. the frontend stores recent measurements in state
4. summary cards, charts, and tables update automatically

Each metric includes fields such as:

- `url`
- `timestamp`
- `isUp`
- `statusText`
- `responseTime`
- `ttfb`
- `dns`
- `tcp`
- `tls`

The UI uses those values to keep the dashboard current and informative.

## Example Monitoring Flow

```text
Backend monitoring service
       ↓
SSE stream /chart-stream
       ↓
React dashboard updates state
       ↓
Summary cards, tables, and charts refresh
```

## Notes

- The project uses a live streaming model, so the backend must remain available for real-time metrics.
- The UI is deliberately focused on observability and operational visibility rather than complex authentication or user management.
- The design is extensible for adding more pages, filters, alerts, or API integrations over time.

## License

This project is currently distributed as a personal or internal project without a formal open-source license declaration unless explicitly added later.

## Contributing

Contributions are welcome. If you want to enhance the project, you can:

- improve dashboard visuals
- add alerts and filters
- support more chart types
- integrate a real backend monitoring engine
- improve accessibility and mobile responsiveness

If you plan to contribute, ensure the frontend still works with the expected monitoring service protocol on `localhost:5001`.
