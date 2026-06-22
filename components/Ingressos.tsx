"use client";
import { useState, useEffect, useRef } from "react";
import Eyebrow from "./ui/Eyebrow";
import CheckItem from "./ui/CheckItem";
import BarcodeDecor from "./ui/BarcodeDecor";

export default function Ingressos() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pixCopied, setPixCopied] = useState(false);
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

  function copyPix() {
    navigator.clipboard.writeText("colmeiamovimento035@gmail.com");
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2500);
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
        <div style={{ marginBottom: "16px" }}>
          <Eyebrow>Ingresso Individual</Eyebrow>
        </div>

        <span className="font-display" style={{ fontSize: "72px", color: "#fff", display: "block", lineHeight: 1 }}>
          R$ 50
        </span>
        <p style={{ fontSize: "12px", color: "var(--text-low)", marginBottom: "4px", marginTop: "4px", letterSpacing: "0.06em" }}>
          por pessoa
        </p>

        <hr className="ticket-divider" />

        <div style={{ textAlign: "left", marginBottom: "24px" }}>
          <CheckItem>Open Vodka durante todo o evento</CheckItem>
          <CheckItem>Energético liberado</CheckItem>
          <CheckItem>Acesso ao line-up completo</CheckItem>
          <CheckItem>After confirmado após os sets ✓</CheckItem>
        </div>

        {/* Botão Mercado Pago */}
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

        {/* Divisor PIX */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "20px 0 16px" }}>
          <div style={{ flex: 1, height: "0.5px", background: "var(--border-faint)" }} />
          <span style={{ fontSize: "10px", color: "var(--text-faint)", letterSpacing: "0.10em", textTransform: "uppercase" }}>ou pague via PIX</span>
          <div style={{ flex: 1, height: "0.5px", background: "var(--border-faint)" }} />
        </div>

        {/* Chave PIX copiável */}
        <button
          onClick={copyPix}
          style={{
            width: "100%", background: "rgba(255,255,255,0.04)",
            border: "0.5px dashed rgba(255,255,255,0.18)", borderRadius: "8px",
            padding: "12px 16px", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            transition: "background 150ms ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
        >
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.70)", letterSpacing: "0.02em", fontFamily: "monospace" }}>
            colmeiamovimento035@gmail.com
          </span>
          <span style={{ fontSize: "10px", color: pixCopied ? "#1DB954" : "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase", marginLeft: "10px", flexShrink: 0 }}>
            {pixCopied ? "✓ Copiado" : "Copiar"}
          </span>
        </button>

        {/* Aviso comprovante */}
        <div style={{
          marginTop: "12px",
          background: "rgba(59,59,204,0.08)",
          border: "0.5px solid rgba(59,59,204,0.25)",
          borderRadius: "8px", padding: "12px 14px",
          textAlign: "left",
        }}>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.60)", lineHeight: 1.6, margin: 0 }}>
            ⚠️ Após o pagamento via PIX, envie o comprovante para confirmar sua presença:
          </p>
          <a
            href="https://wa.me/5511984687528"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              marginTop: "8px", color: "#fff", textDecoration: "none",
              fontSize: "12px", fontWeight: 600, letterSpacing: "0.04em",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            +55 11 98468-7528
          </a>
        </div>

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
