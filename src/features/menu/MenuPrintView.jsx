import { Beer, GlassWater, Wine, UtensilsCrossed, Leaf } from 'lucide-react'
import { OrCelaLogoTile } from '../../components/ui/OrCelaLogo'
import { menuItems, SUBCATS } from '../../data/menuData'


/* ─────────────────────────────────────────────────────── */
/* Ornate gold divider                                     */
/* ─────────────────────────────────────────────────────── */
function OrnateDiv({ label, icon: Icon }) {
  return (
    <div className="flex items-center gap-4 my-10">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold-accent/50" />
      <div className="text-center px-3">
        {Icon && <Icon size={16} strokeWidth={1.5} className="text-gold-accent mx-auto mb-2" />}
        <p className="font-sans text-[10px] md:text-[11px] tracking-[0.45em] uppercase font-bold text-gold-accent">
          ✦ {label} ✦
        </p>
      </div>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold-accent/50" />
    </div>
  )
}

/* ─────────────────────────────────────────────────────── */
/* Clickable item row                                      */
/* ─────────────────────────────────────────────────────── */
function Item({ item, prefix, onSelect }) {
  return (
    <button
      onClick={() => onSelect(item)}
      className="group flex items-start gap-2 text-left w-full py-[3px]
        hover:text-primary-blue transition-colors"
    >
      <span className="font-sans text-[10px] text-gold-accent/60 shrink-0 mt-[2px] w-4 text-right">
        {prefix}
      </span>
      <span className="flex-1 font-sans text-[12px] md:text-[13px] text-ink leading-snug
        group-hover:text-primary-blue transition-colors">
        {item.name}
        {item.isFeatured && (
          <span className="ml-1.5 font-sans text-[8px] tracking-[0.12em] uppercase
            text-gold-accent font-bold align-middle">⭑</span>
        )}
      </span>
    </button>
  )
}

/* ─────────────────────────────────────────────────────── */
/* Sub-section column header (boissons)                    */
/* ─────────────────────────────────────────────────────── */
function SubHead({ icon: Icon, title }) {
  return (
    <div className="text-center mb-4">
      <Icon size={18} strokeWidth={1.5} className="text-gold-accent mx-auto mb-2" />
      <p className="font-sans text-[8px] tracking-[0.3em] uppercase font-bold text-primary-blue mb-2">
        {title}
      </p>
      <div className="h-px bg-gold-accent/30" />
    </div>
  )
}

/* ─────────────────────────────────────────────────────── */
/* Main component                                          */
/* ─────────────────────────────────────────────────────── */
const BOISSON_ICONS = {
  'Bières':       Beer,
  'Soft Drinks':  GlassWater,
  'Vins Rouges':  Wine,
  'Vins Rosés':   Wine,
  'Vins Blancs':  Wine,
}

export default function MenuPrintView({ onSelectItem }) {
  /* Organise data */
  const boissonsSubs = SUBCATS.Boissons.map(sub => ({
    sub,
    items: menuItems.filter(i => i.category === 'Boissons' && i.subcategory === sub),
  }))

  /* Cuisine with continuous numbering */
  let counter = 1
  const cuisineNumbered = SUBCATS.Cuisine.map(sub => ({
    sub,
    items: menuItems
      .filter(i => i.category === 'Cuisine' && i.subcategory === sub)
      .map(item => ({ item, num: counter++ })),
  }))

  /* Tapas split into 3 columns */
  const tapas = menuItems.filter(i => i.category === 'Tapas')
  const tapasChunk = [tapas.slice(0, 4), tapas.slice(4, 8), tapas.slice(8)]

  return (
    <div className="relative w-full p-5 md:p-10"
      style={{ backgroundImage: "url('/chart.png')", backgroundSize: '80px 80px', backgroundRepeat: 'repeat' }}
    >
      {/* Inner cream document */}
      <div
        className="relative z-10 bg-[#FAF9F6] max-w-5xl mx-auto px-6 sm:px-10 md:px-16 py-12 md:py-16"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(212,157,53,0.35), 0 4px 40px rgba(0,19,86,0.12)' }}
      >

        {/* ── Brand header ── */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-3">
            <OrCelaLogoTile size={72} />
            <div className="text-left">
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-primary-blue leading-none">
                Or Cela
              </h1>
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-warm-gray mt-1">
                Restaurant · Bar · Music &amp; more
              </p>
            </div>
          </div>
        </div>


        {/* ── BOISSONS ── */}
        <OrnateDiv label="Boissons" />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6">
          {boissonsSubs.map(({ sub, items }) => (
            <div key={sub}>
              <SubHead icon={BOISSON_ICONS[sub] ?? Wine} title={sub} />
              <ul>
                {items.map(item => (
                  <Item key={item.id} item={item} prefix="•" onSelect={onSelectItem} />
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── CUISINE ── */}
        <OrnateDiv label="Cuisine" icon={UtensilsCrossed} />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {cuisineNumbered.map(({ sub, items }) => (
            <div key={sub}>
              <p className="font-sans text-[9px] tracking-[0.3em] uppercase font-bold text-primary-blue mb-3 text-center">
                {sub}
              </p>
              <div className="h-px bg-gold-accent/20 mb-4" />
              <ul>
                {items.map(({ item, num }) => (
                  <Item key={item.id} item={item} prefix={`${num}.`} onSelect={onSelectItem} />
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── TAPAS ── */}
        <OrnateDiv label="Tapas" icon={Leaf} />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {tapasChunk.map((col, ci) => (
            <ul key={ci}>
              {col.map((item, li) => (
                <Item
                  key={item.id}
                  item={item}
                  prefix={`${ci * 4 + li + 1}.`}
                  onSelect={onSelectItem}
                />
              ))}
            </ul>
          ))}
        </div>

        {/* ── Footer ── */}
        <div className="mt-14 text-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gold-accent/30" />
            <span className="text-gold-accent text-xs">✦</span>
            <div className="flex-1 h-px bg-gold-accent/30" />
          </div>
          <p className="font-serif italic text-warm-gray text-sm">
            Merci de faire partie de l'expérience Or Cela.
          </p>
        </div>

      </div>
    </div>
  )
}
