'use client'

import { useEffect, useRef } from 'react'

function BeeSVG({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size * 0.65}
      viewBox="0 0 52 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Corpo — wireframe branco */}
      <ellipse cx="26" cy="21" rx="11" ry="6.5" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.70)" strokeWidth="0.9"/>
      {/* Cabeça */}
      <ellipse cx="26" cy="13.5" rx="5" ry="4.5" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.60)" strokeWidth="0.9"/>
      {/* Listras */}
      <line x1="18" y1="19" x2="34" y2="19" stroke="rgba(255,255,255,0.45)" strokeWidth="1.0"/>
      <line x1="17" y1="22" x2="35" y2="22" stroke="rgba(255,255,255,0.35)" strokeWidth="1.0"/>
      <line x1="19" y1="25" x2="33" y2="25" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8"/>
      {/* Asa esquerda */}
      <ellipse cx="15" cy="16" rx="9" ry="4" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.55)" strokeWidth="0.7" transform="rotate(-20 15 16)"/>
      {/* Asa direita */}
      <ellipse cx="37" cy="16" rx="9" ry="4" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.55)" strokeWidth="0.7" transform="rotate(20 37 16)"/>
      {/* Antenas */}
      <path d="M23 10 Q18 5 14 3" stroke="rgba(255,255,255,0.60)" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
      <path d="M29 10 Q34 5 38 3" stroke="rgba(255,255,255,0.60)" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
      <circle cx="14" cy="3" r="1.4" fill="rgba(255,255,255,0.80)"/>
      <circle cx="38" cy="3" r="1.4" fill="rgba(255,255,255,0.80)"/>
      {/* Ferrão */}
      <path d="M26 27 L26 32" stroke="rgba(255,255,255,0.50)" strokeWidth="0.9" strokeLinecap="round"/>
    </svg>
  )
}

const BEE_DATA = [
  { l: 4,   t: 10,  s: 30, o: 0.82, r: -15, d: 4.2 },
  { l: 18,  t: 2,   s: 24, o: 0.68, r: 10,  d: 5.5 },
  { l: 36,  t: 0,   s: 28, o: 0.74, r: -5,  d: 3.8 },
  { l: 54,  t: 3,   s: 22, o: 0.60, r: 25,  d: 6.1 },
  { l: 70,  t: 0,   s: 26, o: 0.71, r: -20, d: 4.6 },
  { l: 86,  t: 8,   s: 32, o: 0.78, r: 5,   d: 5.0 },
  { l: 92,  t: 40,  s: 27, o: 0.65, r: -30, d: 3.5 },
  { l: 84,  t: 72,  s: 31, o: 0.80, r: 15,  d: 4.8 },
  { l: 62,  t: 84,  s: 20, o: 0.58, r: -10, d: 5.8 },
  { l: 40,  t: 88,  s: 29, o: 0.76, r: 20,  d: 4.0 },
  { l: 18,  t: 80,  s: 25, o: 0.69, r: -25, d: 6.3 },
  { l: 2,   t: 50,  s: 23, o: 0.62, r: 8,   d: 4.4 },
] as const

interface Props {
  variant?: 'hero' | 'navbar'
}

export default function LogoColmeia({ variant = 'hero' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isHero = variant === 'hero'

  useEffect(() => {
    if (!isHero) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any

    import('gsap').then((mod) => {
      const gsap = mod.gsap

      if (!containerRef.current) return
      ctx = gsap.context(() => {

        const bees = containerRef.current!.querySelectorAll<HTMLElement>('.bee-unit')
        bees.forEach((bee, i) => {
          const d = BEE_DATA[i]
          if (!d) return

          gsap.to(bee, {
            x: `random(-28, 28)`,
            y: `random(-18, 18)`,
            rotation: d.r + (Math.random() * 30 - 15),
            duration: d.d,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          })

          gsap.to(bee, {
            opacity: d.o * 0.5,
            duration: d.d * 0.7,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: Math.random() * 2,
          })

          const wings = bee.querySelector<SVGElement>('.bee-wings')
          if (wings) {
            gsap.to(wings, {
              scaleX: 0.82,
              duration: 0.055,
              ease: 'none',
              repeat: -1,
              yoyo: true,
              transformOrigin: 'center center',
            })
          }
        })

        const chars = containerRef.current!.querySelectorAll<HTMLElement>('.logo-char')
        gsap.from(chars, {
          opacity: 0,
          y: 50,
          rotateX: -45,
          duration: 0.75,
          stagger: 0.06,
          ease: 'power3.out',
          delay: 0.15,
        })

        const hex = containerRef.current!.querySelector<SVGElement>('.logo-hex-svg')
        if (hex) {
          gsap.from(hex, {
            scale: 0,
            opacity: 0,
            duration: 0.85,
            ease: 'back.out(2)',
            delay: 0.45,
            transformOrigin: 'center center',
          })
        }

        gsap.from(bees, {
          opacity: 0,
          scale: 0.2,
          duration: 0.45,
          stagger: 0.07,
          ease: 'back.out(2.5)',
          delay: 0.9,
        })

        const textEl = containerRef.current!.querySelector<HTMLElement>('.logo-neon-text')
        if (textEl) {
          gsap.to(textEl, {
            filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.90)) drop-shadow(0 0 16px rgba(255,255,255,0.50)) drop-shadow(0 0 32px rgba(255,255,255,0.25))',
            duration: 2.8,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          })
        }

      }, containerRef)
    })

    return () => ctx?.revert()
  }, [isHero])

  const fontSize = isHero ? '72px' : '20px'
  const hexSize  = isHero ? 70    : 20

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', userSelect: 'none' }}
    >
      {isHero && (
        <div
          style={{
            position: 'absolute',
            top: '-70px', bottom: '-70px',
            left: '-90px', right: '-90px',
            pointerEvents: 'none',
            zIndex: 3,
            overflow: 'visible',
          }}
          aria-hidden="true"
        >
          {BEE_DATA.map((bee, i) => (
            <div
              key={i}
              className="bee-unit"
              style={{
                position: 'absolute',
                left: `${bee.l}%`,
                top: `${bee.t}%`,
                opacity: bee.o,
                transform: `rotate(${bee.r}deg)`,
                willChange: 'transform, opacity',
              }}
            >
              <div className="bee-wings">
                <BeeSVG size={bee.s} />
              </div>
            </div>
          ))}
        </div>
      )}

      {isHero && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '-40px -60px',
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}

      <div
        className="logo-neon-text"
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          gap: '0px',
          fontFamily: 'var(--font-inter), Inter, sans-serif',
          fontWeight: 800,
          fontSize,
          letterSpacing: '0.05em',
          color: '#ffffff',
          filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.80)) drop-shadow(0 0 10px rgba(255,255,255,0.35)) drop-shadow(0 0 22px rgba(255,255,255,0.18))',
          perspective: '600px',
        }}
      >
        <span className="logo-char" style={{ display: 'inline-block' }}>[</span>

        <span
          className="logo-char"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: `${hexSize * 0.85}px`,
            height: `${hexSize}px`,
            margin: '0 2px',
          }}
        >
          <svg
            className="logo-hex-svg"
            width={hexSize * 0.82}
            height={hexSize}
            viewBox="0 0 56 65"
            fill="none"
            style={{
              filter: 'drop-shadow(0 0 4px #fff) drop-shadow(0 0 12px rgba(255,255,255,0.75))',
            }}
          >
            <polygon
              points="28,3 53,17 53,48 28,62 3,48 3,17"
              stroke="white"
              strokeWidth="4.5"
              fill="none"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        {'LMEIA'.split('').map((char, i) => (
          <span key={i} className="logo-char" style={{ display: 'inline-block' }}>
            {char}
          </span>
        ))}
      </div>
    </div>
  )
}
