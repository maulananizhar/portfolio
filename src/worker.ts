interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
  GH_ACCESS_TOKEN: string;
  GITLAB_ACCESS_TOKEN: string;
  WAKATIME_API_KEY: string;
  VITE_DISCORD_USER_ID: string;
}

function encodeBase64(value: string): string {
  return btoa(value);
}

function requireBinding(value: string | undefined): string | null {
  return value && value.trim() ? value : null;
}

function missingBindingResponse(name: string): Response {
  return new Response(
    JSON.stringify({
      error: `${name} is not configured in Cloudflare runtime secrets/variables`,
    }),
    {
      status: 500,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    },
  );
}

interface GitHubRepo {
  full_name: string
  private: boolean
}

interface GitHubCommit {
  commit?: { author?: { date?: string }; committer?: { date?: string } }
}

function getNextPage(response: Response): string | null {
  const link = response.headers.get("Link")
  const next = link?.split(",").find(part => /rel="next"/.test(part))
  return next?.match(/<([^>]+)>/)?.[1] || null
}

async function fetchGitHubProfileContributions(
  request: Request,
  token: string,
): Promise<Response> {
  const requestUrl = new URL(request.url)
  const from = requestUrl.searchParams.get("from")
  const to = requestUrl.searchParams.get("to")
  const validDate = (value: string | null): value is string =>
    !!value && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`))

  if (!validDate(from) || !validDate(to) || from > to) {
    return Response.json({ error: "Valid from and to dates are required" }, { status: 400 })
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    "User-Agent": "portfolio",
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  }
  const query = `query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          weeks { contributionDays { date contributionCount } }
        }
      }
    }
  }`
  const graphResponse = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
      variables: {
        username: "maulananizhar",
        from: `${from}T00:00:00Z`,
        to: `${to}T23:59:59Z`,
      },
    }),
  })
  if (!graphResponse.ok) {
    return Response.json({ error: "Unable to load GitHub contributions" }, { status: graphResponse.status })
  }
  const graphData = await graphResponse.json() as {
    errors?: unknown[]
    data?: { user?: { contributionsCollection?: { contributionCalendar?: { weeks?: Array<{ contributionDays: Array<{ date: string; contributionCount: number }> }> } } } }
  }
  const weeks = graphData.data?.user?.contributionsCollection?.contributionCalendar?.weeks
  if (graphData.errors?.length || !weeks) {
    return Response.json({ error: "GitHub contribution calendar is unavailable" }, { status: 502 })
  }

  const dayCounts = new Map<string, number>()
  for (const week of weeks) {
    for (const day of week.contributionDays) dayCounts.set(day.date, day.contributionCount)
  }

  // GraphQL's contributionCalendar does not expose a private-inclusion argument.
  // Use the authenticated REST API to add commits from private repos the token can access.
  try {
    let reposUrl: string | null = "https://api.github.com/user/repos?visibility=private&affiliation=owner,collaborator,organization_member&per_page=100"
    const privateRepos: GitHubRepo[] = []
    let repoPage = 0
    while (reposUrl && repoPage < 10) {
      const reposResponse = await fetch(reposUrl, { headers })
      if (!reposResponse.ok) break
      privateRepos.push(...(await reposResponse.json() as GitHubRepo[]).filter(repo => repo.private))
      reposUrl = getNextPage(reposResponse)
      repoPage++
    }
    if (privateRepos.length) {
      for (let index = 0; index < privateRepos.length; index += 5) {
        await Promise.all(privateRepos.slice(index, index + 5).map(async repo => {
          const commitsUrl = new URL(`https://api.github.com/repos/${repo.full_name}/commits`)
          commitsUrl.searchParams.set("author", "maulananizhar")
          commitsUrl.searchParams.set("since", `${from}T00:00:00Z`)
          commitsUrl.searchParams.set("until", `${to}T23:59:59Z`)
          commitsUrl.searchParams.set("per_page", "100")

          let nextUrl: string | null = commitsUrl.toString()
          let page = 0
          while (nextUrl && page < 10) {
            const commitsResponse = await fetch(nextUrl, { headers })
            if (!commitsResponse.ok) break
            const commits = await commitsResponse.json() as GitHubCommit[]
            for (const commit of commits) {
              const date = (commit.commit?.author?.date || commit.commit?.committer?.date)?.slice(0, 10)
              if (date) dayCounts.set(date, (dayCounts.get(date) || 0) + 1)
            }
            nextUrl = getNextPage(commitsResponse)
            page++
          }
        }))
      }
    }
  } catch {
    // Keep the public contribution calendar if private-repository access is unavailable.
  }

  return Response.json(
    Array.from(dayCounts, ([date, contributionCount]) => ({ date, contributionCount }))
      .sort((a, b) => a.date.localeCompare(b.date)),
    { headers: { "Cache-Control": "public, max-age=1800" } },
  )
}

function createUpstreamRequest(
  request: Request,
  upstreamUrl: URL,
  headers: Headers,
): Request {
  return new Request(upstreamUrl.toString(), {
    method: request.method,
    headers,
    body:
      request.method !== "GET" && request.method !== "HEAD"
        ? request.body
        : undefined,
  });
}

async function proxyRequest(
  request: Request,
  upstreamBase: string,
  pathPrefix: string,
  headers: Headers,
): Promise<Response> {
  try {
    const url = new URL(request.url);
    const path = url.pathname.slice(pathPrefix.length) || "/";
    const upstream = new URL(`${upstreamBase}${path}`);
    upstream.search = url.search;

    return await fetch(createUpstreamRequest(request, upstream, headers));
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Proxy request failed",
        detail: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "content-type": "application/json; charset=utf-8",
        },
      },
    );
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/gh-calendar") {
      const githubToken = requireBinding(env.GH_ACCESS_TOKEN);
      if (!githubToken) return missingBindingResponse("GH_ACCESS_TOKEN");
      return fetchGitHubProfileContributions(request, githubToken);
    }

    if (url.pathname.startsWith("/api/github")) {
      const headers = new Headers(request.headers);
      const githubToken = requireBinding(env.GH_ACCESS_TOKEN);
      if (!githubToken) return missingBindingResponse("GH_ACCESS_TOKEN");

      headers.set("Authorization", `Bearer ${githubToken}`);
      headers.set("User-Agent", "portfolio");

      return proxyRequest(
        request,
        "https://api.github.com",
        "/api/github",
        headers,
      );
    }

    if (url.pathname.startsWith("/api/gitlab")) {
      const headers = new Headers(request.headers);
      const gitlabToken = requireBinding(env.GITLAB_ACCESS_TOKEN);
      if (!gitlabToken) return missingBindingResponse("GITLAB_ACCESS_TOKEN");

      headers.set("PRIVATE-TOKEN", gitlabToken);

      return proxyRequest(
        request,
        "https://gitlab.com/api/v4",
        "/api/gitlab",
        headers,
      );
    }

    if (url.pathname.startsWith("/api/wakatime")) {
      const headers = new Headers(request.headers);
      const wakatimeApiKey = requireBinding(env.WAKATIME_API_KEY);
      if (!wakatimeApiKey) return missingBindingResponse("WAKATIME_API_KEY");

      headers.set(
        "Authorization",
        `Basic ${encodeBase64(`${wakatimeApiKey}:`)}`,
      );

      return proxyRequest(
        request,
        "https://wakatime.com/api/v1",
        "/api/wakatime",
        headers,
      );
    }

    if (url.pathname === "/api/discord") {
      const discordUserId = requireBinding(env.VITE_DISCORD_USER_ID);
      if (!discordUserId) return missingBindingResponse("VITE_DISCORD_USER_ID");

      const upstream = `https://api.lanyard.rest/v1/users/${discordUserId}`;
      return fetch(upstream);
    }

    return env.ASSETS.fetch(request);
  },
};
