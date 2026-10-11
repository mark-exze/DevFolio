/**
 * App — root component rendering all sections in order.
 *
 * This is a single-page portfolio: no router is used. Anchor links are
 * plain <a href="#id"> elements with native smooth scrolling; the
 * useAnchorScroll hook keeps the sticky navbar from hiding targets.
 * Subtle SectionDivider components separate the major sections.
 */

import { useEffect } from 'react'
import { Layout } from '@/components/Layout'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { SectionDivider } from '@/components/SectionDivider'
import { Skills } from '@/components/Skills'
import { Projects } from '@/components/Projects'
import { Research } from '@/components/Research'
import { Education } from '@/components/Education'
import { Certifications } from '@/components/Certifications'
import { Awards } from '@/components/Awards'
import { Devlog } from '@/components/Devlog'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { useAnchorScroll } from '@/hooks'

function App() {
  useAnchorScroll()

  // Ensure deep links work on initial load.
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (!hash) return
    const element = document.getElementById(hash)
    if (!element) return
    const navHeight = 64
    const y =
      element.getBoundingClientRect().top +
      window.scrollY -
      navHeight
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
  }, [])

  return (
    <Layout>
      <Navbar />
      <main id="main-content" role="main">
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Research />
        <SectionDivider />
        <Education />
        <SectionDivider />
        <Certifications />
        <SectionDivider />
        <Awards />
        <SectionDivider />
        <Devlog />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </Layout>
  )
}

export { App }