"use client";
import { useEffect, useRef } from "react";
import Eyebrow from "./ui/Eyebrow";

export default function AfterParty() {
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
          gsap.from(".afterparty-content", { opacity: 0, y: 32, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 78%" } });
        }, sectionRef);
        cleanup = () => ctx.revert();
      });
    });
    return () => cleanup?.();
  }, []);
  return (
    <section ref={sectionRef} style={{ background: "var(--bg-primary)", padding: "72px 24px 88px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      <div className="afterparty-content">
        <Eyebrow>Mais</Eyebrow>
        <h2 className="font-display" style={{ fontSize: "clamp(36px,6vw,52px)", color: "#fff", marginBottom: "16px" }}>AFTER PARTY</h2>
        <p style={{ fontSize: "14px", color: "var(--text-mid)", maxWidth: "360px", marginBottom: "28px", lineHeight: 1.7 }}>
          Possibilidade de after após o encerramento oficial às 18h. Fique ligado nas redes.
        </p>
        {/* TODO: substituir href pelo link real do Instagram */}
        <a className="btn-secondary" href="#">SEGUIR NO INSTAGRAM</a>
      </div>
    </section>
  );
}
