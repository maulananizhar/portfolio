import { lazy, Suspense, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import SplashScreen from './components/splash/SplashScreen'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Experiences = lazy(() => import('./pages/Experiences'))
const Projects = lazy(() => import('./pages/Projects'))
const Uses = lazy(() => import('./pages/Uses'))
const ServiceError = lazy(() => import('./pages/ServiceError'))

export default function App() {
  const [showSplash, setShowSplash] = useState(true)

  return showSplash ? (
    <SplashScreen onFinish={() => setShowSplash(false)} />
  ) : (
    <Suspense fallback={null}>
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
    </Suspense>
  )
}
