# Portfolio — Nizhar Maulana

Personal portfolio website built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**, deployed on **Cloudflare Workers**.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 4
- **Routing:** React Router 7
- **Icons:** Lucide React
- **Blog:** MDX with Shiki syntax highlighting
- **Deployment:** Cloudflare Workers (via Wrangler)
- **Testing:** Jest + ts-jest

## Features

- Home, About, Projects, Experiences, Blog, and Uses pages
- MDX-powered blog with syntax highlighting
- Responsive design with Tailwind CSS
- Deployed globally on Cloudflare's edge network

## Getting Started

```bash
git clone <repo-url>
cd portfolio
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

| Script         | Description                            |
| -------------- | -------------------------------------- |
| `npm run dev`  | Start Vite dev server                  |
| `npm run build`| Type-check & build for production      |
| `npm run test` | Run tests with Jest                    |
| `npm run preview` | Build & preview with Wrangler      |
| `npm run deploy`  | Build & deploy to Cloudflare Workers |

## Deployment

The project includes a GitHub Actions workflow for CI/CD. Push to the `main` branch or manually trigger the workflow to deploy.

## License

MIT
