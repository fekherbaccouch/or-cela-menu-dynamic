import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { menuItems } from '../../data/menuData'
import FilterBar    from './FilterBar'
import SubFilterBar from './SubFilterBar'
import MenuGrid     from './MenuGrid'
import ItemModal    from '../../components/ui/ItemModal'

export default function MenuPage({ searchQuery = '' }) {
  const [category, setCategory] = useState('Cuisine')
  const [subcat,   setSubcat]   = useState('All')
  const [origin,   setOrigin]   = useState('All')
  const [diet,     setDiet]     = useState('All')
  const [featured, setFeatured] = useState(false)
  const [selected, setSelected] = useState(null)

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

      {/* ── Sticky filter bar — sits below the fixed navbar (top-16) ── */}
      <div className="sticky top-16 z-30 bg-cream-paper shadow-sm">
        <FilterBar active={category} onChange={handleCategory} />
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

      {/* ── Grid ── */}
      <div className="bg-cream-paper">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-8 pb-4">
          <p className="font-sans text-[11px] text-warm-gray">
            <span className="font-bold text-primary-blue text-base">{filtered.length}</span>
            {' '}article{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 pb-14">
          <MenuGrid items={filtered} onSelectItem={setSelected} />
        </div>
      </div>

      {selected && <ItemModal item={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
