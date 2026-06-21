export default function HalftoneSeparator() {
  const dots: React.ReactNode[] = []
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 20; col++) {
      const size = Math.max(1, 3 - row * 0.8)
      dots.push(
        <circle
          key={`${row}-${col}`}
          cx={col * 16 + (row % 2) * 8 + 8}
          cy={row * 10 + 6}
          r={size}
          fill="white"
          opacity={0.06 + (2 - row) * 0.03}
        />
      )
    }
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 0' }}>
      <svg width="340" height="36" viewBox="0 0 340 36">{dots}</svg>
    </div>
  )
}
