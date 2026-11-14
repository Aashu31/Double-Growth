import type { ProjectVisual as ProjectVisualKey } from "@double-growth/shared";

/**
 * Original concept mock-ups. These are deliberately abstract UI studies, not
 * screenshots of a client's product. The parent card always carries a
 * "Design concept" label so the distinction is never lost.
 */
export function ProjectVisual({
  visual,
  className,
}: {
  visual: ProjectVisualKey;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 480 300"
      fill="none"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`pv-bg-${visual}`} x1="0" y1="0" x2="480" y2="300">
          <stop stopColor="#0B1020" />
          <stop offset="1" stopColor="#163B7A" />
        </linearGradient>
        <linearGradient id={`pv-photo-${visual}`} x1="0" y1="0" x2="480" y2="300">
          <stop stopColor="#3B82F6" stopOpacity="0.55" />
          <stop offset="1" stopColor="#22D3EE" stopOpacity="0.18" />
        </linearGradient>
      </defs>

      <rect width="480" height="300" fill={`url(#pv-bg-${visual})`} />
      <rect x="26" y="24" width="428" height="252" rx="14" fill="#F8FAFC" fillOpacity="0.97" />

      <rect x="26" y="24" width="428" height="30" rx="14" fill="#E2E8F0" />
      <circle cx="44" cy="39" r="4" fill="#F87171" />
      <circle cx="58" cy="39" r="4" fill="#FBBF24" />
      <circle cx="72" cy="39" r="4" fill="#34D399" />
      <rect x="96" y="35" width="150" height="8" rx="4" fill="#94A3B8" fillOpacity="0.5" />

      {visual === "interior" ? (
        <g>
          <text x="44" y="82" fill="#0B1020" fontSize="14" fontWeight="700" fontFamily="var(--font-geist-sans), sans-serif">
            Interior Studio
          </text>
          <rect x="330" y="68" width="104" height="20" rx="10" fill="#0B1020" />
          <text x="348" y="82" fill="#ffffff" fontSize="8" fontWeight="600" fontFamily="var(--font-geist-sans), sans-serif">
            REQUEST A QUOTE
          </text>
          <rect x="44" y="98" width="392" height="94" rx="8" fill={`url(#pv-photo-${visual})`} />
          <path d="M44 192 156 98h124L44 192Z" fill="#ffffff" fillOpacity="0.08" />
          <circle cx="366" cy="130" r="26" fill="#ffffff" fillOpacity="0.16" />
          <path d="M354 130h24M366 118v24" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <text x="44" y="220" fill="#0B1020" fontSize="12" fontWeight="600" fontFamily="var(--font-geist-sans), sans-serif">
            Living room study
          </text>
          <rect x="44" y="230" width="126" height="6" rx="3" fill="#94A3B8" />
          <rect x="44" y="242" width="88" height="6" rx="3" fill="#CBD5E1" />
          {[196, 268, 340].map((x, index) => (
            <g key={x}>
              <rect x={x} y="212" width="64" height="52" rx="7" fill="#E2E8F0" />
              <rect x={x} y="212" width="64" height="32" rx="7" fill={`url(#pv-photo-${visual})`} />
              <rect x={x + 8} y="250" width="36" height="4" rx="2" fill="#94A3B8" />
              <rect x={x + 8} y="257" width="24" height="4" rx="2" fill="#CBD5E1" />
              <circle cx={x + 56} cy="220" r="3" fill="#ffffff" fillOpacity={index === 0 ? 0.9 : 0.4} />
            </g>
          ))}
        </g>
      ) : null}

      {visual === "school" ? (
        <g>
          <rect x="26" y="54" width="104" height="222" fill="#0B1020" />
          <rect x="44" y="70" width="56" height="9" rx="4.5" fill="#ffffff" fillOpacity="0.7" />
          <rect x="44" y="96" width="68" height="7" rx="3.5" fill="#22D3EE" fillOpacity="0.75" />
          <rect x="44" y="114" width="52" height="7" rx="3.5" fill="#ffffff" fillOpacity="0.25" />
          <rect x="44" y="132" width="60" height="7" rx="3.5" fill="#ffffff" fillOpacity="0.18" />
          <rect x="44" y="150" width="46" height="7" rx="3.5" fill="#ffffff" fillOpacity="0.18" />
          <text x="146" y="84" fill="#0B1020" fontSize="13" fontWeight="700" fontFamily="var(--font-geist-sans), sans-serif">
            Today
          </text>
          <text x="146" y="98" fill="#64748B" fontSize="8" fontFamily="var(--font-geist-sans), sans-serif">
            Exceptions needing attention
          </text>
          <rect x="146" y="110" width="286" height="40" rx="7" fill="#EFF6FF" stroke="#BFDBFE" />
          <circle cx="162" cy="130" r="8" fill="#F59E0B" />
          <text x="178" y="126" fill="#0B1020" fontSize="8" fontWeight="600" fontFamily="var(--font-geist-sans), sans-serif">
            4 attendance follow-ups
          </text>
          <text x="178" y="138" fill="#64748B" fontSize="7" fontFamily="var(--font-geist-sans), sans-serif">
            Class 8 · unresolved since morning
          </text>
          <rect x="146" y="158" width="286" height="40" rx="7" fill="#F8FAFC" stroke="#E2E8F0" />
          <circle cx="162" cy="178" r="8" fill="#3B82F6" />
          <text x="178" y="174" fill="#0B1020" fontSize="8" fontWeight="600" fontFamily="var(--font-geist-sans), sans-serif">
            6 fee reminders queued
          </text>
          <text x="178" y="186" fill="#64748B" fontSize="7" fontFamily="var(--font-geist-sans), sans-serif">
            No payment credentials exposed
          </text>
          <rect x="146" y="206" width="286" height="40" rx="7" fill="#F8FAFC" stroke="#E2E8F0" />
          <circle cx="162" cy="226" r="8" fill="#10B981" />
          <text x="178" y="222" fill="#0B1020" fontSize="8" fontWeight="600" fontFamily="var(--font-geist-sans), sans-serif">
            2 parent messages waiting
          </text>
          <text x="178" y="234" fill="#64748B" fontSize="7" fontFamily="var(--font-geist-sans), sans-serif">
            Visible reply history
          </text>
          <rect x="146" y="254" width="88" height="14" rx="7" fill="#E2E8F0" />
          <rect x="242" y="254" width="88" height="14" rx="7" fill="#E2E8F0" />
        </g>
      ) : null}

      {visual === "field" ? (
        <g>
          <rect x="44" y="72" width="196" height="180" rx="10" fill="#0B1020" />
          <rect x="56" y="84" width="172" height="8" rx="4" fill="#ffffff" fillOpacity="0.18" />
          <rect x="56" y="102" width="118" height="10" rx="5" fill="#ffffff" fillOpacity="0.85" />
          <text x="56" y="132" fill="#93C5FD" fontSize="8" fontWeight="600" fontFamily="var(--font-geist-sans), sans-serif">
            CHECK COVERAGE
          </text>
          <rect x="56" y="140" width="172" height="26" rx="6" fill="#ffffff" fillOpacity="0.1" stroke="#93C5FD" strokeOpacity="0.3" />
          <text x="68" y="156" fill="#ffffff" fontSize="8" fillOpacity="0.7" fontFamily="var(--font-geist-sans), sans-serif">
            Postcode or area
          </text>
          <rect x="56" y="176" width="80" height="22" rx="6" fill="#3B82F6" />
          <text x="68" y="190" fill="#ffffff" fontSize="7" fontWeight="600" fontFamily="var(--font-geist-sans), sans-serif">
            Check
          </text>
          <rect x="56" y="210" width="172" height="30" rx="6" fill="#10B981" fillOpacity="0.14" stroke="#34D399" strokeOpacity="0.4" />
          <circle cx="70" cy="225" r="5" fill="#34D399" />
          <text x="82" y="223" fill="#ffffff" fontSize="7" fontWeight="600" fontFamily="var(--font-geist-sans), sans-serif">
            Covered
          </text>
          <text x="82" y="233" fill="#ffffff" fontSize="6" fillOpacity="0.5" fontFamily="var(--font-geist-sans), sans-serif">
            Next visit window shown
          </text>
          <rect x="260" y="72" width="172" height="180" rx="10" fill="#EFF6FF" stroke="#BFDBFE" />
          <path d="M274 122h144M274 158h144M274 194h144M320 100v140M382 100v140" stroke="#BFDBFE" strokeDasharray="4 5" />
          <path d="M274 190c28-44 64-22 84-58s42 6 60-24" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 5" />
          <circle cx="358" cy="132" r="9" fill="#2563EB" />
          <circle cx="358" cy="132" r="3" fill="#ffffff" />
          <rect x="274" y="222" width="96" height="8" rx="4" fill="#93C5FD" />
          <rect x="274" y="236" width="64" height="6" rx="3" fill="#BFDBFE" />
        </g>
      ) : null}
    </svg>
  );
}
