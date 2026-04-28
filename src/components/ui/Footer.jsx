import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { OrCelaLogoTile } from './OrCelaLogo'

function InstagramIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function FacebookIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

const HOURS = [
  { day: 'Lun – Ven', time: '12h – 15h  ·  19h – 00h' },
  { day: 'Samedi',    time: '12h – 01h'                },
  { day: 'Dimanche',  time: '12h – 23h'                },
]

export default function Footer() {
  return (
    <footer className="bg-ink">

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <OrCelaLogoTile size={42} />
              <div>
                <p className="font-serif text-xl font-bold text-cream-paper">Or Cela</p>
                <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-gold-accent/70">
                  Restaurant · Bar · Music
                </p>
              </div>
            </div>
            <p className="font-serif italic text-cream-paper/40 text-sm leading-relaxed mb-8">
              Une expérience culinaire et sensorielle au cœur de Gammarth.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: InstagramIcon, label: 'Instagram' },
                { Icon: FacebookIcon,  label: 'Facebook'  },
              ].map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label}
                  className="w-9 h-9 bg-gold-accent/10 flex items-center
                    justify-center text-gold-accent/70 hover:bg-gold-accent hover:text-primary-blue
                    transition-all">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Horaires */}
          <div>
            <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-gold-accent mb-5">Horaires</p>
            <ul className="space-y-3.5">
              {HOURS.map(({ day, time }) => (
                <li key={day} className="flex items-start justify-between gap-4 pb-3.5">
                  <span className="font-sans text-[11px] font-semibold text-cream-paper/80 shrink-0">{day}</span>
                  <span className="font-sans text-[11px] text-cream-paper/40 text-right">{time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-gold-accent mb-5">Contact</p>
            <ul className="space-y-4">
              {[
                { Icon: MapPin, text: 'Hôtel Acquaviva\nGammarth, Tunisie' },
                { Icon: Phone,  text: '+216 XX XXX XXX'                     },
                { Icon: Mail,   text: 'contact@orcela.tn'                   },
              ].map(({ Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon size={14} strokeWidth={1.5} className="text-gold-accent/60 mt-0.5 shrink-0" />
                  <span className="font-sans text-[12px] text-cream-paper/60 whitespace-pre-line leading-relaxed">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-gold-accent mb-5">Navigation</p>
            <ul className="space-y-3">
              {['Menu', 'Notre Univers', 'Galerie', 'Événements'].map(item => (
                <li key={item}>
                  <a href={`#${item === 'Notre Univers' ? 'univers' : item.toLowerCase()}`}
                    className="font-sans text-[12px] text-cream-paper/50 hover:text-gold-accent
                      transition-colors tracking-wide">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="h-px bg-white/8" />
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row
        items-center justify-between gap-3">
        <p className="font-sans text-[10px] text-cream-paper/25">
          © {new Date().getFullYear()} Or Cela · Hôtel Acquaviva, Gammarth, Tunisie. Tous droits réservés.
        </p>
        <p className="font-serif italic text-[11px] text-cream-paper/25">
          Merci de faire partie de l'expérience Or Cela.
        </p>
      </div>

    </footer>
  )
}
