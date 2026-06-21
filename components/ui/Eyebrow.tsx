import Hex from './Hex'

export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
      <Hex size={10} opacity={0.50} />
      <span style={{
        fontFamily: 'var(--font-inter)',
        fontSize: '10px',
        fontWeight: 500,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'var(--text-low)',
      }}>
        {children}
      </span>
      <div style={{ flex: 1, maxWidth: '48px', height: '0.5px', background: 'var(--border-subtle)' }} />
    </div>
  )
}
