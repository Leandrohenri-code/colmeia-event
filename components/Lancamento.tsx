"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Eyebrow from "./ui/Eyebrow";

export default function Lancamento() {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    let cleanup: (() => void) | undefined;
    import("gsap").then((g) => {
      import("gsap/ScrollTrigger").then((st) => {
        const gsap = g.gsap;
        gsap.registerPlugin(st.ScrollTrigger);
        const ctx = gsap.context(() => {
          gsap.from(".ep-title", {
            clipPath: "inset(0 100% 0 0)", duration: 1.0, ease: "power3.inOut",
            scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
          });
        }, sectionRef);
        cleanup = () => ctx.revert();
      });
    });
    return () => cleanup?.();
  }, []);

  return (
    <section ref={sectionRef} className="lancamento-section" style={{
      position: "relative", background: "#050505",
      borderTop: "0.5px solid var(--border-faint)", borderBottom: "0.5px solid var(--border-faint)",
      padding: "96px 24px 88px",
      display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image src="/assets/deeko-cover.jpg" alt="" fill style={{ objectFit: "cover", objectPosition: "center", opacity: 0.06 }} />
      </div>
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "860px", margin: "0 auto" }}>
        <Eyebrow>Exclusivo</Eyebrow>
        <h2 className="ep-title font-display" style={{ fontSize: "clamp(40px,7vw,64px)", color: "#fff", marginBottom: "16px", overflow: "hidden" }}>
          EP DO DEEKO
        </h2>
        <p style={{ fontSize: "14px", color: "var(--text-mid)", maxWidth: "380px", margin: "0 auto 32px", lineHeight: 1.7 }}>
          Um lançamento exclusivo apresentado ao vivo na Colmeia.
        </p>
        <a
          href="https://open.spotify.com/album/1GkBAhsBHcOr6M0NjqL0EK?si=FaH6BgHRQhiT5IfSq60aDA"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            background: "#1DB954", color: "#000",
            fontWeight: 700, fontSize: "13px", letterSpacing: "0.06em",
            textTransform: "uppercase", textDecoration: "none",
            padding: "12px 24px", borderRadius: "100px",
            transition: "opacity 150ms ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          OUVIR NO SPOTIFY
        </a>
      </div>
    </section>
  );
}
