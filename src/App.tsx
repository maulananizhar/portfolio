import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import SplashScreen from './components/splash/SplashScreen'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Experiences from './pages/Experiences'
import Projects from './pages/Projects'
import Uses from './pages/Uses'
import ServiceError from './pages/ServiceError'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)

  return showSplash ? (
    <SplashScreen onFinish={() => setShowSplash(false)} />
  ) : (
    <Routes>
      <Route path="/service-error" element={<ServiceError />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/uses" element={<Uses />} />
      </Route>
    </Routes>
  )
}
