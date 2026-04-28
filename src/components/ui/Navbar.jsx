import { useState, useEffect } from 'react'
import { Menu, X, Search } from 'lucide-react'
import { OrCelaLogoTile } from './OrCelaLogo'

const NAV_LINKS = [
  { label: 'Menu',          href: '#menu'    },
  { label: 'Notre Univers', href: '#univers' },
  { label: 'Galerie',       href: '#gallery' },
  { label: 'Événements',    href: '#events'  },
]

export default function Navbar({ searchQuery, onSearch }) {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 inset-x-0 z-40 transition-all duration-300
      ${scrolled
        ? 'bg-cream-paper/95 backdrop-blur-xl shadow-md'
        : 'bg-transparent backdrop-blur-sm'}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6 md:px-10">

        {/* Brand */}
        <a href="#menu" className="flex items-center gap-3 shrink-0" aria-label="Or Cela">
          <OrCelaLogoTile size={38} />
          <div className="leading-none">
            <span className={`font-serif text-lg font-bold block transition-colors duration-300
              ${scrolled ? 'text-primary-blue' : 'text-cream-paper'}`}>
              Or Cela
            </span>
            <span className={`font-sans text-[8px] tracking-[0.22em] uppercase transition-colors duration-300
              ${scrolled ? 'text-warm-gray' : 'text-cream-paper/60'}`}>
              Restaurant · Bar · Music
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a href={href}
                  className={`font-sans text-[10px] font-semibold tracking-[0.2em] uppercase
                    relative pb-0.5 transition-colors duration-200 group
                    ${scrolled ? 'text-primary-blue' : 'text-cream-paper/80 hover:text-cream-paper'}`}
                >
                  {label}
                  <span className="absolute inset-x-0 bottom-0 h-px bg-gold-accent scale-x-0
                    group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </a>
              </li>
            ))}
          </ul>

          {/* Search — no border, subtle bg fill */}
          <div className={`flex items-center gap-2 px-3 py-1.5 transition-all duration-300
            ${scrolled ? 'bg-primary-blue/8' : 'bg-white/15'}`}>
            <Search size={12} strokeWidth={2} className={scrolled ? 'text-warm-gray' : 'text-cream-paper/60'} />
            <input
              type="search"
              placeholder="Rechercher…"
              value={searchQuery}
              onChange={e => onSearch(e.target.value)}
              className={`bg-transparent font-sans text-[11px] focus:outline-none w-28
                ${scrolled
                  ? 'text-ink placeholder:text-warm-gray/50'
                  : 'text-cream-paper placeholder:text-cream-paper/40'}`}
            />
          </div>

          <a href="#contact"
            className="px-5 py-2 bg-gold-accent font-sans text-[10px] font-bold
              tracking-[0.2em] uppercase text-primary-blue
              hover:bg-gold-light transition-colors shadow-sm whitespace-nowrap">
            Réservation
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(o => !o)}
          className={`md:hidden p-2 transition-colors
            ${scrolled ? 'text-primary-blue' : 'text-cream-paper'}`}
          aria-label={open ? 'Fermer' : 'Menu'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer — no borders */}
      {open && (
        <div className="md:hidden bg-cream-paper shadow-xl">
          <div className="px-5 pt-4 pb-3">
            <div className="flex items-center gap-2 bg-primary-blue/8 px-3 py-2.5">
              <Search size={13} className="text-warm-gray shrink-0" />
              <input
                type="search"
                placeholder="Rechercher dans le menu…"
                value={searchQuery}
                onChange={e => onSearch(e.target.value)}
                className="bg-transparent font-sans text-[12px] text-ink
                  placeholder:text-warm-gray/50 focus:outline-none w-full"
              />
            </div>
          </div>

          <ul className="px-5 pb-2">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-sans text-[11px] font-bold tracking-[0.22em]
                    uppercase text-primary-blue hover:text-gold-accent transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="px-5 pb-5">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block text-center py-3.5 bg-primary-blue font-sans text-[11px]
                font-bold tracking-[0.2em] uppercase text-cream-paper hover:bg-deep-blue transition-colors"
            >
              Réservation
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
