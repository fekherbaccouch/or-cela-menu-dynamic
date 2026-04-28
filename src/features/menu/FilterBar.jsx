import { Beer, UtensilsCrossed, Leaf } from 'lucide-react'
import { CATEGORIES } from '../../data/menuData'

const ICONS = { Boissons: Beer, Cuisine: UtensilsCrossed, Tapas: Leaf }

export default function FilterBar({ active, onChange }) {
  return (
    <div className="border-b border-primary-blue/10">
      <div className="max-w-7xl mx-auto flex" role="tablist">
        {CATEGORIES.map(cat => {
          const Icon = ICONS[cat]
          const isActive = active === cat
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(cat)}
              className={`flex-1 flex items-center justify-center gap-2 py-4
                font-sans text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase
                transition-all duration-200 relative
                ${isActive
                  ? 'text-primary-blue'
                  : 'text-warm-gray hover:text-ink'}`}
            >
              <Icon size={12} strokeWidth={2} className="shrink-0" />
              <span>{cat}</span>
              <span className={`absolute bottom-0 inset-x-0 h-0.5 transition-all duration-200
                ${isActive ? 'bg-primary-blue' : 'bg-transparent'}`} />
            </button>
          )
        })}
      </div>
    </div>
  )
}
