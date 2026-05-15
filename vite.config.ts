import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import tailwindcss from '@tailwindcss/vite'
import rehypeShiki from '@shikijs/rehype'

import { cloudflare } from "@cloudflare/vite-plugin";

function toBase64(str: string): string {
  return Buffer.from(str).toString('base64')
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [{
      enforce: 'pre',
      ...mdx({
        rehypePlugins: [
          [rehypeShiki, { theme: 'github-dark' }],
        ],
      }),
    }, react({ include: /\.(mdx|tsx|ts|js)$/ }), tailwindcss(), cloudflare()],
    server: {
      proxy: {
        '/api/gitlab': {
          target: 'https://gitlab.com/api/v4',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/gitlab/, ''),
          headers: {
            'PRIVATE-TOKEN': env.GITLAB_ACCESS_TOKEN,
          },
        },
        '/api/wakatime': {
          target: 'https://wakatime.com/api/v1',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/wakatime/, ''),
          headers: {
            'Authorization': `Basic ${toBase64(`${env.WAKATIME_API_KEY}:`)}`,
          },
        },
        '/api/github': {
          target: 'https://api.github.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/github/, ''),
          headers: {
            'Authorization': `Bearer ${env.GITHUB_ACCESS_TOKEN}`,
          },
        },
      },
    },
  };
})