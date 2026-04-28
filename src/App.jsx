import Navbar            from './components/ui/Navbar'
import Footer            from './components/ui/Footer'
import MenuPage          from './features/menu/MenuPage'
import AboutSection      from './features/home/AboutSection'
import GallerySection    from './features/home/GallerySection'
import ExperienceSection from './features/home/ExperienceSection'

export default function App() {
  return (
    <div className="min-h-screen bg-cream-paper">
      <Navbar />

      <main>
        <MenuPage />
        <AboutSection />
        <GallerySection />
        <ExperienceSection id="events" />
      </main>

      <Footer />
    </div>
  )
}
