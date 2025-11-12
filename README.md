# 🧠 DarkMind Bot Dashboard

**DarkMind Bot** is a modern, AI-powered trading management dashboard built with **Next.js** and **Tailwind CSS**, providing real-time market monitoring, automated trading insights, and bot configuration controls — all in a sleek and data-driven interface.

![DarkMind Bot Dashboard Preview](./banner.png)

With the **DarkMind Bot Dashboard**, you can easily visualize trading activity, monitor price streams, configure strategy parameters, and manage account balances — all from a unified interface. Whether you're automating crypto trades or analyzing live market data, DarkMind Bot delivers the tools and analytics needed for informed, efficient trading.

Built with the latest technologies — **Next.js 15**, **React 19**, and **TypeScript** — the dashboard combines responsive UI design with real-time streaming from **FastAPI-powered** backend services, ensuring smooth performance and secure connectivity.

---

## ✨ Key Features

- 📈 **Live Price Streaming** — Real-time data updates via SSE directly from the trading backend.  
- 🤖 **Bot Control Panel** — Start, stop, and monitor your trading bots effortlessly.  
- 💹 **Performance Metrics** — Visual dashboards to track profit/loss, trade history, and balance changes.  
- ⚙️ **Dynamic Configuration** — Update trading parameters and refresh symbol settings on the fly.  
- 🧩 **Modular Components** — Built with Tailwind and reusable React components for easy customization.  
- 🔒 **Secure Authentication** — Token-based login flow integrated with the backend API.  

---

## 🧰 Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS  
- **Backend:** FastAPI (Python), Uvicorn  
- **Realtime:** Server-Sent Events (SSE) for streaming live data  
- **State Management:** Zustand / React Context  
- **Authentication:** JWT / Token-based  

---
## 🚀 Getting Started
## Installation

### Prerequisites
To get started with TailAdmin, ensure you have the following prerequisites installed and set up:

- Node.js 18.x or later (recommended to use Node.js 20.x or later)

### Cloning the Repository
Clone the repository using the following command:

```bash
git clone https://github.com/yourusername/darkmind-bot.git
cd darkmind-bot
```

> Windows Users: place the repository near the root of your drive if you face issues while cloning.

1. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
    > Use `--legacy-peer-deps` flag if you face peer-dependency error during installation.

2. Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

## Components

TailAdmin is a pre-designed starting point for building a web-based dashboard using Next.js and Tailwind CSS. The template includes:

- Sophisticated and accessible sidebar
- Data visualization components
- Profile management and custom 404 page
- Tables and Charts(Line and Bar)
- Authentication forms and input elements
- Alerts, Dropdowns, Modals, Buttons and more
- Can't forget Dark Mode 🕶️

All components are built with React and styled using Tailwind CSS for easy customization.

## Feature Comparison

### Free Version
- 1 Unique Dashboard
- 30+ dashboard components
- 50+ UI elements
- Basic Figma design files
- Community support

### Pro Version
- 7 Unique Dashboards: Analytics, Ecommerce, Marketing, CRM, SaaS, Stocks, Logistics (more coming soon)
- 500+ dashboard components and UI elements
- Complete Figma design file
- Email support

To learn more about pro version features and pricing, visit our [pricing page](https://tailadmin.com/pricing).

## Changelog

### Version 2.0.2 - [March 25, 2025]

- Upgraded to Next v15.2.3 for [CVE-2025-29927](https://nextjs.org/blog/cve-2025-29927) concerns
- Included overrides vectormap for packages to prevent peer dependency errors during installation.
- Migrated from react-flatpickr to flatpickr package for React 19 support

### Version 2.0.1 - [February 27, 2025]

#### Update Overview

- Upgraded to Tailwind CSS v4 for better performance and efficiency.
- Updated class usage to match the latest syntax and features.
- Replaced deprecated class and optimized styles.

#### Next Steps

- Run npm install or yarn install to update dependencies.
- Check for any style changes or compatibility issues.
- Refer to the Tailwind CSS v4 [Migration Guide](https://tailwindcss.com/docs/upgrade-guide) on this release. if needed.
- This update keeps the project up to date with the latest Tailwind improvements. 🚀

### v2.0.0 (February 2025)
A major update focused on Next.js 15 implementation and comprehensive redesign.

#### Major Improvements
- Complete redesign using Next.js 15 App Router and React Server Components
- Enhanced user interface with Next.js-optimized components
- Improved responsiveness and accessibility
- New features including collapsible sidebar, chat screens, and calendar
- Redesigned authentication using Next.js App Router and server actions
- Updated data visualization using ApexCharts for React

#### Breaking Changes

- Migrated from Next.js 14 to Next.js 15
- Chart components now use ApexCharts for React
- Authentication flow updated to use Server Actions and middleware

[Read more](https://tailadmin.com/docs/update-logs/nextjs) on this release.

#### Breaking Changes
- Migrated from Next.js 14 to Next.js 15
- Chart components now use ApexCharts for React
- Authentication flow updated to use Server Actions and middleware

### v1.3.4 (July 01, 2024)
- Fixed JSvectormap rendering issues

### v1.3.3 (June 20, 2024)
- Fixed build error related to Loader component

### v1.3.2 (June 19, 2024)
- Added ClickOutside component for dropdown menus
- Refactored sidebar components
- Updated Jsvectormap package

### v1.3.1 (Feb 12, 2024)
- Fixed layout naming consistency
- Updated styles

### v1.3.0 (Feb 05, 2024)
- Upgraded to Next.js 14
- Added Flatpickr integration
- Improved form elements
- Enhanced multiselect functionality
- Added default layout component

## License

TailAdmin Next.js Free Version is released under the MIT License.

## Support

If you find this project helpful, please consider giving it a star on GitHub. Your support helps us continue developing and maintaining this template.
