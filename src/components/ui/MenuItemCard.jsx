import { useState } from 'react'
import { UtensilsCrossed, Wine, Leaf, GlassWater } from 'lucide-react'

function FallbackBg({ category, type }) {
  const Icon = category === 'Boissons'
    ? (type.includes('Alcoholic') ? Wine : GlassWater)
    : (type.includes('Vegan') || type.includes('Vegetarian') ? Leaf : UtensilsCrossed)
  return (
    <div className="absolute inset-0 bg-primary-blue/6 flex items-center justify-center">
      <Icon size={52} strokeWidth={0.6} className="text-primary-blue/15" />
    </div>
  )
}

export default function MenuItemCard({ item, globalIndex, onClick }) {
  const [imgError, setImgError] = useState(false)

  return (
    <article
      onClick={() => onClick(item)}
      className="group cursor-pointer bg-white overflow-hidden shadow-sm
        hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5"
      aria-label={`Voir ${item.name}`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-primary-blue/5">
        {!imgError ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover
              transition-transform duration-500 group-hover:scale-[1.06]"
            onError={() => setImgError(true)}
          />
        ) : (
          <FallbackBg category={item.category} type={item.type} />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {item.isFeatured && (
          <div className="absolute top-0 left-0 bg-gold-accent px-3 py-1.5
            font-sans text-[8px] tracking-[0.18em] uppercase font-bold text-primary-blue">
            Chef's Pick
          </div>
        )}

        <div className="absolute top-3 right-3 bg-ink/50 backdrop-blur-sm
          px-2 py-0.5 font-sans text-[9px] font-bold text-cream-paper/80">
          {String(globalIndex).padStart(2, '0')}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <h3 className="font-serif text-[15px] font-bold text-ink leading-tight
            group-hover:text-primary-blue transition-colors duration-200">
            {item.name}
          </h3>
        </div>

        <p className="font-sans text-[11px] text-warm-gray leading-relaxed line-clamp-2 mb-4">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-3">
          <span className="px-2 py-0.5 bg-primary-blue/7 font-sans text-[8px]
            tracking-[0.12em] uppercase font-semibold text-primary-blue">
            {item.origin}
          </span>
          {item.type.slice(0, 2).map(t => (
            <span key={t} className="px-2 py-0.5 bg-gold-accent/10 font-sans text-[8px]
              tracking-[0.12em] uppercase font-semibold text-gold-accent">
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
