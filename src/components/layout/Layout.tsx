import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { ThemeProvider } from '../../context/ThemeContext'
import { useDiscordPresence } from '../../hooks/useDiscordPresence'

const statusConfig = {
  online: { color: 'bg-green-500', label: 'Online' },
  idle: { color: 'bg-yellow-500', label: 'Idle' },
  dnd: { color: 'bg-red-500', label: 'Do Not Disturb' },
  offline: { color: 'bg-gray-500', label: 'Offline' },
} as const

function NowPlaying() {
  const { presence, loading } = useDiscordPresence()

  if (loading || !presence) return null

  if (presence.listeningToSpotify && presence.spotify) {
    return (
      <span className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500" />
        <img
          src={presence.spotify.album_art_url}
          alt=""
          className="w-[18px] h-[18px] rounded-full object-cover"
        />
        <span>
          {presence.spotify.song} &mdash; {presence.spotify.artist}
        </span>
      </span>
    )
  }

  if (presence.activity) {
    return (
      <span className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-green-500" />
        Playing {presence.activity.name}
      </span>
    )
  }

  const status = statusConfig[presence.status]
  return (
    <span className="flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full ${status.color}`} />
      {status.label}
    </span>
  )
}

export default function Layout() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <footer className="sticky bottom-0 z-50 border-t border-border-light bg-bg/95 backdrop-blur py-4">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-xs text-text-tertiary">
            <span>&copy; 2026 Nizhar Maulana</span>
            <NowPlaying />
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}
