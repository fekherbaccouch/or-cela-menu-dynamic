/* Ornate Tunisian border frame — geometric tile strip + circular corner medallions */

const TILE = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#001468"/>
  <rect x="0.5" y="0.5" width="63" height="63" fill="none" stroke="#C8941B" stroke-width="0.5"/>
  <polygon points="32,5 59,32 32,59 5,32" fill="#EDE0C4"/>
  <polygon points="32,11 53,32 32,53 11,32" fill="#C8941B"/>
  <polygon points="32,17 47,32 32,47 17,32" fill="#C85820"/>
  <polygon points="32,23 41,32 32,41 23,32" fill="#001468"/>
  <polygon points="32,27 37,32 32,37 27,32" fill="#C8941B"/>
  <circle cx="32" cy="32" r="2.5" fill="#001468"/>
  <circle cx="32" cy="32" r="1.2" fill="#EDE0C4"/>
  <ellipse cx="32" cy="1"  rx="3.5" ry="5" fill="#3A6B2A"/>
  <ellipse cx="32" cy="63" rx="3.5" ry="5" fill="#3A6B2A"/>
  <ellipse cx="1"  cy="32" rx="5" ry="3.5" fill="#3A6B2A"/>
  <ellipse cx="63" cy="32" rx="5" ry="3.5" fill="#3A6B2A"/>
  <circle cx="0"  cy="0"  r="9" fill="#C85820"/>
  <circle cx="64" cy="0"  r="9" fill="#C85820"/>
  <circle cx="0"  cy="64" r="9" fill="#C85820"/>
  <circle cx="64" cy="64" r="9" fill="#C85820"/>
  <ellipse cx="0"  cy="0"  rx="5" ry="3.5" fill="#EDE0C4" transform="rotate(45)"/>
  <ellipse cx="64" cy="0"  rx="5" ry="3.5" fill="#EDE0C4" transform="rotate(-45 64 0)"/>
  <ellipse cx="0"  cy="64" rx="5" ry="3.5" fill="#EDE0C4" transform="rotate(-45 0 64)"/>
  <ellipse cx="64" cy="64" rx="5" ry="3.5" fill="#EDE0C4" transform="rotate(45 64 64)"/>
  <circle cx="0"  cy="0"  r="5" fill="none" stroke="#C8941B" stroke-width="0.8"/>
  <circle cx="64" cy="0"  r="5" fill="none" stroke="#C8941B" stroke-width="0.8"/>
  <circle cx="0"  cy="64" r="5" fill="none" stroke="#C8941B" stroke-width="0.8"/>
  <circle cx="64" cy="64" r="5" fill="none" stroke="#C8941B" stroke-width="0.8"/>
</svg>`)

const TILE_URL = `url("data:image/svg+xml,${TILE}")`

function Corner({ pos }) {
  const placement = {
    'tl': 'top-0 left-0 -translate-x-1/3 -translate-y-1/3',
    'tr': 'top-0 right-0  translate-x-1/3 -translate-y-1/3',
    'bl': 'bottom-0 left-0 -translate-x-1/3  translate-y-1/3',
    'br': 'bottom-0 right-0  translate-x-1/3  translate-y-1/3',
  }[pos]

  return (
    <div className={`absolute z-20 w-44 h-44 rounded-full overflow-hidden
      shadow-xl pointer-events-none select-none ${placement}`}
      style={{ border: '3px solid #C8941B' }}
    >
      <img src="/chart.png" alt="" aria-hidden="true"
        className="w-full h-full object-cover" />
    </div>
  )
}

export default function OrnateBorder({ children }) {
  return (
    <div className="relative w-full overflow-hidden">

      {/* ── Border strips ── */}
      <div className="absolute inset-x-0 top-0    h-16 z-10 pointer-events-none"
        style={{ backgroundImage: TILE_URL, backgroundSize: '64px 64px' }} />
      <div className="absolute inset-x-0 bottom-0 h-16 z-10 pointer-events-none"
        style={{ backgroundImage: TILE_URL, backgroundSize: '64px 64px' }} />
      <div className="absolute inset-y-0 left-0   w-16 z-10 pointer-events-none"
        style={{ backgroundImage: TILE_URL, backgroundSize: '64px 64px' }} />
      <div className="absolute inset-y-0 right-0  w-16 z-10 pointer-events-none"
        style={{ backgroundImage: TILE_URL, backgroundSize: '64px 64px' }} />

      {/* ── Corner medallions ── */}
      <Corner pos="tl" />
      <Corner pos="tr" />
      <Corner pos="bl" />
      <Corner pos="br" />

      {/* ── Content ── */}
      <div className="relative z-0 px-20 py-20">
        {children}
      </div>
    </div>
  )
}
