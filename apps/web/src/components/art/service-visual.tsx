import type { ServiceId } from "@double-growth/shared";

/**
 * Original vector artwork for each service. Drawn in-house, rendered inline so
 * it stays sharp at every breakpoint and needs no third-party image licence.
 */
export function ServiceVisual({
  id,
  className,
}: {
  id: ServiceId;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 320 180"
      fill="none"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`svc-fade-${id}`} x1="0" y1="0" x2="320" y2="180">
          <stop stopColor="#ffffff" stopOpacity="0.14" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id={`svc-line-${id}`} x1="40" y1="0" x2="280" y2="180">
          <stop stopColor="#93C5FD" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>

      <rect width="320" height="180" fill={`url(#svc-fade-${id})`} />

      {id === "business-website" ? (
        <g>
          <rect x="52" y="34" width="216" height="118" rx="12" stroke="#93C5FD" strokeOpacity="0.5" />
          <path d="M52 56h216" stroke="#93C5FD" strokeOpacity="0.35" />
          <circle cx="65" cy="45" r="3" fill="#F87171" />
          <circle cx="76" cy="45" r="3" fill="#FBBF24" />
          <circle cx="87" cy="45" r="3" fill="#34D399" />
          <rect x="68" y="70" width="78" height="9" rx="4.5" fill="white" fillOpacity="0.75" />
          <rect x="68" y="86" width="110" height="6" rx="3" fill="white" fillOpacity="0.22" />
          <rect x="68" y="98" width="88" height="6" rx="3" fill="white" fillOpacity="0.22" />
          <rect x="68" y="117" width="52" height="16" rx="8" fill="#3B82F6" />
          <path d="m214 116 20-20 16 10 22-30" stroke={`url(#svc-line-${id})`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="272" cy="76" r="4" fill="#22D3EE" />
        </g>
      ) : null}

      {id === "ecommerce" ? (
        <g>
          <rect x="44" y="36" width="104" height="108" rx="12" stroke="#93C5FD" strokeOpacity="0.45" fill="#2563EB" fillOpacity="0.08" />
          <rect x="56" y="48" width="80" height="54" rx="8" fill="white" fillOpacity="0.1" />
          <path d="m72 90 18-22 14 14 10-8" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="56" y="112" width="56" height="7" rx="3.5" fill="white" fillOpacity="0.4" />
          <rect x="56" y="126" width="34" height="7" rx="3.5" fill="#22D3EE" fillOpacity="0.7" />
          <rect x="164" y="60" width="112" height="26" rx="13" stroke="#93C5FD" strokeOpacity="0.35" />
          <circle cx="180" cy="73" r="7" fill="#3B82F6" />
          <path d="M177 73h6m-2.5-2.5L183 73l-2.5 2.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="194" y="70" width="46" height="6" rx="3" fill="white" fillOpacity="0.35" />
          <rect x="164" y="98" width="112" height="46" rx="13" stroke="#93C5FD" strokeOpacity="0.35" fill="#0B1020" fillOpacity="0.25" />
          <rect x="178" y="112" width="42" height="7" rx="3.5" fill="white" fillOpacity="0.5" />
          <rect x="178" y="125" width="26" height="7" rx="3.5" fill="white" fillOpacity="0.2" />
          <path d="M246 108v18m0 0 6-6m-6 6-6-6" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ) : null}

      {id === "custom-applications" ? (
        <g>
          <rect x="40" y="30" width="240" height="120" rx="14" stroke="#93C5FD" strokeOpacity="0.45" fill="#2563EB" fillOpacity="0.06" />
          <rect x="40" y="30" width="58" height="120" rx="14" fill="white" fillOpacity="0.05" />
          <rect x="54" y="48" width="30" height="7" rx="3.5" fill="white" fillOpacity="0.55" />
          <rect x="54" y="66" width="24" height="6" rx="3" fill="white" fillOpacity="0.18" />
          <rect x="54" y="80" width="30" height="6" rx="3" fill="#22D3EE" fillOpacity="0.5" />
          <rect x="54" y="94" width="20" height="6" rx="3" fill="white" fillOpacity="0.18" />
          <rect x="112" y="46" width="68" height="38" rx="8" fill="white" fillOpacity="0.08" stroke="#93C5FD" strokeOpacity="0.25" />
          <rect x="122" y="56" width="20" height="6" rx="3" fill="#22D3EE" fillOpacity="0.7" />
          <rect x="122" y="68" width="42" height="5" rx="2.5" fill="white" fillOpacity="0.3" />
          <rect x="190" y="46" width="76" height="38" rx="8" fill="white" fillOpacity="0.08" stroke="#93C5FD" strokeOpacity="0.25" />
          <path d="M202 74V62m10 12V56m10 18V66m10 8V60m10 14V64" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" />
          <rect x="112" y="94" width="154" height="42" rx="8" fill="white" fillOpacity="0.05" stroke="#93C5FD" strokeOpacity="0.2" />
          <rect x="124" y="106" width="64" height="6" rx="3" fill="white" fillOpacity="0.32" />
          <rect x="124" y="120" width="98" height="6" rx="3" fill="white" fillOpacity="0.16" />
          <circle cx="252" cy="115" r="5" fill="#34D399" fillOpacity="0.8" />
        </g>
      ) : null}

      {id === "school-management" ? (
        <g>
          <path d="M160 40 92 72v2h136v-2l-68-32Z" fill="#93C5FD" fillOpacity="0.18" stroke="#93C5FD" strokeOpacity="0.5" />
          <path d="M160 52v12M148 58h24" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" />
          <rect x="66" y="78" width="188" height="66" rx="10" stroke="#93C5FD" strokeOpacity="0.4" fill="#0B1020" fillOpacity="0.2" />
          {[0, 1, 2, 3, 4].map((column) =>
            [0, 1, 2].map((row) => (
              <rect
                key={`${column}-${row}`}
                x={80 + column * 34}
                y={92 + row * 15}
                width="24"
                height="8"
                rx="2.5"
                fill={(column + row) % 4 === 0 ? "#22D3EE" : "#ffffff"}
                fillOpacity={(column + row) % 4 === 0 ? 0.6 : 0.18}
              />
            )),
          )}
          <circle cx="272" cy="58" r="16" stroke="#93C5FD" strokeOpacity="0.4" />
          <path d="M266 58h12M272 52v12" stroke="#22D3EE" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      ) : null}

      {id === "ai-automation" ? (
        <g>
          <circle cx="160" cy="92" r="34" stroke="#93C5FD" strokeOpacity="0.35" strokeDasharray="4 6" />
          <circle cx="160" cy="92" r="18" fill="#2563EB" fillOpacity="0.22" stroke="#22D3EE" strokeOpacity="0.6" />
          <path d="M160 82v20M150 92h20" stroke="#22D3EE" strokeWidth="1.8" strokeLinecap="round" />
          {[
            [96, 56],
            [232, 52],
            [84, 126],
            [238, 128],
            [160, 30],
          ].map(([x, y], index) => (
            <g key={`${x}-${y}`}>
              <path
                d={`M${x} ${y} Q 160 92 160 92`}
                stroke="#93C5FD"
                strokeOpacity="0.28"
                strokeDasharray="3 5"
              />
              <circle cx={x} cy={y} r={index === 4 ? 9 : 7} fill="#0B1020" stroke="#93C5FD" strokeOpacity="0.5" />
              <circle cx={x} cy={y} r="2.5" fill="#22D3EE" />
            </g>
          ))}
          <path d="m206 148 4 10 10 4-10 4-4 10-4-10-10-4 10-4 4-10Z" fill="#22D3EE" fillOpacity="0.55" />
        </g>
      ) : null}

      {id === "cloud-devops" ? (
        <g>
          <path
            d="M108 92a24 24 0 0 1 24-24 28 28 0 0 1 52 8 20 20 0 0 1 6 40h-62a22 22 0 0 1-20-24Z"
            fill="#2563EB"
            fillOpacity="0.14"
            stroke="#93C5FD"
            strokeOpacity="0.5"
          />
          <path d="M132 102h20m-8-8 8 8-8 8" stroke="#22D3EE" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M168 102h22m-8-8 8 8-8 8" stroke="white" strokeOpacity="0.4" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="60" y="132" width="200" height="10" rx="5" fill="white" fillOpacity="0.08" />
          <rect x="60" y="132" width="128" height="10" rx="5" fill="#22D3EE" fillOpacity="0.6" />
          <circle cx="196" cy="137" r="4" fill="#34D399" />
          <circle cx="60" cy="48" r="4" fill="#34D399" />
          <path d="M60 52v22" stroke="#34D399" strokeOpacity="0.5" strokeDasharray="3 4" />
          <circle cx="272" cy="122" r="7" stroke="#93C5FD" strokeOpacity="0.5" />
          <path d="m269 122 2 2 4-4" stroke="#22D3EE" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ) : null}

      {id === "maintenance-support" ? (
        <g>
          <path
            d="M160 40 116 58v34c0 26 18 44 44 50 26-6 44-24 44-50V58l-44-18Z"
            fill="#2563EB"
            fillOpacity="0.12"
            stroke="#93C5FD"
            strokeOpacity="0.5"
          />
          <path d="m143 92 12 12 24-26" stroke="#22D3EE" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="76" cy="64" r="14" stroke="#93C5FD" strokeOpacity="0.35" strokeDasharray="4 4" />
          <circle cx="248" cy="120" r="10" stroke="#93C5FD" strokeOpacity="0.35" strokeDasharray="4 4" />
          <path d="M76 50v8m0 12v8m-14-14h8m12 0h8" stroke="#93C5FD" strokeWidth="1.6" strokeLinecap="round" />
          <rect x="220" y="44" width="44" height="8" rx="4" fill="white" fillOpacity="0.15" />
          <rect x="220" y="58" width="28" height="8" rx="4" fill="white" fillOpacity="0.1" />
        </g>
      ) : null}

      {id === "digital-solutions" ? (
        <g>
          <path d="M62 60h196" stroke="#93C5FD" strokeOpacity="0.25" strokeDasharray="4 6" />
          <path d="M62 120h196" stroke="#93C5FD" strokeOpacity="0.25" strokeDasharray="4 6" />
          <path d="M70 130c34-6 54-30 86-30s52-24 92-28" stroke={`url(#svc-line-${id})`} strokeWidth="3" strokeLinecap="round" />
          <circle cx="70" cy="130" r="5" fill="#3B82F6" />
          <circle cx="156" cy="100" r="5" fill="#60A5FA" />
          <circle cx="248" cy="72" r="5" fill="#22D3EE" />
          <rect x="212" y="96" width="52" height="10" rx="5" fill="white" fillOpacity="0.15" />
          <rect x="212" y="112" width="34" height="10" rx="5" fill="#22D3EE" fillOpacity="0.45" />
          <rect x="56" y="52" width="58" height="10" rx="5" fill="white" fillOpacity="0.12" />
          <path d="m236 44 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z" fill="#22D3EE" fillOpacity="0.5" />
        </g>
      ) : null}
    </svg>
  );
}
