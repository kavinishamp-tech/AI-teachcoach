const R = 17
const C = 2 * Math.PI * R

export default function ProgressRing({
  pct = 0,
  color = '#06b6d4',
  trackColor = '#1e293b',
  size = 42,
  strokeWidth = 4.5,
  showText = true,
}) {
  const filled = (Math.min(100, Math.max(0, pct)) / 100) * C
  const empty = C - filled

  return (
    <div className="relative shrink-0 flex items-center justify-center select-none" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 40 40" className="rotate-[-90deg]">
        <circle
          cx="20"
          cy="20"
          r={R}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx="20"
          cy="20"
          r={R}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${filled} ${empty}`}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dasharray 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            filter: `drop-shadow(0 0 3px ${color}80)`,
          }}
        />
      </svg>
      {showText && (
        <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold text-slate-200">
          {Math.round(pct)}%
        </span>
      )}
    </div>
  )
}
