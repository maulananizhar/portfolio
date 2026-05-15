export default function ServiceError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-6">
      <div className="text-center max-w-md">
        <h1 className="text-5xl font-bold text-text mb-4">Hmm.</h1>
        <p className="text-text-secondary text-lg leading-relaxed mb-8">
          Something's not quite right. A few things on this site are
          temporarily unavailable. The rest should still work fine — feel
          free to look around.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-text text-bg text-sm font-medium hover:opacity-80 transition-opacity"
          >
            Back to Home
          </a>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border-light text-text-secondary text-sm font-medium hover:text-text hover:border-text/30 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}
