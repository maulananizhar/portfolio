import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { ThemeProvider } from '../../context/ThemeContext'

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
            <span>Built with TypeScript & React</span>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}
