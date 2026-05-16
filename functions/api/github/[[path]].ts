interface Env {
  GH_ACCESS_TOKEN: string;
}

export const onRequest: PagesFunction<Env> = async context => {
  const { request, env, params } = context;
  const path = Array.isArray(params.path)
    ? params.path.join("/")
    : params.path || "";

  const url = new URL(request.url);
  const upstream = new URL(`https://api.github.com/${path}`);
  upstream.search = url.search;

  const headers = new Headers(request.headers);
  headers.set("Authorization", `Bearer ${env.GH_ACCESS_TOKEN}`);
  headers.set("User-Agent", "portfolio");

  const upstreamRequest = new Request(upstream.toString(), {
    method: request.method,
    headers,
    body:
      request.method !== "GET" && request.method !== "HEAD"
        ? request.body
        : undefined,
  });

  return fetch(upstreamRequest);
};
