import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, UtensilsCrossed, Wine, Leaf, GlassWater, Play } from 'lucide-react'

function FallbackBg({ item }) {
  const Icon = item.category === 'Boissons'
    ? (item.type.includes('Alcoholic') ? Wine : GlassWater)
    : (item.type.includes('Vegan') || item.type.includes('Vegetarian') ? Leaf : UtensilsCrossed)
  return (
    <div className="absolute inset-0 bg-primary-blue/8 flex items-center justify-center">
      <Icon size={72} strokeWidth={0.6} className="text-primary-blue/15" />
    </div>
  )
}

function Tag({ label, variant }) {
  const styles = {
    origin: 'bg-primary-blue/10 text-primary-blue',
    diet:   'bg-gold-accent/10  text-gold-accent',
    sub:    'bg-warm-gray/10    text-warm-gray',
  }
  return (
    <span className={`inline-flex items-center px-3 py-1 border
      font-sans text-[9px] tracking-[0.12em] uppercase font-semibold ${styles[variant] ?? styles.sub}`}>
      {label}
    </span>
  )
}

export default function ItemModal({ item, onClose }) {
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] bg-ink/70 backdrop-blur-sm
            flex items-center justify-center p-4 md:p-10"
          onClick={onClose}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
            className="relative bg-cream-paper w-full max-w-3xl overflow-hidden shadow-2xl"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-30 w-9 h-9 bg-white/80
                backdrop-blur-sm flex items-center justify-center text-ink/60
                hover:bg-white hover:text-primary-blue transition-all shadow-sm"
              aria-label="Fermer"
            >
              <X size={16} />
            </button>

            <div className="flex flex-col md:flex-row">

              {/* ── Image panel ── */}
              <div className="relative md:w-[45%] shrink-0">
                <div className="aspect-[4/3] md:aspect-auto md:h-full min-h-[220px] relative bg-primary-blue/5 overflow-hidden">
                  {!imgError ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <FallbackBg item={item} />
                  )}

                  {/* Gradient at bottom of image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-blue/60 via-transparent to-transparent" />

                  {/* Badges on image */}
                  <div className="absolute bottom-4 left-4 flex flex-col gap-2">
                    {item.isFeatured && (
                      <div className="inline-flex items-center gap-1.5 bg-gold-accent px-3 py-1.5 self-start">
                        <span className="w-1.5 h-1.5 bg-primary-blue" />
                        <span className="font-sans text-[9px] tracking-[0.15em] uppercase font-bold text-primary-blue">
                          Chef's Pick
                        </span>
                      </div>
                    )}
                    {item.hasVideo && (
                      <button className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm
                        px-3 py-1.5 self-start hover:bg-white transition-colors shadow-sm">
                        <Play size={11} className="text-primary-blue" fill="currentColor" />
                        <span className="font-sans text-[9px] tracking-[0.12em] uppercase font-bold text-primary-blue">
                          Voir vidéo
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* ── Content panel ── */}
              <div className="flex-1 p-7 md:p-8 flex flex-col gap-5 overflow-y-auto max-h-[80vh] md:max-h-none">

                <div>
                  <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold-accent mb-2">
                    {item.category} · {item.subcategory}
                  </p>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink leading-tight">
                    {item.name}
                  </h2>
                </div>


                <div className="w-10 border-t-2 border-gold-accent" />

                <p className="font-sans text-[13px] md:text-sm text-warm-gray leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-primary-blue/8 mt-auto">
                  <Tag label={item.origin} variant="origin" />
                  {item.type.map(t => <Tag key={t} label={t} variant="diet" />)}
                  {item.subcategory !== item.category && (
                    <Tag label={item.subcategory} variant="sub" />
                  )}
                </div>

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
