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
        <div style={{
          border: "0.5px dashed rgba(255,255,255,0.12)", borderRadius: "10px",
          height: "152px", width: "100%", maxWidth: "480px", margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <p style={{ fontSize: "10px", color: "var(--text-faint)", letterSpacing: "0.10em", textTransform: "uppercase" }}>
            {/* TODO: substituir pelo embed real após lançamento */}
            [Embed Spotify / SoundCloud / YouTube]
          </p>
        </div>
        <p style={{ fontSize: "11px", color: "var(--text-faint)", letterSpacing: "0.06em", marginTop: "16px" }}>
          Conteúdo integrado após o lançamento oficial
        </p>
      </div>
    </section>
  );
}
