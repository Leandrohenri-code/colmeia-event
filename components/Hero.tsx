"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Hex from "./ui/Hex";
import Eyebrow from "./ui/Eyebrow";
import LogoColmeia from "./LogoColmeia";

async function doCheckout() {
  try {
    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  } catch {}
}

const HEX_POSITIONS = [
  { x: 8,  y: 12, size: 90,  opacity: 0.04, cls: "" },
  { x: 22, y: 4,  size: 60,  opacity: 0.03, cls: "hex-bg-slow" },
  { x: 35, y: 18, size: 110, opacity: 0.05, cls: "" },
  { x: 52, y: 6,  size: 75,  opacity: 0.03, cls: "hex-bg-medium" },
  { x: 68, y: 15, size: 95,  opacity: 0.04, cls: "" },
  { x: 82, y: 5,  size: 65,  opacity: 0.03, cls: "hex-bg-slow" },
  { x: 5,  y: 55, size: 80,  opacity: 0.03, cls: "" },
  { x: 78, y: 50, size: 100, opacity: 0.04, cls: "hex-bg-medium" },
  { x: 90, y: 65, size: 70,  opacity: 0.03, cls: "" },
  { x: 15, y: 75, size: 85,  opacity: 0.04, cls: "" },
  { x: 60, y: 72, size: 55,  opacity: 0.03, cls: "hex-bg-slow" },
  { x: 45, y: 80, size: 120, opacity: 0.05, cls: "" },
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    import("gsap").then((g) => {
      import("gsap/ScrollTrigger").then((st) => {
        const gsap = g.gsap;
        const ScrollTrigger = st.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);

        // Split title
        const title = titleRef.current;
        if (title) {
          const text = title.textContent ?? "";
          title.innerHTML = text
            .split("")
            .map((c) => `<span class="char" style="display:inline-block">${c}</span>`)
            .join("");
        }

        const ctx = gsap.context(() => {
          gsap.from(eyebrowRef.current, { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" });
          gsap.from(".hero-title .char", { opacity: 0, y: 60, rotateX: -40, duration: 0.8, stagger: 0.04, ease: "power3.out", delay: 0.2 });
          gsap.from(subRef.current, { opacity: 0, y: 16, duration: 0.7, ease: "power3.out", delay: 0.6 });
          gsap.from(metaRef.current, { opacity: 0, y: 12, duration: 0.6, ease: "power3.out", delay: 0.8 });
          gsap.from(ctasRef.current, { opacity: 0, y: 20, duration: 0.7, ease: "power3.out", delay: 1.0 });

          // Hex rotations
          gsap.to(".hex-bg-slow", { rotation: 360, duration: 80, ease: "none", repeat: -1 });
          gsap.to(".hex-bg-medium", { rotation: -360, duration: 50, ease: "none", repeat: -1 });

          // Parallax
          if (bgRef.current) {
            gsap.to(bgRef.current, {
              yPercent: 30, ease: "none",
              scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
            });
          }
        }, sectionRef);

        return () => ctx.revert();
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="hero" style={{
      position: "relative", overflow: "hidden",
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: "140px 24px 100px",
    }}>
      {/* Hex grid background */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        {HEX_POSITIONS.map((h, i) => (
          <div key={i} className={h.cls} style={{ position: "absolute", left: `${h.x}%`, top: `${h.y}%`, transform: "translate(-50%,-50%)" }}>
            <Hex size={h.size} opacity={h.opacity} />
          </div>
        ))}
      </div>

      {/* Photo background */}
      <div ref={bgRef} style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <div className="hero-bg-image" style={{ position: "absolute", inset: 0 }}>
          <Image src="/assets/deeko-cover.jpg" alt="" fill priority style={{ objectFit: "cover", objectPosition: "center top" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.90) 100%)" }} />
        {/* Grain */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, zIndex: 2, pointerEvents: "none" }}>
          <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
          <rect width="100%" height="100%" filter="url(#grain)"/>
        </svg>
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: "560px", width: "100%" }}>
        <div ref={eyebrowRef} className="hero-eyebrow">
          <Eyebrow>Uma Experiência</Eyebrow>
        </div>

        <div className="hero-logo-wrapper" style={{ margin: "0 auto" }}>
          <LogoColmeia variant="hero" />
        </div>

        <p ref={subRef} style={{ fontSize: "14px", fontWeight: 500, letterSpacing: "0.06em", color: "rgba(255,255,255,0.70)", marginBottom: "20px", textTransform: "uppercase" }}>
          Open Vodka · Energético Liberado
        </p>

        <div ref={metaRef} style={{ marginBottom: "40px" }}>
          <p style={{ fontSize: "20px", color: "rgba(255,255,255,0.40)", marginBottom: "6px", fontFamily: "var(--font-bebas)", letterSpacing: "0.08em" }}>
            27 JUN · 16H ÀS 22H
          </p>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.28)", letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1.6 }}>
            R. Maria da Conceição Barra Mansa, 67 · Vila Pitangui · Lavras/MG
          </p>
        </div>

        <div ref={ctasRef} style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          <button className="btn-primary" onClick={doCheckout}>GARANTIR INGRESSO — R$ 50</button>
          <a className="btn-secondary" href="#lineup">VER LINE-UP</a>
        </div>
      </div>
    </section>
  );
}
