'use client'

import { useEffect } from 'react'

export default function CursorGlobal() {
  useEffect(() => {
    const cursor = document.getElementById('colmeia-cursor')
    if (!cursor) return

    const onMove = (e: MouseEvent) => {
      import('gsap').then(({ gsap }) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.14,
          ease: 'power2.out',
        })
      })
    }

    const onEnter = () => cursor.classList.add('is-hovering')
    const onLeave = () => cursor.classList.remove('is-hovering')
    const onDown  = () => cursor.classList.add('is-clicking')
    const onUp    = () => cursor.classList.remove('is-clicking')

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    const interactives = document.querySelectorAll('a, button, [role="button"]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return <div id="colmeia-cursor" aria-hidden="true" />
}
