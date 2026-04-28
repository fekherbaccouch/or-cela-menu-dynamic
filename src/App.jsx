import { useState } from 'react'
import Navbar            from './components/ui/Navbar'
import Footer            from './components/ui/Footer'
import MenuPage          from './features/menu/MenuPage'
import AboutSection      from './features/home/AboutSection'
import GallerySection    from './features/home/GallerySection'
import ExperienceSection from './features/home/ExperienceSection'
import ContactSection    from './features/home/ContactSection'

export default function App() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-cream-paper">
      <Navbar searchQuery={searchQuery} onSearch={setSearchQuery} />

      <main>
        <MenuPage          searchQuery={searchQuery} />
        <AboutSection      />
        <GallerySection    />
        <ExperienceSection id="events" />
        {/* <ContactSection    /> */}
      </main>

      <Footer />
    </div>
  )
}
