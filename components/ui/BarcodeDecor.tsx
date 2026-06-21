export default function BarcodeDecor({ opacity = 0.12 }: { opacity?: number }) {
  const bars = [3,1,2,1,3,2,1,1,2,3,1,2,1,3,1,2,2,1,3,1,2,1,1,3,2,1,2,3,1,2]
  let x = 8
  const rects: React.ReactNode[] = []
  bars.forEach((width, i) => {
    const height = 20 + (i % 3) * 4
    const y = (28 - height) / 2
    rects.push(<rect key={i} x={x} y={y} width={width} height={height} fill="white" />)
    x += width + 2
  })
  return (
    <div style={{ opacity, display: 'flex', justifyContent: 'center' }}>
      <svg width="160" height="28" viewBox="0 0 160 28">{rects}</svg>
    </div>
  )
}
