import { SUBCATS, ORIGINS, DIETS } from '../../data/menuData'

function Chip({ label, active, gold, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 font-sans text-[9px] tracking-[0.14em] uppercase font-semibold
        whitespace-nowrap transition-all duration-150
        ${active
          ? gold
            ? 'bg-gold-accent text-primary-blue'
            : 'bg-primary-blue text-cream-paper'
          : gold
            ? 'text-gold-accent/80 hover:bg-gold-accent/12 hover:text-gold-accent'
            : 'text-primary-blue/55 hover:bg-primary-blue/8 hover:text-primary-blue'}`}
    >
      {label}
    </button>
  )
}

function Sep() {
  return <div className="w-px self-stretch bg-primary-blue/10 mx-1 shrink-0" />
}

function Group({ label, children }) {
  return (
    <div className="flex items-center gap-1 px-3 shrink-0">
      <span className="font-sans text-[8px] tracking-[0.2em] uppercase text-warm-gray/40 mr-1">
        {label}
      </span>
      {children}
    </div>
  )
}

export default function SubFilterBar({
  category, subcat, onSubcat, origin, onOrigin, diet, onDiet, featured, onFeatured,
}) {
  const subcats = SUBCATS[category] ?? []
  const hasActive = subcat !== 'All' || origin !== 'All' || diet !== 'All' || featured

  return (
    <div className="bg-white border-b border-primary-blue/8 overflow-x-auto scrollbar-hide">
      <div className="flex items-center min-w-max py-2 px-4 mx-auto">

        {subcats.length > 0 && (
          <>
            <Group label="Type">
              <Chip label="Tous" active={subcat === 'All'} onClick={() => onSubcat('All')} />
              {subcats.map(s => (
                <Chip key={s} label={s} active={subcat === s} onClick={() => onSubcat(s)} />
              ))}
            </Group>
            <Sep />
          </>
        )}

        <Group label="Origine">
          <Chip label="Tous" active={origin === 'All'} onClick={() => onOrigin('All')} />
          {ORIGINS.map(o => (
            <Chip key={o} label={o} active={origin === o} onClick={() => onOrigin(o)} />
          ))}
        </Group>

        <Sep />

        <Group label="Régime">
          <Chip label="Tous" gold active={diet === 'All'} onClick={() => onDiet('All')} />
          {DIETS.map(d => (
            <Chip key={d} label={d} gold active={diet === d} onClick={() => onDiet(d)} />
          ))}
        </Group>

        <Sep />

        <div className="px-3 shrink-0">
          <Chip label="⭑ Chef's Pick" gold active={featured} onClick={() => onFeatured(!featured)} />
        </div>

        {hasActive && (
          <>
            <Sep />
            <button
              onClick={() => { onSubcat('All'); onOrigin('All'); onDiet('All'); onFeatured(false) }}
              className="px-4 font-sans text-[9px] tracking-[0.12em] uppercase
                text-warm-gray/50 hover:text-ink transition-colors whitespace-nowrap shrink-0"
            >
              × Effacer
            </button>
          </>
        )}
      </div>
    </div>
  )
}
