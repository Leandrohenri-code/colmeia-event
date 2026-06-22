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

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

          {/* Gabriel Felix */}
          <div className="lineup-card" style={{
            height: "220px", borderRadius: "12px", overflow: "hidden",
            border: "0.5px solid var(--border-subtle)", position: "relative",
            display: "flex", alignItems: "flex-end", padding: "24px 28px",
          }}>
            <Image
              className="card-bg-media"
              src="/assets/gabriel-felix.jpg"
              alt=""
              fill
              style={{ objectFit: "cover", objectPosition: "center center", opacity: 0.70 }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.82) 30%, rgba(0,0,0,0.10) 100%)",
            }} />
            <div style={{ position: "relative", zIndex: 2 }}>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.50)", letterSpacing: "0.10em", marginBottom: "4px", textTransform: "uppercase" }}>16h – 17h30</div>
              <div style={{ fontSize: "26px", fontWeight: 700, color: "#fff", letterSpacing: "0.02em" }}>Gabriel Felix</div>
            </div>
          </div>

          {/* Nectar — vídeo */}
          <div className="lineup-card" style={{
            height: "220px", borderRadius: "12px", overflow: "hidden",
            border: "0.5px solid var(--border-subtle)", position: "relative",
            display: "flex", alignItems: "flex-end", padding: "24px 28px",
          }}>
            <video
              className="card-bg-media"
              src="/assets/nectar-set.mp4"
              autoPlay muted loop playsInline
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.70 }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.82) 30%, rgba(0,0,0,0.10) 100%)",
            }} />
            <div style={{ position: "relative", zIndex: 2 }}>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.50)", letterSpacing: "0.10em", marginBottom: "4px", textTransform: "uppercase" }}>17h30 – 19h30</div>
              <div style={{ fontSize: "26px", fontWeight: 700, color: "#fff", letterSpacing: "0.02em" }}>Nectar</div>
            </div>
          </div>

          {/* Deeko — Headliner */}
          <div className="lineup-card" style={{
            height: "300px", borderRadius: "12px", overflow: "hidden",
            border: "0.5px solid #3B3BCC", position: "relative",
            background: "#050505", display: "flex", flexDirection: "column", justifyContent: "flex-end",
            padding: "24px 28px",
          }}>
            <Image
              src="/assets/deeko-cover.jpg"
              alt=""
              fill
              style={{ objectFit: "cover", objectPosition: "center top", opacity: 0.55, mixBlendMode: "luminosity" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.90) 35%, rgba(0,0,0,0.20) 100%)",
            }} />

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
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.40)", letterSpacing: "0.10em", marginBottom: "6px", textTransform: "uppercase" }}>19h30 – 22h</div>
              <div style={{
                fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
                fontSize: "64px", letterSpacing: "0.08em", lineHeight: 0.95,
                color: "#ffffff",
              }}>DEEKO</div>
              <div style={{ width: "100%", height: "0.5px", background: "rgba(59,59,204,0.50)", marginTop: "16px" }} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
