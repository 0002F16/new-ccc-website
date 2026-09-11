type EmployerLogo = {
  name: string
  src: string
  width: number
  height: number
}

const EMPLOYER_LOGOS: readonly EmployerLogo[] = [
  {
    name: 'JPMorgan Chase',
    src: '/logos/jpmorgan-chase.png',
    width: 360,
    height: 41,
  },
  { name: 'Visa', src: '/logos/visa.png', width: 360, height: 117 },
  { name: 'Accenture', src: '/logos/accenture.png', width: 360, height: 95 },
  { name: 'P&G', src: '/logos/pg.png', width: 360, height: 157 },
  { name: 'NielsenIQ', src: '/logos/nielseniq.png', width: 360, height: 131 },
  { name: 'ING', src: '/logos/ing.png', width: 330, height: 112 },
  { name: 'Maersk', src: '/logos/maersk.png', width: 330, height: 76 },
]

function LogoSequence({ duplicate }: { duplicate?: boolean }) {
  return (
    <ul
      aria-hidden={duplicate || undefined}
      className="logo-sequence flex shrink-0 items-center gap-flow pr-flow"
    >
      {EMPLOYER_LOGOS.map((logo) => (
        <li
          key={logo.name}
          className="logo-item flex h-logo-rail-m w-logo-m shrink-0 items-center justify-center px-tight md:h-logo-rail md:w-logo md:px-flow"
        >
          <img
            src={logo.src}
            width={logo.width}
            height={logo.height}
            alt={duplicate ? '' : logo.name}
            loading="lazy"
            decoding="async"
            className="logo-image max-h-block-m max-w-full object-contain"
          />
        </li>
      ))}
    </ul>
  )
}

/**
 * A market-context rail, not partnership proof. The second sequence is visual
 * continuity only and is removed from the accessibility tree.
 */
export function LogoCarousel() {
  return (
    <div className="logo-carousel">
      <div
        role="region"
        aria-label="Multinational employers in Poland"
        aria-live="off"
        className="logo-viewport overflow-hidden border-y border-line-soft"
      >
        <div className="logo-track flex w-max items-center py-tight">
          <LogoSequence />
          <LogoSequence duplicate />
        </div>
      </div>
    </div>
  )
}
