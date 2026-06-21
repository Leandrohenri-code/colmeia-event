export default function GloboWireframe({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="0.8"/>
      <ellipse cx="12" cy="12" rx="4" ry="10" stroke="currentColor" strokeWidth="0.8"/>
      <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="0.8"/>
      <line x1="4" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="0.6"/>
      <line x1="4" y1="17" x2="20" y2="17" stroke="currentColor" strokeWidth="0.6"/>
    </svg>
  )
}
