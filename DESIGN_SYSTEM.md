# Colmeia — Design System v4

## Cores

### Fundos
| Token | Valor | Uso |
|---|---|---|
| `--bg-primary` | `#000000` | Fundo global da página |
| `--bg-surface` | `#050505` | Superfícies secundárias |
| `--bg-elevated` | `#0a0a0a` | Elementos elevados |
| `--bg-card` | `#080808` | Cards de lineup, ingressos |

### Accent
| Token | Valor | Uso |
|---|---|---|
| `--accent` | `#3B3BCC` | CTA principal, borda Deeko, badge AO VIVO, dots hex |
| `--accent-mid` | `rgba(59,59,204,0.40)` | Hover states, glows |
| `--accent-faint` | `rgba(59,59,204,0.12)` | Fills sutis com accent |

### Bordas
| Token | Valor | Uso |
|---|---|---|
| `--border-glow` | `rgba(255,255,255,0.20)` | Bordas de destaque |
| `--border-subtle` | `rgba(255,255,255,0.08)` | Bordas padrão de cards |
| `--border-faint` | `rgba(255,255,255,0.04)` | Separadores muito sutis |

---

## Texto

Hierarquia em opacidade de branco — nunca usar cinza puro.

| Token | Valor | Uso |
|---|---|---|
| `--text-primary` | `#ffffff` | Títulos principais |
| `--text-high` | `rgba(255,255,255,0.90)` | Corpo de texto destacado |
| `--text-mid` | `rgba(255,255,255,0.55)` | Texto secundário |
| `--text-low` | `rgba(255,255,255,0.30)` | Labels, eyebrows |
| `--text-faint` | `rgba(255,255,255,0.15)` | Placeholders, decorativos |

---

## Tipografia

### Display — Bebas Neue
```css
font-family: var(--font-bebas), 'Bebas Neue', sans-serif;
letter-spacing: 0.06em;
line-height: 0.95;
```
Usado em: título hero (COLMEIA), nome DEEKO, preço R$ 50, data do evento.

### Body — Inter
```css
font-family: var(--font-inter), Inter, sans-serif;
```

| Peso | Uso |
|---|---|
| 400 | Texto corrido |
| 500 | Labels, eyebrows (+ letter-spacing 0.12–0.16em + uppercase) |
| 600 | Botões, subtítulos de seção |
| 700–800 | Títulos de seção em Inter |

---

## Espaçamento e Raio de Borda

| Token | Valor |
|---|---|
| `--radius-sm` | `3px` |
| `--radius-md` | `6px` |
| `--radius-lg` | `10px` |
| `--radius-pill` | `999px` |

---

## Botões

### `.btn-primary`
```css
background: #ffffff;
color: #000000;
font-size: 13px;
font-weight: 600;
letter-spacing: 0.08em;
text-transform: uppercase;
padding: 12px 28px;
border-radius: 6px;
```
Hover: `background: rgba(255,255,255,0.85)`

### `.btn-secondary`
```css
background: transparent;
color: #ffffff;
font-size: 13px;
font-weight: 500;
letter-spacing: 0.06em;
text-transform: uppercase;
padding: 11px 26px;
border-radius: 6px;
border: 1.5px solid rgba(255,255,255,0.35);
```
Hover: `border-color: rgba(255,255,255,0.70)` + `background: rgba(255,255,255,0.04)`

---

## Componentes de Identidade

### Hex SVG
Hexágono wireframe — motivo geométrico recorrente na identidade.
```tsx
<polygon points="50,4 96,28 96,87 50,111 4,87 4,28"
  stroke="white" strokeWidth="3" fill="none" />
// variantes: stroke="#3B3BCC", fill="rgba(59,59,204,0.10)" — versão accent
```
Tamanhos de uso: 10px (eyebrow), 24px (navbar), 32–64px (cards), 120px (decorativo footer).

### Eyebrow
```tsx
<Hex size={10} opacity={0.50} />
<span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.16em',
  textTransform: 'uppercase', color: 'var(--text-low)' }}>LABEL</span>
<div style={{ flex: 1, maxWidth: '48px', height: '0.5px',
  background: 'var(--border-subtle)' }} />
```

### Ticket Divider
```css
.ticket-divider {
  border-top: 1.5px dashed rgba(255,255,255,0.10);
  margin: 20px -32px;
  position: relative;
}
.ticket-divider::before, .ticket-divider::after {
  content: '';
  position: absolute;
  top: -8px;
  width: 14px; height: 14px;
  background: #000;
  border-radius: 50%;
  border: 0.5px solid rgba(255,255,255,0.06);
}
.ticket-divider::before { left: -7px; }
.ticket-divider::after  { right: -7px; }
```

### Custom Cursor
```css
.custom-cursor {
  width: 12px; height: 12px;
  border: 1px solid rgba(255,255,255,0.60);
  border-radius: 50%;
  mix-blend-mode: difference;
}
.custom-cursor.hovering {
  width: 32px; height: 32px;
  border-color: rgba(255,255,255,0.90);
  border-radius: 3px;
}
```
Movido via GSAP com `duration: 0.15, ease: 'power2.out'`.

### Badge AO VIVO
```css
background: #3B3BCC;
color: #fff;
font-size: 10px;
font-weight: 600;
letter-spacing: 0.12em;
text-transform: uppercase;
padding: 4px 10px;
border-radius: 3px;
```
Dot pulsante: `animation: pulse-badge 1.4s ease-in-out infinite`

---

## Animações

| Nome | Duração | Uso |
|---|---|---|
| `kenburns` | 20s ease-in-out infinite | Background do hero (scale 1.00→1.06) |
| `pulse-badge` | 1.4s ease-in-out infinite | Dot do badge AO VIVO (opacity 1→0.30) |
| `blink` | 1.2s infinite | Loading dots no CTA de ingresso |
| GSAP letter split | 0.06s stagger | Título COLMEIA letra a letra no load |
| GSAP parallax | ScrollTrigger | Hero background move -15% no scroll |
| GSAP hex rotation | ScrollTrigger | Hexágonos do hero rotacionam no scroll |
| CSS lineup hover | 600ms ease | Foto do card Gabriel Felix scale(1.05) |

Transição padrão para hover/UI states: `150ms ease`

---

## Navbar — estados

| Estado | Background | Backdrop | Botão INGRESSOS |
|---|---|---|---|
| Topo | `transparent` | nenhum | outline branco 50% |
| Scrolled (>80px) | `rgba(0,0,0,0.94)` | `blur(16px) saturate(0%)` | sólido branco |

---

## Regras gerais

- `cursor: none` em `body`, `a`, `button` — cursor nativo desabilitado globalmente
- `scroll-behavior: smooth` no html
- `-webkit-font-smoothing: antialiased` para renderização de texto
- Importação de fontes via `next/font/google` (não CDN) — variáveis CSS `--font-inter` e `--font-bebas`
- GSAP sempre importado dinamicamente dentro de `useEffect` (SSR-safe)
- Todos os componentes com handlers usam `"use client"`
- `prefers-reduced-motion` verificado antes de iniciar qualquer animação GSAP
