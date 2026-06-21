interface HexProps {
  size?: number
  opacity?: number
  filled?: boolean
  glow?: boolean
  accent?: boolean
  className?: string
}

export default function Hex({ size = 24, opacity = 0.12, filled = false, glow = false, accent = false, className }: HexProps) {
  const color = accent ? '#3B3BCC' : 'white'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 115"
      fill="none"
      className={className}
      style={{
        opacity,
        filter: glow
          ? `drop-shadow(0 0 6px ${color}) drop-shadow(0 0 14px ${color})`
          : 'none',
        flexShrink: 0,
      }}
    >
      <polygon
        points="50,4 96,28 96,87 50,111 4,87 4,28"
        stroke={color}
        strokeWidth="3"
        fill={filled ? `${color}18` : 'none'}
      />
    </svg>
  )
}
