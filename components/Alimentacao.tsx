"use client";
import { useEffect, useRef } from "react";
import Eyebrow from "./ui/Eyebrow";

export default function Alimentacao() {
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
          gsap.from(".alimentacao-content", { opacity: 0, y: 32, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 78%" } });
        }, sectionRef);
        cleanup = () => ctx.revert();
      });
    });
    return () => cleanup?.();
  }, []);
  return (
    <section ref={sectionRef} style={{ background: "var(--bg-primary)", padding: "72px 24px 80px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      <div className="alimentacao-content" style={{ width: "100%" }}>
        <Eyebrow>No Evento</Eyebrow>
        <h2 className="font-display" style={{ fontSize: "clamp(32px,5vw,44px)", color: "#fff", marginBottom: "28px" }}>ALIMENTAÇÃO</h2>
        <div style={{ background: "var(--bg-card)", border: "0.5px solid var(--border-subtle)", borderRadius: "10px", padding: "22px 28px", display: "flex", alignItems: "center", gap: "16px", maxWidth: "340px", margin: "0 auto" }}>
          <span style={{ fontSize: "26px" }}>🍕</span>
          <div style={{ textAlign: "left" }}>
            <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-high)" }}>Pizza de Pepperoni</p>
            <p style={{ fontSize: "16px", color: "var(--text-low)", marginTop: "3px", fontFamily: "var(--font-bebas)", letterSpacing: "0.06em" }}>R$ 10,00 A FATIA</p>
          </div>
        </div>
      </div>
    </section>
  );
}
