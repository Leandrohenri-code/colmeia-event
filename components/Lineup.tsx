"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Eyebrow from "./ui/Eyebrow";

export default function Lineup() {
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
          gsap.from(".lineup-card", {
            opacity: 0,
            x: -36,
            duration: 0.70,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 78%",
            },
          });
        }, sectionRef);
        cleanup = () => ctx.revert();
      });
    });
    return () => cleanup?.();
  }, []);

  return (
    <section ref={sectionRef} id="lineup" className="lineup-section"
      style={{ background: "var(--bg-primary)", padding: "96px 24px 80px" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        <Eyebrow>Line-Up</Eyebrow>
        <h2 className="font-display" style={{ fontSize: "clamp(36px,6vw,52px)", color: "#fff", marginBottom: "36px" }}>
          PROGRAMAÇÃO
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>

          {/* Gabriel Felix — foto */}
          <div className="lineup-card" style={{
            height: "160px", borderRadius: "10px", overflow: "hidden",
            border: "0.5px solid var(--border-subtle)", position: "relative",
            display: "flex", alignItems: "flex-end", padding: "20px 24px",
          }}>
            <Image
              className="card-bg-media"
              src="/assets/gabriel-felix.jpg"
              alt=""
              fill
              style={{ objectFit: "cover", objectPosition: "center top", opacity: 0.35 }}
            />
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.68)" }} />
            <div style={{ position: "relative", zIndex: 2 }}>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", marginBottom: "4px" }}>14h – 15h</div>
              <div style={{ fontSize: "22px", fontWeight: 700, color: "#fff", letterSpacing: "0.02em" }}>Gabriel Felix</div>
            </div>
          </div>

          {/* Nectar — vídeo */}
          <div className="lineup-card" style={{
            height: "160px", borderRadius: "10px", overflow: "hidden",
            border: "0.5px solid var(--border-subtle)", position: "relative",
            display: "flex", alignItems: "flex-end", padding: "20px 24px",
          }}>
            <video
              className="card-bg-media"
              src="/assets/nectar-set.mp4"
              autoPlay muted loop playsInline
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }}
            />
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.70)" }} />

            <div style={{
              position: "absolute", top: "14px", left: "20px",
              display: "flex", alignItems: "center",
              background: "rgba(59,59,204,0.15)",
              border: "0.5px solid rgba(59,59,204,0.50)",
              borderRadius: "3px", padding: "4px 10px",
              fontSize: "10px", fontWeight: 600,
              letterSpacing: "0.12em", color: "rgba(255,255,255,0.80)",
              textTransform: "uppercase",
            }}>
              <span className="badge-live-dot" />
              AO VIVO
            </div>

            <div style={{ position: "relative", zIndex: 2 }}>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", marginBottom: "4px" }}>15h – 16h</div>
              <div style={{ fontSize: "22px", fontWeight: 700, color: "#fff", letterSpacing: "0.02em" }}>Nectar</div>
            </div>
          </div>

          {/* Deeko — Headliner */}
          <div className="lineup-card" style={{
            minHeight: "220px", borderRadius: "10px", overflow: "hidden",
            border: "0.5px solid #3B3BCC", position: "relative",
            background: "#050505", display: "flex", flexDirection: "column", justifyContent: "flex-end",
            padding: "24px 28px",
          }}>
            <Image
              src="/assets/deeko-cover.jpg"
              alt=""
              fill
              style={{ objectFit: "cover", opacity: 0.10, mixBlendMode: "luminosity" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0.70) 100%)" }} />

            <div style={{ position: "absolute", top: "20px", left: "28px", display: "flex", gap: "8px" }}>
              <span style={{
                background: "#3B3BCC", color: "#fff",
                fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em",
                padding: "4px 10px", borderRadius: "3px", textTransform: "uppercase",
              }}>Headliner</span>
              <span style={{
                background: "transparent", color: "rgba(255,255,255,0.55)",
                fontSize: "10px", fontWeight: 500, letterSpacing: "0.10em",
                padding: "4px 10px", borderRadius: "3px", textTransform: "uppercase",
                border: "0.5px solid rgba(255,255,255,0.20)",
              }}>EP Exclusivo</span>
            </div>

            <div style={{ position: "relative", zIndex: 2 }}>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.30)", letterSpacing: "0.08em", marginBottom: "6px" }}>16h – 18h</div>
              <div style={{
                fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                fontSize: "52px", letterSpacing: "0.08em", lineHeight: 0.95,
                color: "#ffffff",
              }}>DEEKO</div>
              <div style={{ width: "100%", height: "0.5px", background: "rgba(59,59,204,0.45)", marginTop: "16px" }} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
