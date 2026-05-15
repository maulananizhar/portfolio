interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>
  }
  GITHUB_ACCESS_TOKEN: string
  GITLAB_ACCESS_TOKEN: string
  WAKATIME_API_KEY: string
}

function encodeBase64(value: string): string {
  return btoa(value)
}

function requireBinding(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`${name} is not configured in Cloudflare runtime secrets/variables`)
  }

  return value
}

function createUpstreamRequest(
  request: Request,
  upstreamUrl: URL,
  headers: Headers,
): Request {
  return new Request(upstreamUrl.toString(), {
    method: request.method,
    headers,
    body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
  })
}

async function proxyRequest(
  request: Request,
  upstreamBase: string,
  pathPrefix: string,
  headers: Headers,
): Promise<Response> {
  const url = new URL(request.url)
  const path = url.pathname.slice(pathPrefix.length) || '/'
  const upstream = new URL(`${upstreamBase}${path}`)
  upstream.search = url.search

  return fetch(createUpstreamRequest(request, upstream, headers))
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname.startsWith('/api/github')) {
      const headers = new Headers(request.headers)
      headers.set('Authorization', `Bearer ${requireBinding(env.GITHUB_ACCESS_TOKEN, 'GITHUB_ACCESS_TOKEN')}`)
      headers.set('User-Agent', 'portfolio')

      return proxyRequest(request, 'https://api.github.com', '/api/github', headers)
    }

    if (url.pathname.startsWith('/api/gitlab')) {
      const headers = new Headers(request.headers)
      headers.set('PRIVATE-TOKEN', requireBinding(env.GITLAB_ACCESS_TOKEN, 'GITLAB_ACCESS_TOKEN'))

      return proxyRequest(request, 'https://gitlab.com/api/v4', '/api/gitlab', headers)
    }

    if (url.pathname.startsWith('/api/wakatime')) {
      const headers = new Headers(request.headers)
      const wakatimeApiKey = requireBinding(env.WAKATIME_API_KEY, 'WAKATIME_API_KEY')
      headers.set('Authorization', `Basic ${encodeBase64(`${wakatimeApiKey}:`)}`)

      return proxyRequest(request, 'https://wakatime.com/api/v1', '/api/wakatime', headers)
    }

    return env.ASSETS.fetch(request)
  },
}