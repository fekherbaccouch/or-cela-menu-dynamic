import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { menuItems } from '../../data/menuData'
import FilterBar     from './FilterBar'
import SubFilterBar  from './SubFilterBar'
import MenuGrid      from './MenuGrid'
import MenuPrintView from './MenuPrintView'
import ItemModal     from '../../components/ui/ItemModal'

function GridIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
      <rect x="1" y="1" width="6" height="6"/>
      <rect x="9" y="1" width="6" height="6"/>
      <rect x="1" y="9" width="6" height="6"/>
      <rect x="9" y="9" width="6" height="6"/>
    </svg>
  )
}

function MenuDocIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
      <rect x="2" y="1" width="12" height="14" rx="0" opacity="0.15"/>
      <rect x="2" y="1" width="12" height="14" fill="none" stroke="currentColor" strokeWidth="1"/>
      <rect x="4.5" y="4"  width="7" height="1"/>
      <rect x="4.5" y="6.5" width="7" height="1"/>
      <rect x="4.5" y="9"  width="5" height="1"/>
    </svg>
  )
}

export default function MenuPage({ searchQuery = '' }) {
  const [category, setCategory] = useState('Cuisine')
  const [subcat,   setSubcat]   = useState('All')
  const [origin,   setOrigin]   = useState('All')
  const [diet,     setDiet]     = useState('All')
  const [featured, setFeatured] = useState(false)
  const [selected, setSelected] = useState(null)
  const [view,     setView]     = useState('grid')

  const handleCategory = (cat) => {
    setCategory(cat); setSubcat('All'); setOrigin('All'); setDiet('All'); setFeatured(false)
  }

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return menuItems.filter(item => {
      if (item.category !== category)                                                                return false
      if (subcat !== 'All' && item.subcategory !== subcat)                                          return false
      if (origin !== 'All' && item.origin !== origin)                                               return false
      if (diet   !== 'All' && !item.type.includes(diet))                                            return false
      if (featured && !item.isFeatured)                                                             return false
      if (q && !item.name.toLowerCase().includes(q) && !item.description.toLowerCase().includes(q)) return false
      return true
    })
  }, [category, subcat, origin, diet, featured, searchQuery])

  return (
    <section id="menu">

      {/* ── Hero ── */}
      <div className="relative bg-deep-blue overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #D49D35 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-accent/50 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-36 pb-20 md:pt-44 md:pb-24 text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="font-sans text-[10px] tracking-[0.5em] uppercase text-gold-accent mb-5"
          >
            Or Cela · Gammarth
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-6xl sm:text-8xl lg:text-[110px] font-bold text-cream-paper uppercase tracking-[0.04em] leading-none mb-8"
          >
            Menu
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="w-16 h-px bg-gold-accent/30" />
            <div className="w-1.5 h-1.5 bg-gold-accent rotate-45" />
            <div className="w-16 h-px bg-gold-accent/30" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}
            className="font-serif italic text-cream-paper/40 mt-5 text-base"
          >
            Une expérience méditerranéenne élégante et authentique.
          </motion.p>
        </div>
      </div>

      {/* ── Sticky filter bar — hidden in print view ── */}
      {view === 'grid' && (
        <div className="sticky top-0 z-30 bg-cream-paper shadow-md">
          <div className="max-w-7xl mx-auto">
            <FilterBar active={category} onChange={handleCategory} />
          </div>
          <motion.div key={category} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
            <SubFilterBar
              category={category}
              subcat={subcat}     onSubcat={setSubcat}
              origin={origin}     onOrigin={setOrigin}
              diet={diet}         onDiet={setDiet}
              featured={featured} onFeatured={setFeatured}
            />
          </motion.div>
        </div>
      )}

      {/* ── Content ── */}
      <div className="bg-cream-paper">

        {/* View toggle bar */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-8 pb-4">
          <div className="flex items-center justify-between gap-3">
            {view === 'grid' ? (
              <p className="font-sans text-[11px] text-warm-gray">
                <span className="font-bold text-primary-blue text-base">{filtered.length}</span>
                {' '}article{filtered.length !== 1 ? 's' : ''}
                {searchQuery && (
                  <span className="text-gold-accent ml-2">— «&nbsp;{searchQuery}&nbsp;»</span>
                )}
              </p>
            ) : (
              <p className="font-sans text-[11px] text-warm-gray italic">
                Menu complet — cliquez un plat pour les détails
              </p>
            )}

            {/* Toggle */}
            <div className="flex items-center gap-px bg-primary-blue/8 shrink-0">
              <button
                onClick={() => setView('grid')}
                title="Vue cartes avec photos"
                className={`flex items-center gap-2 px-3 py-2.5 font-sans text-[9px] tracking-[0.15em] uppercase font-semibold transition-all duration-200
                  ${view === 'grid'
                    ? 'bg-primary-blue text-cream-paper'
                    : 'text-warm-gray hover:text-primary-blue hover:bg-primary-blue/10'}`}
              >
                <GridIcon />
                <span className="hidden sm:inline">Cartes</span>
              </button>
              <button
                onClick={() => setView('print')}
                title="Menu complet façon carte imprimée"
                className={`flex items-center gap-2 px-3 py-2.5 font-sans text-[9px] tracking-[0.15em] uppercase font-semibold transition-all duration-200
                  ${view === 'print'
                    ? 'bg-primary-blue text-cream-paper'
                    : 'text-warm-gray hover:text-primary-blue hover:bg-primary-blue/10'}`}
              >
                <MenuDocIcon />
                <span className="hidden sm:inline">Carte</span>
              </button>
            </div>
          </div>
        </div>

        {/* Grid view */}
        {view === 'grid' && (
          <div className="max-w-7xl mx-auto px-6 md:px-10 pb-14">
            <MenuGrid items={filtered} onSelectItem={setSelected} />
          </div>
        )}

        {/* Print / document view — full width */}
        {view === 'print' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <MenuPrintView onSelectItem={setSelected} />
          </motion.div>
        )}

      </div>

      {selected && <ItemModal item={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
