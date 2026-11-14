/**
 * The hero's primary artwork: an orbit diagram representing the three parts of
 * the engagement — build, automate, grow. Original vector work, no stock asset.
 */
export function GrowthOrbit({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 560"
      fill="none"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="orbit-core" cx="50%" cy="50%" r="50%">
          <stop stopColor="#3B82F6" stopOpacity="0.55" />
          <stop offset="1" stopColor="#2563EB" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="orbit-line" x1="90" y1="120" x2="470" y2="450">
          <stop stopColor="#93C5FD" stopOpacity="0.7" />
          <stop offset="0.55" stopColor="#3B82F6" stopOpacity="0.35" />
          <stop offset="1" stopColor="#22D3EE" stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id="orbit-arc" x1="120" y1="90" x2="460" y2="420">
          <stop stopColor="#22D3EE" />
          <stop offset="1" stopColor="#2563EB" stopOpacity="0.2" />
        </linearGradient>
        <filter id="orbit-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      <circle cx="280" cy="280" r="190" fill="url(#orbit-core)" />

      {[86, 132, 178, 224, 264].map((radius, index) => (
        <circle
          key={radius}
          cx="280"
          cy="280"
          r={radius}
          stroke="#ffffff"
          strokeOpacity={index === 2 ? 0.16 : 0.07}
          strokeWidth="1"
          strokeDasharray={index === 3 ? "3 8" : undefined}
        />
      ))}

      <circle
        cx="280"
        cy="280"
        r="224"
        stroke="url(#orbit-arc)"
        strokeWidth="1.5"
        strokeDasharray="180 900"
        strokeLinecap="round"
        className="orbit-spin"
        style={{ transformOrigin: "280px 280px" }}
      />

      <g opacity="0.9">
        <path
          d="M280 56 A224 224 0 0 1 504 280"
          stroke="url(#orbit-line)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M56 280 A224 224 0 0 0 280 504"
          stroke="url(#orbit-line)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="4 10"
        />
      </g>

      {/* Axes */}
      <path d="M280 30v500M30 280h500" stroke="#ffffff" strokeOpacity="0.05" />

      {/* Centre mark */}
      <g filter="url(#orbit-glow)" opacity="0.6">
        <circle cx="280" cy="280" r="44" fill="#2563EB" fillOpacity="0.35" />
      </g>
      <circle cx="280" cy="280" r="58" fill="#0B1020" fillOpacity="0.7" stroke="#ffffff" strokeOpacity="0.14" />
      <path
        d="M250 302 280 252l30 50"
        stroke="#ffffff"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M250 316 280 266l30 50"
        stroke="#22D3EE"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />

      {/* Orbit nodes */}
      <g>
        <circle cx="280" cy="56" r="7" fill="#22D3EE" />
        <circle cx="280" cy="56" r="16" stroke="#22D3EE" strokeOpacity="0.3" />
      </g>
      <g>
        <circle cx="474" cy="360" r="7" fill="#93C5FD" />
        <circle cx="474" cy="360" r="16" stroke="#93C5FD" strokeOpacity="0.25" />
      </g>
      <g>
        <circle cx="96" cy="392" r="7" fill="#3B82F6" />
        <circle cx="96" cy="392" r="16" stroke="#3B82F6" strokeOpacity="0.3" />
      </g>

      {/* Anchor ticks */}
      <path d="M280 40v20M280 500v20M40 280h20M500 280h20" stroke="#ffffff" strokeOpacity="0.18" />
    </svg>
  );
}
