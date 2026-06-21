"use client";
import { useState, useEffect, useRef } from "react";
import Eyebrow from "./ui/Eyebrow";
import CheckItem from "./ui/CheckItem";
import BarcodeDecor from "./ui/BarcodeDecor";

export default function Ingressos() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
          gsap.from(".ticket-card", {
            opacity: 0, y: 50, scale: 0.96, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
          });
        }, sectionRef);
        cleanup = () => ctx.revert();
      });
    });
    return () => cleanup?.();
  }, []);

  async function handleCheckout() {
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) { window.location.href = data.url; }
      else { setError(data.error ?? "Erro ao processar. Tente novamente."); setLoading(false); }
    } catch { setError("Erro ao processar. Tente novamente."); setLoading(false); }
  }

  return (
    <section ref={sectionRef} id="ingressos" className="ingressos-section"
      style={{ background: "var(--bg-primary)", padding: "80px 24px 96px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      <Eyebrow>Ingressos</Eyebrow>
      <h2 className="font-display" style={{ fontSize: "clamp(36px,6vw,52px)", color: "#fff", marginBottom: "40px" }}>
        GARANTA O SEU
      </h2>

      <div className="ticket-card" style={{
        background: "var(--bg-card)", border: "0.5px solid var(--border-glow)",
        borderRadius: "10px", padding: "36px 32px",
        maxWidth: "400px", width: "100%",
      }}>
        {/* Eyebrow inside card */}
        <div style={{ marginBottom: "16px" }}>
          <Eyebrow>Ingresso Individual</Eyebrow>
        </div>

        <span className="font-display" style={{ fontSize: "72px", color: "#fff", display: "block", lineHeight: 1 }}>
          R$ 50
        </span>
        <p style={{ fontSize: "12px", color: "var(--text-low)", marginBottom: "4px", marginTop: "4px", letterSpacing: "0.06em" }}>
          por pessoa
        </p>

        {/* Ticket divider */}
        <hr className="ticket-divider" />

        <div style={{ textAlign: "left", marginBottom: "24px" }}>
          <CheckItem>Open Vodka durante todo o evento</CheckItem>
          <CheckItem>Energético liberado</CheckItem>
          <CheckItem>Acesso ao line-up completo</CheckItem>
          <CheckItem>Possibilidade de after party</CheckItem>
        </div>

        <button
          className="btn-primary cta-btn-ticket"
          style={{ width: "100%", padding: "14px 28px", fontSize: "13px" }}
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? (
            <span className="loading-dots"><span>.</span><span>.</span><span>.</span></span>
          ) : "COMPRAR INGRESSO"}
        </button>

        {error && <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", marginTop: "10px" }}>{error}</p>}

        <BarcodeDecor opacity={0.10} />

        <p style={{ fontSize: "10px", color: "var(--text-faint)", letterSpacing: "0.06em", marginTop: "14px", textTransform: "uppercase" }}>
          Mercado Pago · PIX · Cartão · Boleto
        </p>
        <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.12)", marginTop: "6px" }}>
          Programação sujeita a alterações
        </p>
      </div>
    </section>
  );
}
